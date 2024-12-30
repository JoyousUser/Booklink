import React, { useState, useEffect } from 'react';
import ExampleCarouselImage from '../assets/cover.jpg';

const UserDetails = () => {
  const [user, setUser] = useState(null); // Original user data
  const [editableUser, setEditableUser] = useState({}); // Editable fields
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract user ID from URL
  const getUserIdFromPath = () => {
    const urlParts = window.location.pathname.split('/');
    return urlParts[urlParts.length - 1];
  };

  // Fetch user details
  const fetchUserDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/api/admin/users/${id}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to fetch user details.');
      }
      const data = await response.json();
      setUser(data);
      setEditableUser({
        email: data.email,
        username: data.username,
        roles: Object.values(data.roles || {}).join(', '), // Editable fields only
      });
    } catch (err) {
      console.error('Error fetching user details:', err.message);
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  

  // Patch user details
  const patchUserDetails = async () => {
    try {
      
      const payload = { ...editableUser};
      payload.roles = {}
      const response = await fetch(`http://localhost:3500/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to update user data.');
      }

      const updatedData = await response.json();
      setUser(updatedData); // Update the original user state with the new data
    } catch (err) {
      console.error('Error patching user details:', err.message);
      setError(err.message);
    }
  };

  const deleteUser = async () => {
    try {
      const payload = {
        
        id: user._id,
       
      };
  
      const response = await fetch(`http://localhost:3500/api/admin/users/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Properly formatted payload
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to delete user.');
      }
  
      console.log('User deleted successfully.');
      setUser(null); // Clear user state
    } catch (err) {
      console.error('Error deleting user:', err.message);
      setError(err.message);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const userId = getUserIdFromPath();
    if (userId) {
      fetchUserDetails(userId);
    } else {
      setError('No user ID found in the URL path.');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-danger">{error}</div>;
  if (!user) return <div className="text-center p-4">No user found.</div>;

  return (
    <div className="container py-4">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              className="img-fluid rounded-start"
              src={user.profileImage || ExampleCarouselImage}
              alt={`${user.username}'s profile`}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{user.username}</h1>
              <div className="card-text">
                <p><strong>Email:</strong></p>
                <input
                  type="email"
                  name="email"
                  value={editableUser.email || ''}
                  onChange={handleChange}
                  className="form-control"
                />
                 <p><strong>Username:</strong></p>
                <input
                  type="text"
                  name="username"
                  value={editableUser.username || ''}
                  onChange={handleChange}
                  className="form-control"
                />
                
                <p><strong>Roles:</strong></p>
                <input
                  type="text"
                  name="roles"
                  value={editableUser.roles || ''}
                  onChange={handleChange}
                  className="form-control"
                />
                <button className="btn btn-primary mt-3" onClick={patchUserDetails}>
                  Save Changes
                </button>
                <button className="btn btn-primary mt-3" onClick={deleteUser}>
                  Delete user
                </button>
                <p className="mt-4"><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
                <p><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
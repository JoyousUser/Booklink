import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const [user, setUser] = useState(null); // State for user data
  const [editableUser, setEditableUser] = useState({}); // State for editable form
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/users/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || 'Failed to fetch user profile.');
        }

        const data = await response.json();
        setUser(data); // Set user data
        setEditableUser({
          username: data.username, // Use the correct key
          email: data.email,
        }); // Initialize form fields
      } catch (err) {
        console.error('Error fetching user profile:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form submission
  const updateProfile = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableUser),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to update profile.');
      }

      const updatedData = await response.json();
      setUser(updatedData); // Update user state with new data
    } catch (err) {
      console.error('Error updating profile:', err.message);
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/users/me/logout', {
        method: 'POST', // Prefer POST for logout
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies to clear them
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to log out.');
      }
  
      // Reset user state after logout
      setUser(null);
      setEditableUser({});
      alert('Logout successful');
      navigate('/login'); // Redirect to login
    } catch (err) {
      console.error('Error logging out:', err.message);
      setError(err.message);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>My Profile</h1>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username" // Matches the key in editableUser
            value={editableUser.username || ''} // Displays the username correctly
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editableUser.email || ''}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={updateProfile}>
          Save Changes
        </button>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default UserProfile;

import React, { useState, useEffect } from 'react';
import ExampleCarouselImage from '../assets/cover.jpg';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract user ID from URL
  const getUserIdFromPath = () => {
    const urlParts = window.location.pathname.split('/');
    return urlParts[urlParts.length - 1];
  };

  // Fetch user details based on userId
  const fetchUserDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/api/admin/users/${id}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to fetch user details.');
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error('Error fetching user details:', err.message);
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to display roles
  const getRolesString = (roles) => {
    if (!roles) return 'No roles assigned';
    const roleValues = Object.values(roles);
    return roleValues.length > 0 ? roleValues.join(', ') : 'No roles assigned';
  };

  // Fetch the user on component mount
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
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Roles:</strong> {getRolesString(user.roles)}</p>
                <p><strong>Member Since:</strong> {formatDate(user.createdAt)}</p>
                
                {user.settings && (
                  <div className="mt-3">
                    <h3>Settings</h3>
                    <p><strong>Email Notifications:</strong> {user.settings.emailNotifications ? 'Enabled' : 'Disabled'}</p>
                    <p><strong>Privacy Level:</strong> {user.settings.privacyLevel}</p>
                  </div>
                )}
                
                {user.stats && (
                  <div className="mt-3">
                    <h3>Statistics</h3>
                    <p><strong>Reviews Written:</strong> {user.stats.reviewsWritten}</p>
                  </div>
                )}

                <p><strong>Last Updated:</strong> {formatDate(user.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
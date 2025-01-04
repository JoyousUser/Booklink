import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null); // State for user data
  const [editableUser, setEditableUser] = useState({}); // State for editable form
  const [userBooks, setUserBooks] = useState([]); // State for user's books
  const [selectedBook, setSelectedBook] = useState(null); // State for selected book
  const [review, setReview] = useState({ text: '', rating: '' }); // State for review input
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile and user books
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

    const fetchUserBooks = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/userbooks/get', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || 'Failed to fetch user books.');
        }

        const data = await response.json();
        setUserBooks(data.data); // Set user books
      } catch (err) {
        console.error('Error fetching user books:', err.message);
        setError(err.message);
      }
    };

    fetchUserProfile();
    fetchUserBooks();
  }, []);

  // Handle user profile update
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
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err.message);
      setError(err.message);
    }
  };

  // Handle logout
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/users/me/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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

  // Handle user book actions
  const handleAddReview = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/userbooks/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          bookId: selectedBook._id,
          reviewText: review.text,
          rating: review.rating,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to add review.');
      }

      const updatedBook = await response.json();
      setUserBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        )
      );
      alert('Review added successfully');
    } catch (err) {
      console.error('Error adding review:', err.message);
      setError(err.message);
    }
  };

  const handleUpdateUserBook = async (updates) => {
    try {
      const response = await fetch('http://localhost:3500/api/userbooks/patch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          bookId: selectedBook._id,
          updates,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to update user book.');
      }

      const updatedBook = await response.json();
      setUserBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        )
      );
      alert('UserBook updated successfully');
    } catch (err) {
      console.error('Error updating user book:', err.message);
      setError(err.message);
    }
  };

  const handleDeleteUserBook = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/userbooks/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          bookId: selectedBook._id,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to delete user book.');
      }

      setUserBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== selectedBook._id)
      );
      alert('UserBook deleted successfully');
    } catch (err) {
      console.error('Error deleting user book:', err.message);
      setError(err.message);
    }
  };

  // Handle input changes for editable user form
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
            name="username"
            value={editableUser.username || ''}
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

      <div className="user-books">
        <h2>My Books</h2>
        {userBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <ul>
            {userBooks.map((book) => (
              <li key={book._id}>
                <h3>{book.bookTitle}</h3>
                <p>Status: {book.status}</p>
                <p>Review: {book.review?.text || 'No review yet'}</p>
                <p>Rating: {book.review?.rating || 'No rating'}</p>
                <button onClick={() => setSelectedBook(book)}>Select</button>
              </li>
            ))}
          </ul>
        )}

        {selectedBook && (
          <div className="selected-book">
            <h3>Selected Book: {selectedBook.bookTitle}</h3>
            <div>
              <label>Review:</label>
              <textarea
                value={review.text}
                onChange={(e) => setReview({ ...review, text: e.target.value })}
              />
            </div>
            <div>
              <label>Rating:</label>
              <input
                type="number"
                value={review.rating}
                onChange={(e) =>
                  setReview({ ...review, rating: e.target.value })
                }
              />
            </div>
            <button onClick={handleAddReview}>Add Review</button>
            <button onClick={() => handleUpdateUserBook({ status: 'read' })}>
              Mark as Read
            </button>
            <button onClick={handleDeleteUserBook}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

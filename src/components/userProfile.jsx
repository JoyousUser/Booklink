import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({});
  const [userBooks, setUserBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [review, setReview] = useState({ text: '', rating: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile
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
      setUser(data);
      setEditableUser({
        username: data.username,
        email: data.email,
      });
    
    } catch (err) {
      console.error('Error fetching user profile:', err.message);
      setError(err.message);
    }
  };

  // Fetch user books
  const fetchUserBooks = async () => {
    if (!user?._id) {
      return;
    }

    try {
      const filterBy = JSON.stringify({ user: user._id });
    

      const response = await fetch(
        `http://localhost:3500/api/userbooks/get?filterBy=${encodeURIComponent(filterBy)}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to fetch user books.');
      }

      const data = await response.json();
    
      setUserBooks(data.data);
    } catch (err) {
      console.error('Error fetching user books:', err.message);
      setError(err.message);
    }
  };

  // Handle adding a review
  const handleAddReview = async (e) => {
    e.preventDefault();
  
    if (!selectedBook) {
      setError('No book selected for review.');
      return;
    }
  
    try {
      const updates = {
        'review.text': review.text,
        'review.rating': parseInt(review.rating, 10),
      };
  
   
  
      const response = await fetch('http://localhost:3500/api/userbooks/patch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user._id,
          bookId: selectedBook.book || selectedBook.bookData?._id,
          updates,
        }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to update review and rating.');
      }
  
    
      await fetchUserBooks(); // Refresh user books
      setReview({ text: '', rating: '' });
      alert('Review and rating updated successfully!');
    } catch (err) {
      console.error('Error updating review and rating:', err.message);
      setError(err.message);
    }
  };
  

  // Handle marking a book as read
  const handleMarkAsRead = async () => {
    if (!selectedBook) {
      setError('No book selected to mark as read.');
      return;
    }

    try {
     

      const response = await fetch('http://localhost:3500/api/userbooks/patch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user._id,
          bookId: selectedBook.book || selectedBook.bookData?._id,
          updates: { status: 'read' },
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to mark book as read.');
      }

      console.log('Book marked as read successfully.');
      await fetchUserBooks(); // Refresh the user books
      alert('Book marked as read!');
    } catch (err) {
      console.error('Error marking book as read:', err.message);
      setError(err.message);
    }
  };

  // Fetch user profile once on mount
  useEffect(() => {
    const initializeProfile = async () => {
      await fetchUserProfile();
      setLoading(false); // Stop loading when profile is fetched
    };

    initializeProfile();
  }, []);

  // Fetch user books when user is set
  useEffect(() => {
    if (user) {
      console.log('User data set. Fetching user books...');
      fetchUserBooks();
    }
  }, [user]); // Only run when `user` changes

  // UI for loading state
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      <Card className="mb-4">
        <Card.Header as="h2">My Profile</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editableUser.username || ''}
                onChange={(e) =>
                  setEditableUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editableUser.email || ''}
                onChange={(e) =>
                  setEditableUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                }
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">Save Changes</Button>
              <Button variant="outline-danger" onClick={() => navigate('/login')}>Logout</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h2">My Books</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              {userBooks.length === 0 ? (
                <p className="text-muted text-center">No books found.</p>
              ) : (
                userBooks.map((userBook) => (
                  <Card
                    key={userBook._id}
                    className={`mb-3 ${selectedBook?._id === userBook._id ? 'border-primary' : ''}`}
                    onClick={() => {
                     
                      setSelectedBook(userBook);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body>
                      <Card.Title>{userBook.bookData?.title || 'Unknown Book'}</Card.Title>
                      <Card.Text>
                        <small className="text-muted">Status: {userBook.status}</small><br />
                        <small className="text-muted">
                          Review: {userBook.review?.text || 'No review yet'}
                        </small><br />
                        <small className="text-muted">
                          Rating: {userBook.rating || userBook.review?.rating || 'No rating'}
                        </small>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Col>

            {selectedBook && (
              <Col md={6}>
                <Card>
                  <Card.Header>Selected Book: {selectedBook.bookData?.title || 'Unknown Book'}</Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleAddReview}>
                      <Form.Group className="mb-3">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={review.text}
                          onChange={(e) => setReview((prev) => ({ ...prev, text: e.target.value }))}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Rating (1-5)</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          max="5"
                          value={review.rating}
                          onChange={(e) => setReview((prev) => ({ ...prev, rating: e.target.value }))}
                        />
                      </Form.Group>

                      <div className="d-grid gap-2">
                        <Button type="submit" variant="primary">Submit Review</Button>
                        <Button type="button" variant="outline-primary" onClick={handleMarkAsRead}>
                          Mark as Read
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
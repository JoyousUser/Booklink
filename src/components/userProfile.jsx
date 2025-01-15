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
      const booksWithDetails = await Promise.all(
        data.data.map(async (userBook) => {
          const bookDetails = await fetchBookDetails(userBook.book);
          return { ...userBook, bookData: bookDetails };
        })
      );

      setUserBooks(booksWithDetails);
    } catch (err) {
      console.error('Error fetching user books:', err.message);
      setError(err.message);
    }
  };

  const fetchBookDetails = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3500/api/books/${bookId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        console.error(`Failed to fetch details for book ID ${bookId}`);
        return null;
      }

      const bookData = await response.json();
      return bookData.data; // Assuming the API response has a `data` field
    } catch (err) {
      console.error(`Error fetching book details for ID ${bookId}:`, err.message);
      return null;
    }
  };

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

    const initializeData = async () => {
      await fetchUserProfile();
      await fetchUserBooks();
      setLoading(false);
    };

    initializeData();
  }, []);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!selectedBook) {
      setError('No book selected');
      return;
    }

    try {
      console.log('Adding review for book:', {
        userId: user?._id,
        bookId: selectedBook.book || selectedBook.bookData?._id, 
        reviewText: review.text,
        rating: parseInt(review.rating),
      });

      const response = await fetch('http://localhost:3500/api/userbooks/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user._id,
          bookId: selectedBook.book || selectedBook.bookData?._id, 
          reviewText: review.text,
          rating: parseInt(review.rating),
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to add review.');
      }

      await fetchUserBooks(); 
      setReview({ text: '', rating: '' });
      alert('Ajout de la critique utilisateur');
    } catch (err) {
      console.error('Erreur ajout de critique:', err.message);
      setError(err.message);
    }
  };

  const handleUpdateUserBook = async (newStatus) => {
    if (!selectedBook) {
      setError('No book selected');
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
          updates: { status: newStatus },
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to update book status.');
      }

      await fetchUserBooks();
      alert('Book status updated successfully');
    } catch (err) {
      console.error('Error updating book status:', err.message);
      setError(err.message);
    }
  };

  const handleDeleteUserBook = async () => {
    if (!selectedBook) {
      setError('No book selected');
      return;
    }

    try {
      const response = await fetch('http://localhost:3500/api/userbooks/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user._id,
          bookId: selectedBook.book || selectedBook.bookData?._id,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to delete book.');
      }

      setSelectedBook(null);
      await fetchUserBooks();
      alert('Book removed successfully');
    } catch (err) {
      console.error('Error deleting book:', err.message);
      setError(err.message);
    }
  };

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
                value={editableUser.username || ''}
                onChange={(e) => setEditableUser((prev) => ({ ...prev, username: e.target.value }))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editableUser.email || ''}
                onChange={(e) => setEditableUser((prev) => ({ ...prev, email: e.target.value }))}
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
                    onClick={() => setSelectedBook(userBook)}
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
                        <Button type="submit" variant="primary">Add Review</Button>
                        <Button variant="outline-primary" onClick={() => handleUpdateUserBook('read')}>
                          Mark as Read
                        </Button>
                        <Button variant="outline-danger" onClick={handleDeleteUserBook}>
                          Remove Book
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

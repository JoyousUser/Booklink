import React, { useState, useEffect } from 'react';
import ExampleCarouselImage from '../assets/cover.jpg';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  // Extract
  const getBookIdFromPath = () => {
    const urlParts = window.location.pathname.split('/'); // Split 
    return urlParts[urlParts.length - 1]; // Book ID
  };

  // Fetch book details based on `bookId`
  const fetchBookDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/api/books/${id}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to fetch book details.');
      }
      const { data } = await response.json();
      setBook(data); // Update state with fetched book details
    } catch (err) {
      console.error('Error fetching book details:', err.message);
      setError(err.message);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the book on component mount
  useEffect(() => {
    const bookId = getBookIdFromPath(); // Get `bookId` from the URL path
    if (bookId) {
      fetchBookDetails(bookId);
    } else {
      setError('No book ID found in the URL path.');
      setLoading(false);
    }
  }, []);

  // Render the component
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Categories:</strong> {book.categories?.join(', ')}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <img className="imageCoverDetail" src={ExampleCarouselImage} alt="First slide"
            />
    </div>
  );
};

export default BookDetails;
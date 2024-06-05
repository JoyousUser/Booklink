import React, { useState, useEffect } from 'react';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  
  

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/books/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error('Failed to fetch books');
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
    getBooks();
  }, []);

  

  return (
    
    <div>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        books.map(book => (
          <ul className="list-group" key={book.id}>
            <li className="list-group-item">ID: {book.id}</li>
            <li className="list-group-item">Title: {book.title}</li>
            <li className="list-group-item">Author: {book.author}</li>
            <li className="list-group-item">Editor: {book.editor}</li>
            <li className="list-group-item">Published Date: {book.published_date}</li>
            <li className="list-group-item">ISBN: {book.ISBN}</li>
            <li className="list-group-item">Genre: {book.genre}</li>
          </ul>
        ))
      )}
    </div>
    
  );
}

export default AllBooks;


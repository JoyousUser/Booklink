import React, { useState, useEffect } from 'react';

const AddBooks = () => {
  const initialBookState = {
    title: '',
    author: '',
    editor: '',
    published_date: '',
    ISBN: '',
    genre: '',
  };

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState(initialBookState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.ISBN) {
      setError('Title, Author, and ISBN are required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/books/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        const addedBook = await response.json();
        setBooks([...books, addedBook]);
        setNewBook(initialBookState);
        setError(null);
      } else {
        setError('Failed to add book');
      }
    } catch (error) {
      setError('Failed to add book: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Editor:</label>
          <input
            type="text"
            name="editor"
            value={newBook.editor}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Published Date:</label>
          <input
            type="date"
            name="published_date"
            value={newBook.published_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ISBN:</label>
          <input
            type="text"
            name="ISBN"
            value={newBook.ISBN}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={newBook.genre}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBooks;
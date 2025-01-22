import React, { useState } from 'react';
import apiBaseUrl from '../config';
import api from '../services/api'

const AddBooks = () => {
  const initialBookState = {
    title: '',
    author: '',
    titleLong: '',
    isbn: '',
    isbn13: '',
    publisher: '',
    language: '',
    publishDate: '',
    edition: '',
    pages: '',
    description: '',
    categories: '',
    openSourceLink: '',
    status: '',
    coverImage: null, // For storing the uploaded file
  };

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState(initialBookState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewBook({ ...newBook, coverImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) {
      setError('Title and Author are required fields.');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(newBook).forEach(([key, value]) => {
        if (value) formData.append(key, value); // Only append non-empty fields
      });

      const response = await fetch(`${apiBaseUrl}/api/auth/api/books/add`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const addedBook = await response.json();
        setBooks([...books, addedBook]);
        setNewBook(initialBookState);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add book');
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
          <label>Title Long:</label>
          <input
            type="text"
            name="titleLong"
            value={newBook.titleLong}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={newBook.isbn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ISBN13:</label>
          <input
            type="text"
            name="isbn13"
            value={newBook.isbn13}
            onChange={handleChange}
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
          <label>Publisher:</label>
          <input
            type="text"
            name="publisher"
            value={newBook.publisher}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Edition:</label>
          <input
            type="text"
            name="edition"
            value={newBook.edition}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Pages:</label>
          <input
            type="number"
            name="pages"
            value={newBook.pages}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newBook.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Categories:</label>
          <input
            type="text"
            name="categories"
            value={newBook.categories}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Open Source Link:</label>
          <input
            type="url"
            name="openSourceLink"
            value={newBook.openSourceLink}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Publish Date:</label>
          <input
            type="date"
            name="publishDate"
            value={newBook.publishDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={newBook.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="deleted">Deleted</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBooks;

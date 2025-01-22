import React, { useState, useEffect } from 'react';
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
    coverImage: '',
    categories: '',
    openSourceLink: '',
    status: 'want-to-read'  // Add this line with the default value
  };
  

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState(initialBookState);
  const [error, setError] = useState(null);

  let fileInput = null; // Reference for the file input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewBook({ ...newBook, coverImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (!newBook.title || !newBook.author) {
      setError('Title and Author are required fields.');
      return;
    }

    try {
      const formData = new FormData();

      // Populate FormData with all fields and apply fallbacks
      Object.entries(newBook).forEach(([key, value]) => {
        formData.append(key, value || initialBookState[key]); // Use fallback if value is empty
      });

      const response = await fetch(`${apiBaseUrl}/api/books/add`, {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies for authentication
      });

      if (response.ok) {
        const { book, userBook } = await response.json();
        setBooks([...books, book]); // Update the list of books
        setNewBook(initialBookState); // Reset the form
        setError(null); // Clear any error
      
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add book.');
        
      }
    } catch (err) {
      setError('Failed to add book: ' + err.message);
      
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Auteur:</label>
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Titre complet:</label>
          <input
            type="text"
            name="titleLong"
            value={newBook.titleLong}
            onChange={handleChange}
            required
          />

        </div>
        <div>
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={newBook.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ISBN13:</label>
          <input
            type="text"
            name="isbn13"
            value={newBook.isbn13}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Editeur:</label>
          <input
            type="text"
            name="publisher"
            value={newBook.publisher}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Edition:</label>
          <input
            type="text"
            name="edition"
            value={newBook.edition}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pages:</label>
          <input
            type="text"
            name="pages"
            value={newBook.pages}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={newBook.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
  <label>Couverture</label>
  <input
    type="file"
    name="coverImage"
    accept="image/*"
    onChange={handleFileChange}
    style={{ display: 'none' }} // Hide the actual input
    ref={(input) => (fileInput = input)} // Reference for the input
  />
  {/* Simple button to trigger the file input */}
  <button
    type="button"
    onClick={() => fileInput.click()} // Open file picker
  >
    Select Image
  </button>
  {/* Display the selected file name */}
  {newBook.coverImage && <span>{newBook.coverImage.name}</span>}
</div>
        <div>
          <label>Tags</label>
          <input
            type="text"
            name="categories"
            value={newBook.categories}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lien vers une ressource valide</label>
          <input
            type="text"
            name="openSourceLink"
            value={newBook.openSourceLink}
            onChange={handleChange}
            
          />
        </div>
   
        <div>
  <label>Date:</label>
  <input
    type="date"
    name="publishDate"
    value={newBook.publishDate}
    onChange={handleChange}
  />
</div>

      
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBooks;

/*  title: {
        type: String,
        required: true,
        index: true 
    },
    titleLong: {
        type: String,
        required: false
    },
    isbn: {
        type: String,
        unique: true,
        sparse: true,  
        index: true
    },
    isbn13: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    author: {
        type: String,
        required: true,
        index: true
    },
    publisher: {
        type: String,
        required: false
    },
    language: {
        type: String,
        default: 'en'
    },
    publishDate: {
        type: Date,
        required: false
    },
    edition: {
        type: String,
        required: false
    },
    pages: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    coverImage: {
        url: String,
        cloudinaryId: String,  
        thumbnailUrl: String  
    },
    categories: [{
        type: String,
        index: true
    }],
    openSourceLink: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return !v || /^https?:\/\/.+/.test(v)
            },
            message: 'Invalid URL format'
        }
    },
    status: {
        type: String,
        enum: ['available', 'deleted', 'private'],
        default: 'available'
    }*/
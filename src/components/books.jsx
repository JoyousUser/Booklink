import React, { useState, useEffect } from 'react';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState('createdAt'); // Default sort field
  const [order, setOrder] = useState('desc');   // Default order
  const [page, setPage] = useState(1);          // Current page

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3500/api/books?page=${page}&sort=${sort}&order=${order}`
      );
      const data = await response.json();
      if (data.success) setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  // Fetch books on initial render and when sort/order/page changes
  useEffect(() => {
    fetchBooks();
  }, [sort, order, page]);

  return (
    <div>
      <h1>Books</h1>
      <div>
        <button onClick={() => { setSort('title'); setOrder('asc'); }}>
          Sort by Title (Asc)
        </button>
        <button onClick={() => { setSort('author'); setOrder('desc'); }}>
          Sort by Author (Desc)
        </button>
        <button onClick={() => { setSort('createdAt'); setOrder('desc'); }}>
          Sort by Date (Newest)
        </button>
      </div>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default AllBooks;


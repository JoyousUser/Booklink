import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { useAppContext } from '../appContext';


const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState('createdAt'); // Default sort field
  const [order, setOrder] = useState('desc');   // Default order
  const [page, setPage] = useState(1);          // Current page
  const { state } = useAppContext();
  const { username } = state;

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
    <>
    
      
      
        <button onClick={() => { setSort('title'); setOrder('asc'); }}>
          Sort by Title (Asc)
        </button>
        <button onClick={() => { setSort('author'); setOrder('desc'); }}>
          Sort by Author (Desc)
        </button>
        <button onClick={() => { setSort('createdAt'); setOrder('desc'); }}>
          Sort by Date (Newest)
        </button>
      
   
        <h1 className='bg-light'>Here are your books, {username}</h1>
        <Container fluid className='bg-dark'>
          <Row className="d-flex flex-row flex-wrap"><h1 className='bg-dark'>-------------------</h1>
              
            <Col className="mr-2 mb-2">
        {books.map((book) => (
          <>    
           <ListGroup>   
          <ListGroup.Item key={book._id}>
            {book.title}
          </ListGroup.Item>
          <ListGroup.Item key={book._id}>
            {book.author}
          </ListGroup.Item>
          <ListGroup.Item key={book._id}>
            {book.publishdate}
          </ListGroup.Item>
          <ListGroup.Item key={book._id}>
            {book.pages}
          </ListGroup.Item>
          <ListGroup.Item key={book._id}>
            {book.categories}
          </ListGroup.Item>
         </ListGroup></>
        ))}
        
   </Col>
            </Row>
            </Container>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>
        Next
      </button>

   
    
    </>
    
  );
};

export default AllBooks;


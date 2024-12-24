import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useAppContext } from '../appContext';

const BookDetails = () => {
  const [books, setBooks] = useState([]);
  const [id, setId] = useState(1);          // Current page
  const { state } = useAppContext();
  const { username } = state;

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3500/api/books?id=${id}}`
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
  }, [id]);

  return (
    <Container fluid className="bg-dark">
      <Row className="text-light py-4">
        <h1 className="bg-light text-dark text-center py-3">Here are your books, {username}</h1>
      </Row>

      {/* Sorting Controls */}
      <Row className="text-center mb-3">
        <Col>
          <button className="btn btn-primary mx-2" onClick={() => { setSort('title'); setOrder('asc'); }}>
            Sort by Title (Asc)
          </button>
          <button className="btn btn-secondary mx-2" onClick={() => { setSort('author'); setOrder('desc'); }}>
            Sort by Author (Desc)
          </button>
          <button className="btn btn-dark mx-2" onClick={() => { setSort('createdAt'); setOrder('desc'); }}>
            Sort by Date (Newest)
          </button>
        </Col>
      </Row>

      {/* Books List */}
      <Row className="d-flex flex-row flex-wrap">
        {books.map((book) => (
          <Col xs={12} sm={6} md={4} lg={3} key={book._id} className="mb-4">
            <ListGroup>
              <ListGroup.Item>{book.title}</ListGroup.Item>
              <ListGroup.Item>{book.author}</ListGroup.Item>
              <ListGroup.Item>{book.publisher || 'Editeur à venir'}</ListGroup.Item>
              <ListGroup.Item>{book.publishdate || 'Date à venir'}</ListGroup.Item>
              <ListGroup.Item>{book.isbn || `Pas encore d'ISBN`}</ListGroup.Item>
              <ListGroup.Item>
                <a href={book.link || '#'} target="_blank" rel="noopener noreferrer">
                  {book.link ? 'Détails' : 'Pas encore de lien'}
                </a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href={book.openSourceLink || '#'} target="_blank" rel="noopener noreferrer">
                  {book.openSourceLink ? 'Lien vers le livre' : 'Pas encore de ressource'}
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        ))}
      </Row>

      
    </Container>
  );
};

export default BookDetails;

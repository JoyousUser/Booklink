import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useAppContext } from '../appContext';
import ExampleCarouselImage from '../assets/cover.jpg';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState('createdAt'); // Default sort field
  const [order, setOrder] = useState('desc');   // Default order
  const [page, setPage] = useState(1);          // Current page
  const { state } = useAppContext();
  const { user} = state;

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/books?page=${page}&sort=${sort}&order=${order}`
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
    <Container fluid className="bg-dark">
      <Row className="text-light py-4">
        <h1 className="bg-light text-dark text-center py-3">Here are your books, {user?.name}</h1>
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
      <Row className="d-flex flex-row flex-wrap ">
        {books.map((book) => (
          <Col xs={12} sm={6} md={4} lg={3} key={book._id} className="mb-4">
            <ListGroup className="image-container">
            <img className="imageCover" src={book.coverImage?.url || ExampleCarouselImage} alt="First slide"
            />
              <ListGroup.Item>{book.title}</ListGroup.Item>
              <ListGroup.Item>{book.author}</ListGroup.Item>
              <ListGroup.Item>{book.publisher || 'Editeur à venir'}</ListGroup.Item>
              <ListGroup.Item>{book.publishdate || 'Date à venir'}</ListGroup.Item>
              <ListGroup.Item>{book.isbn || `Pas encore d'ISBN`}</ListGroup.Item>
              <ListGroup.Item>
                <a href={`/book/${book._id}`} target="_blank" rel="noopener noreferrer">
                  {book._id ? 'Détails' : 'Pas encore de lien'}
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

      {/* Pagination Controls */}
      <Row className="text-center mt-4">
        <Col>
          <button
            className="btn btn-outline-primary mx-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="btn btn-outline-secondary mx-2"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </Col>
      </Row>
    </Container>
    
  );
};

export default AllBooks;

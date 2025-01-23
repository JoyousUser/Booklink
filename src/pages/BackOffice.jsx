import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useAppContext } from '../appContext';
import { useNavigate } from 'react-router-dom';
import ExampleCarouselImage from '../assets/cover.jpg';
import apiBaseUrl from '../config';
import api from '../services/api'

const BackOffice = () => {
  const [users, setUsers] = useState([]);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const { state } = useAppContext();
  const { user } = state;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/admin/users?page=${page}&sort=${sort}&order=${order}`
      );
      const data = await response.json();
      if (data.success) setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [sort, order, page]);

  const handleUserClick = (userId) => {
    navigate(`/backoffice/users/${userId}`);
  };

  return (
    <Container fluid className="bg-dark">
      <Row className="text-light py-4">
        <h1 className="bg-light text-dark text-center py-3">
          User Management Dashboard, {user?.name}
        </h1>
      </Row>

      {/* Sorting Controls */}
      <Row className="text-center mb-3">
        <Col>
          <button 
            className="btn btn-primary mx-2" 
            onClick={() => { setSort('username'); setOrder('asc'); }}
          >
            Sort by Username (Asc)
          </button>
          <button 
            className="btn btn-secondary mx-2" 
            onClick={() => { setSort('email'); setOrder('desc'); }}
          >
            Sort by Email (Desc)
          </button>
          <button 
            className="btn btn-dark mx-2" 
            onClick={() => { setSort('createdAt'); setOrder('desc'); }}
          >
            Sort by Date (Newest)
          </button>
        </Col>
      </Row>

      {/* Users List */}
      <Row className="d-flex flex-row flex-wrap">
        {users.map((user) => (
          <Col xs={12} sm={6} md={4} lg={3} key={user._id} className="mb-4">
            <ListGroup className="image-container">
              <img 
                className="imageCover" 
                src={user.profileImage || ExampleCarouselImage} 
                alt={`${user.username}'s profile`}
              />
              <ListGroup.Item>Username: {user.username}</ListGroup.Item>
              <ListGroup.Item>Email: {user.email}</ListGroup.Item>
              <ListGroup.Item>Roles: {Object.values(user.roles || {}).join(', ') || 'No roles'}</ListGroup.Item>
              <ListGroup.Item>Created: {new Date(user.createdAt).toLocaleDateString()}</ListGroup.Item>
              <ListGroup.Item>
                <button 
                  className="btn btn-link"
                  onClick={() => handleUserClick(user._id)}
                >
                  View Profile
                </button>
              </ListGroup.Item>
              <button className="btn btn-success">Validate User</button>
            </ListGroup>
          </Col>
        ))}
      </Row>

      {/* Pagination Controls */}
      <Row className="text-center mt-4 pb-4">
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

export default BackOffice;
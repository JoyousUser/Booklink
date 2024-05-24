import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../index.css';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto nav-buttons">
              <Nav.Link href="/login" className="text-primary button" id="menu1">Login</Nav.Link>
              <Nav.Link href="/signup" className="text-primary button" id="menu2">Signup</Nav.Link>
              <Nav.Link href="/browse" className="text-primary button" id="menu3">Browse</Nav.Link>
              <Nav.Link href="/home" className="text-primary button" id="menu4">Home</Nav.Link>
              <Nav.Link href="/booklink" className="text-primary button" id="menu5">Booklink</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginTop: '8vh' }}>{/* Adjusted space for fixed navbar */}
        {children}
      </div>
    </>
  );
};

export default Layout;
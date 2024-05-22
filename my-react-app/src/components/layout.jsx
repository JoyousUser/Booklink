import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ControlledCarousel from './carousel';
import '../index.css';

const Layout = ({ children }) => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/*
  
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
  </button> /</> 

  Burger button 
  
  
  */}
  <div className="collapse navbar-collapse" id="navbarNav">
    <Nav className="mr-auto nav-buttons">
      <Nav.Link href="/" className="text-primary button" id="menu1">Login</Nav.Link>
      <Nav.Link href="/signup" className="text-primary button" id="menu2">Signup</Nav.Link>
      <Nav.Link href="/browse" className="text-primary button" id="menu3">Browse</Nav.Link>
      <Nav.Link href="/contact" className="text-primary button" id="menu4">Contact</Nav.Link>
      
    </Nav>
  </div>
</nav>
<script src="node_modules/jquery/dist/jquery.min.js"></script>
  <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</>

  );
};

export default Layout;

import '../index.css';

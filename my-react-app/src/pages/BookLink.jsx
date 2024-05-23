import React from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import Layout from '/wamp64/www/Booklink/my-react-app/src/components/layout'
import BookLinkForm from '../components/bookLink';




const BookLink = () => {
  return (
    <>
    <Layout></Layout>
    <BookLinkForm></BookLinkForm>
    <Carousel></Carousel>
    
    </>
  );
};

export default BookLink;
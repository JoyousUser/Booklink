import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Layout from '/wamp64/www/Booklink/my-react-app/src/components/layout'
import ControlledCarousel from '../components/carousel';



const Home = () => {
  return (
    <>
    <Layout></Layout>
    <ControlledCarousel></ControlledCarousel>
    </>
  );
};

export default Home;

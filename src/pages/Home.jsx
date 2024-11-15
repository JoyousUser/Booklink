import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Layout from '../components/layout'
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

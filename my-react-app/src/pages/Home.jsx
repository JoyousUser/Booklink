import React from 'react';
import { Button, Card } from 'react-bootstrap';

const homeLoader = () => {
  console.log('hello world')
};

const Home = () => {
  return (
    <>
    <div>
      <h1>Home Page</h1>
      <Card>
        <Card.Body>
          <Card.Title>Welcome to the Home Page</Card.Title>
          <Card.Text>
            This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
          </Card.Text>
          <Button variant="primary">Learn more</Button>
        </Card.Body>
      </Card>
    </div></>
  );
};

export default Home;

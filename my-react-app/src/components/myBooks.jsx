import React from 'react';
import { useAppContext } from '../appContext';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Navbar, Nav } from 'react-bootstrap';

const BookSelectionLoggedIn = () => {
  const { state } = useAppContext();
  const { user } = state;

  const validateBooks = () => {
    if (user) {
      console.log('Logged in');
      return (
        <>
        
        
          <h1 className='bg-dark'>-------------------</h1>
          <h1 className='bg-light'>Here are your books, {user.name}</h1>
          
        
        <ListGroup horizontal>
        <ListGroup.Item>I shall seal the heavens !</ListGroup.Item>
        <ListGroup.Item>Er Gen</ListGroup.Item>
        <ListGroup.Item>Qidian</ListGroup.Item>
        <ListGroup.Item>2014</ListGroup.Item>
        <ListGroup.Item>None</ListGroup.Item>
        <ListGroup.Item>None</ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item>The picture of Dorian Grey</ListGroup.Item>
        <ListGroup.Item>Wilde, Oscar, 1854-1900</ListGroup.Item>
        <ListGroup.Item>Project Gutenberg</ListGroup.Item>
        <ListGroup.Item>1994-10-1, </ListGroup.Item>
        <ListGroup.Item>9780141439570</ListGroup.Item>
        <ListGroup.Item>https://www.gutenberg.org/ebooks/1342</ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item>Hamlet</ListGroup.Item>
        <ListGroup.Item>Shakespeare, William, 1564-1616</ListGroup.Item>
        <ListGroup.Item>Simon & Schuster</ListGroup.Item>
        <ListGroup.Item>2012-04-24</ListGroup.Item>
        <ListGroup.Item>9781451669411</ListGroup.Item>
        <ListGroup.Item>https://www.gutenberg.org/ebooks/1787</ListGroup.Item>
      </ListGroup>
      
      
      
      
      
      
      </>
      );
    } else {
      console.log('Not logged in');
      return (
        console.log('NotLoggedIn')
        
      );
    }
  };

  return validateBooks();
};

export default BookSelectionLoggedIn;
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../index.css';
import { Col, Container, Row } from 'react-bootstrap';


function CenteredForm() {
    return (
      <Container>
        <Row className="justify-content-center bg-light">
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              
              <Button variant="primary" type="submit" id="loginSubmitButton">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default CenteredForm;
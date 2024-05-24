import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../index.css';
import { Col, Container, Row } from 'react-bootstrap';

function SignupCentered() {
    return (
      <Container>
        <Row className="justify-content-center bg-dark">
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmailSignup" >
                <Form.Label className="text-light">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"/>
                
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPasswordSignup" >
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordSignupConfirmation" >
                <Form.Label className="text-light"> Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password confirmation" />
              </Form.Group>
              
              
              
              <Button variant="primary" type="submit" id="signupSubmitButton">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default SignupCentered;
import React, { useState } from 'react';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import { useAppContext } from '../appContext'; 



function CenteredForm() {
  const { dispatch } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Check for correct email and password
      if (email === 'hello@email.fr' && password === 'helloaaa9') {
        const mockApiResponse = { email, name: 'John Doe' }; // Replace with actual API response if needed
        dispatch({ type: 'SET_USER', payload: mockApiResponse });
        setApiError(null);
      } else {
        setApiError('Invalid email or password');
      }
    } else {
      setErrors(validationErrors);
      setApiError(null);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {apiError && <p className="text-danger">{apiError}</p>}

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
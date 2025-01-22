import React, { useState } from 'react';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import { useAppContext } from '../appContext'; 
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import apiBaseUrl from '../config';
import api from '../services/api'

function CenteredForm() {
  const { dispatch } = useAppContext();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!username) {
      errors.username = 'Password is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/register'`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password }),
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          dispatch({ type: 'SET_USER', payload: userData });
          setApiError(null);
          navigate('/dashboard');
        } else {
          const errorData = await response.json();
          setApiError(errorData.message || 'Login failed');
        }
      } catch (error) {
        setApiError('Network error: ' + error.message);
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

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
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
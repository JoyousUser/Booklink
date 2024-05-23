import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../index.css';
import { Col, Container, Row } from 'react-bootstrap';

function BookLinkForm() {
    return (
        <Container>
          <Row className="justify-content-center bg-light">
            <Col md={6}>
              <Form>
                
                <Form.Group className="mb-3" controlId="bookSubmitTitle">
                  <Form.Check type="" label="" />
                  <Form.Label>Title of the book</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitAuthor">
                  <Form.Check type="" label="" />
                  <Form.Label>Author of the book</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitEditor">
                  <Form.Check type="" label="" />
                  <Form.Label>Editor of the book</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitEditorDate">
                  <Form.Check type="" label="" />
                  <Form.Label>Publication date of the book</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitISBN">
                  <Form.Check type="" label="" />
                  <Form.Label>ISBN ID of the book</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitDownloadLink">
                  <Form.Check type="" label="" />
                  <Form.Label>Gutenberg download link of the book</Form.Label>
                </Form.Group>
                
                <Button variant="secondary" type="submit" id="bookSubmitButton">
                  Submit your book data
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    }

export default BookLinkForm;
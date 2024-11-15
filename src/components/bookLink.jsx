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
                  <Form.Label>Title of the book</Form.Label>
                  <Form.Control type="text" placeholder="Enter title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitAuthor">
                  <Form.Label>Author of the book</Form.Label>
                  <Form.Control type="text" placeholder="Enter author" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitEditor">
                  <Form.Label>Editor of the book</Form.Label>
                  <Form.Control type="text" placeholder="Enter editor" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitEditorDate">
                  <Form.Label>Publication date of the book</Form.Label>
                  <Form.Control type="date" placeholder="Select publication date" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitISBN">
                  <Form.Label>ISBN ID of the book</Form.Label>
                  <Form.Control type="text" placeholder="Enter ISBN ID" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="bookSubmitDownloadLink">
                  <Form.Label>Gutenberg download link of the book</Form.Label>
                  <Form.Control type="text" placeholder="Enter download link" />
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
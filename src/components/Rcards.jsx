// Rcards.js

import React, { useState } from 'react';
import { Row, Col, Button, Container, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Rcards() {

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
  return (
   <>
       <Container>
            <Row className='mt-5' style={{ border: '2px solid #FFD700', padding: '10px' }}>
              {/* First Column */}
              <Col md={6}>
                <h2 style={{color:"#D2122E"}}>Spaghetti Carbonara</h2>
                <p>
                  Recipes: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum elit eget augue
                  congue, in luctus ex aliquet.
                </p>
              </Col>
        
              {/* Second Column */}
              <Col md={3}>
                <img
                  src="https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg"
                  alt="Food Image"
                  className="img-fluid w-100"
                />
              </Col>
        
              {/* Third Column */}
              <Col md={3}>
                <div>
                  <h4 style={{color:"#D2122E"}}>User Details</h4>
                  <p>
                    Name: John Doe
                    <br />
                    Location: City, Country
                    <br />
                    Email: john.doe@example.com
                  </p>
                  <Button className='btn' style={{backgroundColor:"#D2122E"}} onClick={handleShow}> Contact User</Button>
                </div>
              </Col>
            </Row>
       </Container>
       <Modal  show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ border: '2px solid #FFD700', padding: '10px' }}>
          <Modal.Title style={{color:"#D2122E"}}>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ border: '2px solid #FFD700', padding: '10px' }}>
          <Form>
            <Form.Group controlId="formTextarea">
              <Form.Label style={{color:"#D2122E"}}>Enter Text:</Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ border: '2px solid #FFD700', padding: '10px' }}>
          <Button style={{backgroundColor:"#D2122E"}} onClick={handleClose}>
            Close
          </Button>
          <Button style={{backgroundColor:"#FFD700"}} onClick="">
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    

   </>
  );
}

export default Rcards;

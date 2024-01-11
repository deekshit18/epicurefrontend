import React, { useState } from 'react';
import icon from '../recipes.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Rheader() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "#FFD700" }} className="d-flex justify-content-center nav">
        <Container>
          <Navbar.Brand className='mx-auto' href="#">
            <img
              alt="Logo"
              src={icon}
              width="100%"
              height="70"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Button variant="outline-light" onClick={handleToggle} className="me-2">
            Toggle
          </Button>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={handleToggle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Add your offcanvas content here */}
          Offcanvas content goes here.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Rheader;

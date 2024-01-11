import React from 'react'
import icon from '../arhead.png'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function Arheader() {
  return (
    <Navbar style={{backgroundColor: "#FF0000"}} className="d-flex justify-content-center nav">
    <Container>
      <Navbar.Brand className='mx-auto ' href="#">
        <img
          alt="Logo"
          src={icon}
          width="100%"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
    </Container>
  </Navbar>

   
             );
    }
    

export default Arheader
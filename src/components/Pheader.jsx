import React from 'react'
import icon from '../log2.png'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Sidebar from './Sidebar';
function Pheader() {
  return (
    <Navbar className="d-flex  justify-content-center">

<Sidebar/>
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
    

export default Pheader
import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import box1 from '../prof.png';
import box2 from '../takercp.png';
import box3 from '../postrecipe.png';
import box4 from '../Message-Transparent-File.png';
import 'aos/dist/aos.css'; // Import the CSS file
import AOS from 'aos';

function Box() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container>
      <Row className='p-5'>
        <Col md={6} lg={6} className='' data-aos='fade-right'>
          <Link to="/profile">
            <div className='box' id='profileBox'>
              <Image className='w-25' src={box1} alt="Image 1" />
              <h5 className='box-title'>Profile</h5>
            </div>
          </Link>
        </Col>
        <Col md={6} lg={6} data-aos='fade-left'>
          <Link to="/mesg">
            <div className='box' id='messageBox'>
              <Image className='w-25' src={box4} alt="Image 4" />
              <h5 className='box-title'>Messages</h5>
            </div>
          </Link>
        </Col>
      </Row>
      <Row className='p-5'>
        <Col md={6} lg={6} data-aos='fade-right'>
          <Link to="/items">
            <div className='box' id='recipesBox'>
              <Image className='w-25' src={box2} alt="Image 2" />
              <h5 className='box-title'>Recipes</h5>
            </div>
          </Link>
        </Col>
        <Col md={6} lg={6} data-aos='fade-left'>
          <Link to="/addrecipe">
            <div className='box' id='postNewBox'>
              <Image className='w-25' src={box3} alt="Image 3" />
              <h5 className='box-title'>Post New</h5>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Box;

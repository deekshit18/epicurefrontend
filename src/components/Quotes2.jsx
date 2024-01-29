import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import quoteImage3 from '../quoteImage3.png';
import quoteImage4 from '../quoteImage4.png';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Quotes2() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });
  }, []);

  const mainBoxStyle = {
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    padding: '20px',
    margin: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
  };

  return (
    <Container>
      <Row className='m-5'>
        <Col md={6} data-aos='fade-right'>
          <div style={mainBoxStyle}>
            <Row>
              <Col xs={12} md={6}>
                <Image src={quoteImage3} alt="Quote 3" fluid data-aos='fade-down'/>
              </Col>
              <Col xs={12} md={6} >
                <p className="mt-3">
                  “A recipe has no soul. You, as the cook, must bring soul to the recipe.”
                </p>
                <p className="text-muted">– Thomas Keller</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={6} data-aos='fade-left'>
          <div style={mainBoxStyle}>
            <Row>
              <Col xs={12} md={6} >
                <Image src={quoteImage4} alt="Quote 4" fluid data-aos='fade-up'/>
              </Col>
              <Col xs={12} md={6}>
                <p className="mt-3">
                  "The people who give you their food give you their heart."
                </p>
                <p className="text-muted">- Cesar Chavez</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Quotes2;

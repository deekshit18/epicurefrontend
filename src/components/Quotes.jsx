import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import quoteImage1 from '../quoteImage1.png';
import quoteImage2 from '../quoteImage2.png';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Quotes() {
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
              <Col xs={12} md={6} className='about-img' >
                <Image src={quoteImage1} alt="Quote 1" data-aos='fade-up' fluid />
              </Col>
              <Col xs={12} md={6}>
                <p className="mt-3">
                  "If you want to become a great chef, you have to work with great chefs. And that's exactly what I did."
                </p>
                <p className="text-muted">- Gordon Ramsay</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={6} data-aos='fade-left'>
          <div style={mainBoxStyle}>
            <Row>
              <Col xs={12} md={6} >
                <Image src={quoteImage2} alt="Quote 2" data-aos='fade-down' fluid />
              </Col>
              <Col xs={12} md={6}>
                <p className="mt-3">
                  "One of the great gifts that you can give people is to cook for them."
                </p>
                <p className="text-muted">- Ina Garten </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Quotes;
// Note: I added `data-aos='fade-right'` and `data-aos='fade-left'` to each `Col` element to control the animation direction. You can adjust the duration and other options according to your preference.

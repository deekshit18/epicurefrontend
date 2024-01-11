import React from 'react'
import './Footer.css';

import icon from '../logonew1.png'

    import { Container, Row, Col } from 'react-bootstrap';
    import { Link } from 'react-router-dom'; // Make sure to import Link from react-router-dom if you're using it for navigation
    
    function Footer() {
        return (
        <footer className=" text-dark py-5" style={{backgroundColor: "#0076CE"}}>
          <Container>
            <Row>
              {/* Logo and Quote */}
              <Col lg={3} md={6} sm={12}>
                <img src={icon} alt="EpicureHub Logo" className="img-fluid mb-3" />
              </Col>
    <Col></Col>
              {/* Pages List */}
              <Col lg={3} md={6} sm={12}>
                <h5>Pages</h5>
                <ul className="list-unstyled ">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/recipes">Recipes</Link></li>
                  <li><Link to="/addrecipe">Chefs</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </Col>
    
              {/* Contact Information */}
              <Col lg={3} md={6} sm={12}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled contact-list">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="mailto:Epicurehub@example.com">Epicurehub@example.com</a></li>
              <li><a href="tel:+123456789">tel:+123456789</a></li>
            </ul>
          </Col>

            </Row>
    
            {/* Horizontal Rule */}
            <hr className="mt-4 mb-3" />
    
            {/* Copyright */}
            <Row>
              <Col>
                <p className="text-center text-dark">&copy; 2023 EpicureHub. All Rights Reserved.</p>
              </Col>
            </Row>
          </Container>
        </footer>
      )
}

export default Footer
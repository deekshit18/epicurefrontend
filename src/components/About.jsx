// About.js

import React from 'react';
import { Carousel } from 'react-bootstrap';

import { Container, Row, Col, Image } from 'react-bootstrap';
import './About.css'; // Rename the CSS file
import recchef from '../recchef.jpg'
import chef1 from '../chef1.jpg'
import recipe1 from '../recipe3.jpg'
import hire from '../hire.jpg'
import hire1 from '../hire2.jpg'
import recipec from '../recipe2.jpg'
import { Link } from 'react-router-dom';
import Food from './Food';

function About (){
  return (
<>

<Carousel>
      <Carousel.Item >
        <img
          className="d-block w-100 "
          src={recchef}
          alt="First slide"
        />
        <Carousel.Caption >
          <h3>Discover Unique Culinary Creations</h3>
        </Carousel.Caption>

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={recipec}
          alt="Second slide"
        />
               <Carousel.Caption>
          <h3>Experience Culinary Excellence at Home</h3>
        </Carousel.Caption>

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={hire1}
          alt="Third slide"
        />
 <Carousel.Caption>
          <h3>Celebrate Special Occasions with Custom Menus</h3>
        </Carousel.Caption>

      </Carousel.Item>
    </Carousel>

<Container className="about-container py-5">
      {/* First Row */}
      <Row className="mb-5">
        {/* Image on the Left */}
        
        {/* Key Feature on the Right */}
        <Col lg={6} md={12} className="mb-4 colu mb-lg-0 rounded " style={{backgroundColor: "#0076CE"}}>
        <div className='mt-5'>

          <h1 className=" mb-3  typewriter">
            Discover the Culinary <br /> World
          </h1>
          <p className="text-light">
            Welcome to EpicureHub, the ultimate culinary platform that serves as a nexus for gastronomic enthusiasts,
            talented home chefs, and discerning restaurant owners. Our mission is to create a space where culinary
            creativity flourishes, fostering connections between those who share an unwavering passion for exquisite
            dishes and culinary excellence.
          </p></div>
        </Col>
        <Col lg={6} md={12} className="mb-4 mb-lg-0">
          <img
            src={chef1}
            alt="Introduction Image"
            className="img-fluid rounded about-image"
          />
        </Col>
      </Row>

      {/* Second Row */}
      <Row className="mb-5">
        {/* Key Feature on the Left */}
        <Col lg={6} md={12} className="mb-4 mb-lg-0 rounded colu" style={{backgroundColor: "#0076CE"}}>
        <div className='mt-5'>

          <h1 className=" mb-3  typewriter">Recipe Sharing</h1>
          <p className="text-light ">
            Our platform allows chefs to showcase their culinary creations by sharing detailed recipes, fostering a
            community of food lovers eager to explore and replicate unique dishes.
          </p><button type="button" class="btn text-light" style={{backgroundColor: "#000000"}} fdprocessedid="i5gka4">Add Recipes</button>
</div>
        </Col>
        {/* Image on the Right */}
        <Col lg={6} md={12} className="mb-4 mb-lg-0">
          <Image src={recipe1} alt="Recipe Sharing Image" className="img-fluid rounded about-image " />
        </Col>
      </Row>

      {/* Third Row */}
      <Row className="mb-5">
        {/* Image on the Left */}
        
        {/* Key Feature on the Right */}
        <Col lg={6} md={12} className="mb-4 colu mb-lg-0 rounded" style={{backgroundColor: "#0076CE"}}>
          <div className='mt-5'>
            <h1 className=" mb-3  typewriter">Talent Marketplace</h1>
            <p className="text-light">
            At EpicureHub's Talent Marketplace, restaurant owners can not only discover and hire talented home chefs to bring a diverse and personalized touch to their menus but also connect with users for special events, parties, and functions, creating a culinary community that goes beyond the traditional hiring experience.


</p><Link to="/recipes">
<button type="button" class="btn text-light" style={{backgroundColor: "#000000"}} fdprocessedid="i5gka4">Explore</button></Link>
  </div>
        </Col><Col lg={6} md={12} className="mb-4 mb-lg-0">
          <Image src={hire} alt="Talent Marketplace Image" className="img-fluid shadow about-image " />
        </Col>
      </Row>

      {/* Add more rows as needed */}
      <hr />
    </Container>

    <Food/>

    </>
  );
};

export default About;

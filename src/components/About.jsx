import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './About.css'; // Rename the CSS file
import recchef from '../recchef.jpg';
import chef1 from '../hchef1.jpg';
import recipe1 from '../recipe3.jpg';
import hire from '../hire.jpg';
import hire1 from '../hire2.jpg';
import recipec from '../recipe2.jpg';
import { Link } from 'react-router-dom';
import Box from './Box';
import Quotes from './Quotes';
import Quotes2 from './Quotes2';
import 'aos/dist/aos.css'; // Import the CSS file
import AOS from 'aos';
import Header from './Header';
import Footer from './Footer';

function About({log}) {
  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <div className=' xr'>          <Header log={log}/>

      <Row className='align-items-center mt-5 container-fluid'>
        <Col sm={12} md={6} data-aos='fade-right'>
          <Carousel className='about-img'>
            <Carousel.Item>
              <img className="d-block w-100 " src={recchef} alt="First slide" />
              <Carousel.Caption>
                {/* <h3>Discover Unique Culinary Creations</h3> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 " src={recipec} alt="Second slide" />
              <Carousel.Caption>
                {/* <h3>Experience Culinary Excellence at Home</h3> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 " src={hire1} alt="Third slide" />
              <Carousel.Caption>
                {/* <h3>Celebrate Special Occasions with Custom Menus</h3> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col sm={12} md={6} data-aos='fade-left'>
          <h1 className='text-center text-light ' style={{ fontSize: "50px" }}> EPICUREHUB </h1>
          <p className='text-dark text-center p '>
            "Where Culinary Passion Finds its Hub. Discover, Share, and Savor the Artistry of Food."
          </p>
        </Col>
      </Row>

      <Container className="about-container py-5">
        <Box />
        <Quotes />

        <Row className="mb-5 rw rounded" data-aos='fade-up'>
          <Col lg={6} md={12} className="mb-4 colu mb-lg-0 rounded about-img">
            <div className='mt-5 about-img'>
              <h1 className="mb-3 typewriter">
                Discover the Culinary <br /> World
              </h1>
              <p className="text-light">
                Welcome to EpicureHub, the ultimate culinary platform that serves as a nexus for gastronomic enthusiasts,
                talented home chefs, and discerning restaurant owners. Our mission is to create a space where culinary
                creativity flourishes, fostering connections between those who share an unwavering passion for exquisite
                dishes and culinary excellence.
              </p>
            </div>
          </Col>
          <Col lg={6} md={12} className="mb-4 mb-lg-0" data-aos='fade-right'>
            <Image src={chef1} alt="Introduction Image" className="img-fluid rounded about-image" />
          </Col>
        </Row>

        <Row className="mb-5 rw rounded" data-aos='fade-up'>
          <Col lg={6} md={12} className="mb-4 mb-lg-0 rounded colu about-img">
            <div className='mt-5'>
              <h1 className=" mb-3 typewriter">Recipe Sharing</h1>
              <p className="text-light ">
                Our platform allows chefs to showcase their culinary creations by sharing detailed recipes, fostering a
                community of food lovers eager to explore and replicate unique dishes.
              </p>
              {/* <button type="button" className="btn text-light" style={{ backgroundColor: "#000000" }} fdprocessedid="i5gka4">Add Recipes</button> */}
            </div>
          </Col>
          <Col lg={6} md={12} className="mb-4 mb-lg-0" data-aos='fade-left'>
            <Image src={recipe1} alt="Recipe Sharing Image" className="img-fluid rounded about-image" />
          </Col>
        </Row>

        <Row className="mb-5 rw rounded" data-aos='fade-up'>
          <Col lg={6} md={12} className="mb-4 colu mb-lg-0 rounded">
            <div className='mt-5 '>
              <h1 className=" mb-3 typewriter">Talent Marketplace</h1>
              <p className="text-light">
                At EpicureHub's Talent Marketplace, restaurant owners can not only discover and hire talented home chefs to bring a diverse and personalized touch to their menus but also connect with users for special events, parties, and functions, creating a culinary community that goes beyond the traditional hiring experience.
              </p>
              {/* <Link to="/recipes"> */}
                {/* <button type="button" className="btn text-light" style={{ backgroundColor: "#000000" }} fdprocessedid="i5gka4">Explore</button> */}
              {/* </Link> */}
            </div>
          </Col>
          <Col lg={6} md={12} className="mb-4 mb-lg-0" data-aos='fade-right'>
            <Image src={hire} alt="Talent Marketplace Image" className="img-fluid rounded shadow about-image" />
          </Col>
        </Row>

        <hr />
      </Container>

      <Quotes2 />  <Footer/>

    </div>
  );
}

export default About;

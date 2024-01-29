import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import hmgif from '../giphy (2).gif'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Start({log}) {
  return (
    <>         
    {/* bgs */}
      <Header log={log}/>
    <div className='' style={{width:"100%"}}>
    <Container>
  <Row className='align-items-center'>   <Col sm={12} md={4}>
        
        <img src={hmgif} alt="" style={{height:"100%"}}/>
            </Col>
  
<Col sm={12} md={2}></Col>
  <Col sm={12} md={6}>
        <h1 className='' style={{fontSize:"50px",color:"black"}}> EPICUREHUB       
</h1>
      <p className='text-light p'>
      "Where Culinary Passion Finds its Hub. Discover, Share, and Savor the Artistry of Food."
</p>
<a href='#cat'>
        <Link to={"/register"}>
          <button type="button"   class="bn5" fdprocessedid="44phzq">          Get Started <i class="fa-solid fa-arrow-right"></i>
    </button>
        </Link>
  
</a>    </Col>
 

  </Row>

</Container>


</div>  <Footer/>
</>
  )
}

export default Start
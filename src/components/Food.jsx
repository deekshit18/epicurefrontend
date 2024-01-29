import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { homerecipe } from '../services/allapi';
import { BASEURL } from '../services/baseurl';

function Food() {
  const [hrecipe,sethrecipe]=useState([])

// const retrievedValue = sessionStorage.getItem("token");

  // setlog(sessionStorage.getItem("token"))
// console.log(sessionStorage.getItem("token"));
const gethomerecipe=async()=>{
  const result=await homerecipe()
  console.log(result.data);
  sethrecipe(result.data)
}


useEffect(()=>{
gethomerecipe()
},[])

  return (
    <><div className='mb-3 '>
        
      <Container >
         <Row className='fdd rounded'>

      {hrecipe?.length>0?
      hrecipe.map((item)=>(

        <Col xs={12} md={4}>

      <Card className='food'>
              <Card.Img  variant="top" src={item?`${BASEURL}/uploads/${item.fimage}`:"https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg"}  className='w-100 ' alt="" />
              <Card.Body className='cbd'>
                <Card.Title className='cimg text-center'>{item.fname}</Card.Title>
              </Card.Body>
            </Card>

            </Col>       
)):null}
 <Link className='text-light text-end p-3' to='/items'> 
<strong className='text-light text-end p-3'>View More ></strong>        </Link>

 </Row>
      {/* <Col xs={12} md={4}>

      <Card className='food'>
              <Card.Img variant="top" src="https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg" className='w-100' alt="" />
              <Card.Body className='cbd'>
                <Card.Title className='cimg text-center'>Spaghetti Carbonara</Card.Title>
              </Card.Body>
            </Card>

            </Col>
      <Col xs={12} md={4}>

      <Card className='food'>
              <Card.Img variant="top" src="https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg" className='w-100' alt="" />
              <Card.Body className='cbd'>
                <Card.Title className='cimg text-center'>Spaghetti Carbonara</Card.Title>
              </Card.Body>
            </Card>

            </Col> */}
      </Container>

    
  </div>
</>
  )
}

export default Food
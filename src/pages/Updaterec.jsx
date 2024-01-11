import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Updaterec() {

    
  return (
    <div> <Container className='mt-5'>
    <div className='rounded' style={{ border: '2px solid #FF0000', padding: '10px' }}>
        <Row className="mt-2 mb-3" style={{ borderBottom: '2px solid #FF0000'}}>
          <Col xs={12} md={4}>
            <Form.Group controlId="formFoodName" className='mb-3 fs-4'>
              <Form.Label>Food Name</Form.Label>
              {/* <Form.Control type="text" placeholder="Enter food name" value={recipedata.fname} onChange={(e)=>setrecipedata({...recipedata,fname:e.target.value})}/> */}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}>
          <label htmlFor="foodpo">
          {/* <input id="foodpo" type="file" style={{display:'none'}} onChange={(e)=>setrecipedata({...recipedata,fimage:e.target.files[0]})} /> */}
          {/* <img src={preview?preview:"https://images.pexels.com/photos/1860208/pexels-photo-1860208.jpeg?cs=srgb&dl=cooked-food-1860208.jpg&fm=jpg" }className='w-100' alt="" /> */}
          </label>
            
          </Col>
         
          <Col md={4}>
            <Form.Group controlId="formIngredients">
              <Form.Label>Ingredients</Form.Label>
              {/* <Form.Control as="textarea" rows={5} placeholder="Enter ingredients" value={recipedata.ingredients} onChange={(e)=>setrecipedata({...recipedata,ingredients:e.target.value})}/> */}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formInstructions">
              <Form.Label>Instructions</Form.Label>
              {/* <Form.Control as="textarea" rows={5} placeholder="Enter instructions" value={recipedata.instructions} onChange={(e)=>setrecipedata({...recipedata,instructions:e.target.value})}/> */}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <Button variant="danger" className="mx-2" onClick="">
              Cancel
            </Button>
            <Button variant="primary" className="mx-2" onClick="">
              UPDATE
            </Button>
          </Col>
        </Row>
    </div>
    </Container>
</div>
  )
}

export default Updaterec
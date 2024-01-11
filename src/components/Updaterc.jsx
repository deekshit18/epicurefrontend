import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Container, Row, Col, Form } from 'react-bootstrap';
import { editrecipe } from '../services/allapi';
import Swal from 'sweetalert2';
import { BASEURL } from '../services/baseurl';
import { editresrespcon } from '../context/Contextshare';

function Updaterc({recipe}) {
    const {editrespcon,seteditrespcon}=useContext(editresrespcon)
    const [show, setShow] = useState(false);
    const [recipedata,setrecipedata]=useState({
        id:recipe._id,
        rdate:recipe.rdate,
        uname:recipe.uname,uemail:recipe.uemail,profiles:recipe.profiles,
       fname:recipe.fname,
       fimage:""
       ,ingredients:recipe.ingredients
       ,instructions:recipe.instructions
      })
      const [preview,setPreview]=useState("")

    const handleShow = () => setShow(true);
    const handleClose1 = () =>{handleClose()
        setShow(false);}
    const handleClose = () =>
    {setrecipedata({
        id:recipe._id,
        rdate:recipe.rdate,
        uname:recipe.uname,uemail:recipe.uemail,profiles:recipe.profiles,
       fname:recipe.fname,
       fimage:""
       ,ingredients:recipe.ingredients
       ,instructions:recipe.instructions
      });
    setPreview("")}
const handleupdate=async()=>{
    // e.preventDefault()
    const {id,rdate,uname,uemail,profiles,fname,fimage,ingredients,instructions}=recipedata
    if (!fname ||!ingredients ||!instructions) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Please Fill The Form!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    else{
        const reqbody=new FormData()
        reqbody.append("fname",fname)
        preview?reqbody.append("fimage",fimage):reqbody.append("fimage",recipe.fimage)

        reqbody.append("ingredients",ingredients)
        reqbody.append("instructions",instructions)

    
    const token=sessionStorage.getItem("token")
    
    if(preview){
        const reqheader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result=await editrecipe(id,reqbody,reqheader)
          console.log(result);
          if(result.status==200){
            Swal.fire(
                'Added Successfully!',
                
                'success'
              ) 
            //   handleClose()
              seteditrespcon(result.data)
              handleClose1()
              // window.location.reload()
          }
          else{
            console.log(result.response.data);
          }
    }
    else{
        const reqheader={
            "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
          }
          const result=await editrecipe(id,reqbody,reqheader)
          console.log(result);
    
    if(result.status==200){
        Swal.fire(
            'Added Successfully!',
            
            'success'
          ) 
        //   handleClose()
        seteditrespcon(result.data)
        // window.location.reload()
          handleClose1()

      }
      else{
        console.log(result.response.data);
      }
}
}}


useEffect(()=>{
    if(recipedata.fimage){
    setPreview(URL.createObjectURL(recipedata.fimage))
    }
    },[recipedata.fimage])
  return (
    <>  <Button className='btn ms-auto' style={{backgroundColor:"#D2122E"}} onClick={handleShow}>Update</Button>

    <Modal  show={show} onHide={handleClose1} centered>
    <Modal.Header closeButton style={{ border: '2px solid #FFD700', padding: '10px' }}>
    <Modal.Title style={{color:"#D2122E"}}>Update</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ border: '2px solid #FFD700', padding: '10px' }}>
    <Container className='mt-5'>
    <div className='rounded' style={{ border: '2px solid #FF0000', padding: '10px' }}>
        <Row className="mt-2 mb-3" style={{ borderBottom: '2px solid #FF0000'}}>
          <Col xs={12} md={12}>
            <Form.Group controlId="formFoodName" className='mb-3 fs-4'>
              <Form.Label>Food Name</Form.Label>
              <Form.Control type="text" placeholder="Enter food name" value={recipedata.fname} onChange={(e)=>setrecipedata({...recipedata,fname:e.target.value})}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
          <label htmlFor="foodpo">
          <input id="foodpo" type="file" style={{display:'none'}} onChange={(e)=>setrecipedata({...recipedata,fimage:e.target.files[0]})} />
          <img className='w-100' height={'200px'} src={preview?preview:`${BASEURL}/uploads/${recipe.fimage}`}  />

          </label>
            
          </Col>
         
          <Col md={6}>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formIngredients">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Enter ingredients" value={recipedata.ingredients} onChange={(e)=>setrecipedata({...recipedata,ingredients:e.target.value})}/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formInstructions">
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Enter instructions" value={recipedata.instructions} onChange={(e)=>setrecipedata({...recipedata,instructions:e.target.value})}/>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Row className="mt-3">
          <Col xs={12} className="text-center">
            <Button variant="danger" className="mx-2" onClick="">
              Cancel
            </Button>
            <Button variant="primary" className="mx-2" onClick="">
              UPDATE
            </Button>
          </Col>
        </Row> */}
    </div>
    </Container>
    </Modal.Body>
    <Modal.Footer style={{ border: '2px solid #FFD700', padding: '10px' }}>
    <Button style={{backgroundColor:"#D2122E"}} onClick={handleClose}>
    Close
    </Button>
    <Button style={{backgroundColor:"#FFD700"}} onClick={handleupdate}>
    Send
    </Button>
    </Modal.Footer>
    </Modal></>
  )
}

export default Updaterc
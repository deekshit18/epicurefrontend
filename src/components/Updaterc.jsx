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
    const {id,fname,fimage,ingredients,instructions}=recipedata
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
          handleClose1()
          // window.location.reload()

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
    <> 
    <button class="edit-button" onClick={handleShow}>
  <svg class="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
</button>
     {/* <Button className='' style={{background:"none",border:"none"}} ><i class="fa-regular fa-pen-to-square text-success"></i> Update</Button> */}

    <Modal  show={show} onHide={handleClose1} centered>
    <Modal.Header closeButton style={{ border: '2px solid #FFD700', padding: '10px' }}>
    <Modal.Title style={{color:"#D2122E"}}>Update</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ border: '2px solid #FFD700', padding: '10px' }}>
    <Container className='mt-5'>
    <div className='rounded' style={{ border: '2px solid #FF0000',  padding: '10px' }}>
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
          {/* <input id="foodpo" type="file" style={{display:'none'}} onChange={(e)=>setrecipedata({...recipedata,fimage:e.target.files[0]})} /> */}
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

    <button class="bookmarkBtn" onClick={handleupdate}>
  <span class="IconContainer">
    <svg viewBox="0 0 384 512" height="0.9em" class="icon">
      <path
        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
      ></path>
    </svg>
  </span>
  <p class="text mt-3">Save</p>
</button>
{/* 
    <Button style={{backgroundColor:"#FFD700"}} >
    Send
    </Button> */}
    </Modal.Footer>
    </Modal></>
  )
}

export default Updaterc
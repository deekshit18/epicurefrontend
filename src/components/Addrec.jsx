import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Arheader from './Arheader';
import { addrecipe } from '../services/allapi';
import Swal from 'sweetalert2';
import Pheader from './Pheader';
import itemimg from '../itempreview.png'
function Addrec() {
  const [preview,setPreview]=useState("")
  const [token,setToken]=useState("")
  const [userdetails,setuserdetails]=useState({})

  const [recipedata,setrecipedata]=useState({
    // uname:"",uemail:"",profiles:"",
   fname:"",
   fimage:""
   ,ingredients:""
   ,instructions:""
  })
  useEffect((e)=>{

    setuserdetails(JSON.parse(sessionStorage.getItem("existinguser")))


  },[])
 

  console.log(userdetails);
  const clearall=()=>{
    setrecipedata({fname:"",
   fimage:""
   ,ingredients:""
   ,instructions:""});
   setPreview("")
  }
  console.log(recipedata);
useEffect(()=>{
if(recipedata.fimage){
  (setPreview(URL.createObjectURL(recipedata.fimage)))
}
else{
  setPreview("")
}
},[recipedata.fimage])

const handleadd=async(e)=>{
  e.preventDefault()
// Get current date and time
const currentDateTime = new Date();

// Extract individual components
  const {fname,fimage,ingredients,instructions}=recipedata
  if (!fname || !fimage || !ingredients || !instructions) {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'Please Fill The Form!',
      // footer: '<a href="">Why do I have this issue?</a>'
    })
  }
  else{
    //req body
    
const year = currentDateTime.getFullYear();
const month = currentDateTime.getMonth() + 1; // Months are zero-based, so add 1
const day = currentDateTime.getDate();
const rdate= day + "-" + month + "-" + year
    console.log("Current Date:",rdate);

        //1 create object for formdata-since we have upload content 
        const reqbody = new FormData()
        //2 add data to formdata-append()
        reqbody.append("rdate",rdate)

        reqbody.append("uname",userdetails.username)
        reqbody.append("uemail",userdetails.email)
        reqbody.append("profiles",userdetails.profile)

    
reqbody.append("fname",fname)
reqbody.append("fimage",fimage)
reqbody.append("ingredients",ingredients)
reqbody.append("instructions",instructions)
if (token) {
  const reqheader={
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
  }
  const result=await addrecipe(reqbody,reqheader)
console.log("result: ",result);

  if (result.status===200) {
      console.log(result.data);   
      Swal.fire({
        icon: 'success',
        title: 'Recipe Posted',
        text: 'Successfully',
      });   
     
      clearall() 
  }
  else{
    Swal.fire({
      title: result.response.data,
      icon: 'error',
    })
    console.log(result.response.data);
  }

}
  }
}
useEffect(()=>{
  if(sessionStorage.getItem("token"))
  {
    setToken(sessionStorage.getItem("token"))
  }
  else{
    setToken("")
  }
},[])
  return (
   <>
      <Pheader/>
      <Container className='mt-5'>
      <div className='rounded' style={{ border: '2px solid #FF0000', padding: '10px' }}>
          <Row className="mt-2 mb-3" style={{ borderBottom: '2px solid #FF0000'}}>
            <Col xs={12} md={4}>
              <Form.Group controlId="formFoodName" className='mb-3 fs-4'>
                <Form.Label>Food Name</Form.Label>
                <Form.Control type="text" placeholder="Enter food name" value={recipedata.fname} onChange={(e)=>setrecipedata({...recipedata,fname:e.target.value})}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
            <label htmlFor="foodpo">
            <input id="foodpo" type="file" style={{display:'none'}} onChange={(e)=>setrecipedata({...recipedata,fimage:e.target.files[0]})} />
            <img src={preview?preview:itemimg }className='w-100' style={{height:"220px"}} alt="" />
            </label>
              {/* <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.File
                  id="custom-file"
                  label="Choose an image"
                  custom
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="img-fluid mt-2"
                    style={{ display: 'block' }}
                  />
                )}
              </Form.Group> */}
              
            </Col>
           
            <Col md={4}>
              <Form.Group controlId="formIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter ingredients" value={recipedata.ingredients} onChange={(e)=>setrecipedata({...recipedata,ingredients:e.target.value})}/>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter instructions" value={recipedata.instructions} onChange={(e)=>setrecipedata({...recipedata,instructions:e.target.value})}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} className="text-center">
              <Button variant="danger" className="mx-2" onClick={clearall}>
                Cancel
              </Button>
              <Button variant="primary" className="mx-2" onClick={handleadd}>
                POST
              </Button>
            </Col>
          </Row>
      </div>
      </Container>
   </>
  );
}

export default Addrec;

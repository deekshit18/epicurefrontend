import React, { useState } from 'react'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import login from '../login.png'
import register from '../register.png'
import { loginAPI, registerAPI } from '../services/allapi';
import Swal from 'sweetalert2';


function Authntication({reg}) {
  const [userdata,setUserdata]=useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userdata);
  const navigate=useNavigate()

    const registerform=reg?true:false
    const handlechange=async(e)=>{
      e.preventDefault()
      const {username,email,password}=userdata
        if(!username || !email || !password)
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill The Form!',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
          
          // alert("Please Fill The Form")
        }
        else{
          const result=await registerAPI(userdata)
          console.log(result.data);
          if(result.status===200){
            Swal.fire(
              'Successfully Registered!',
              // result.data.username,
              'success'
            )      
            setUserdata({
              username:""
              ,email:"",
              password:""
            })
            //navigate to login
            navigate('/login')
          }
          else{
            Swal.fire({
              // title: result.response.data,
              icon: 'info',
            })
          }
        }
      
      }
      // login 
      const handlelogin=async(e)=>{
        e.preventDefault()
      const {email,password}=userdata
        if( !email || !password)
        {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Please Fill The Form!',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
          
          // alert("Please Fill The Form")
        }
        else{
         const result= await loginAPI(userdata)
         console.log(result);
         if(result.status===200){
          //alert
          Swal.fire(
            'Login Successfully!',
            
            'success'
          ) 
          //store
          sessionStorage.setItem("existinguser",JSON.stringify(result.data.existinguser))
          sessionStorage.setItem("token",result.data.token)
      
            //state empty
            setUserdata({
              email:"",
              password:""
            })  
          //navigate 
          navigate('/')
        }
        else{
          Swal.fire({
            title: result.response.data,
            icon: 'error',
          })
        }
      
      }}
      
    return (
    <div className='vh-100' style={{backgroundColor: "#0076CE"}}>

<Container fluid className=" d-flex align-items-center justify-content-center"> 
   
      <Row className="container text-dark w-75 h-75" style={{}} >
      <Col md={6} className="d-flex align-items-center justify-content-center">
{       
registerform?<Image style={{width:"100%"}} src={register} alt="Image"  />
:<Image src={login} alt="Image" fluid />

}      </Col>

      <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
        <h1 className='text-dark'>EPICUREHUB</h1>
        <h6 className='text-light'>{
                  registerform?"Sign Up to your Account":"Sign into Account"

            }
            </h6>

        {/* <Form className="mb-3 mt-3"> */}

        <div class="form-group w-75">
        {
        
        registerform && <>
       <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" placeholder="Username" fdprocessedid="1ydzd" style={{width:"100%",borderRadius:"5px"}} value={userdata.username} onChange={(e)=>setUserdata({...userdata,username:e.target.value})}/>
          <label for="floatingInput">Username</label>
        </div>
        </>}

            

  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" fdprocessedid="1ydzd" style={{width:"100%",borderRadius:"5px"}} value={userdata.email} onChange={(e)=>setUserdata({...userdata,email:e.target.value})}/>
    <label for="floatingInput">Email address</label>
  </div>
  <div class="form-floating">
    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" autocomplete="off" fdprocessedid="hfoup9" style={{width:"100%",borderRadius:"5px"}} value={userdata.password} onChange={(e)=>setUserdata({...userdata,password:e.target.value})}/>
    <label for="floatingPassword" >Password</label>
  </div>
</div>


          {/* <Form.Group controlId="formBasicPassword" className='mb-3'>
            <Form.Control type="password" placeholder="Password"/>
          </Form.Group> */}
          {/* </Form> */}

{registerform?
<div className='w-75 align-items-center justify-content-center'>
    <Button className='text-center mt-3 bg-primary  btn' variant="info" onClick={handlechange}>
                Register
              </Button>
              <h6 className='mt-3'><span className='text-light'>Already a user ? </span> 
                <Link to={"/login"}>Click here to Login.</Link>
                </h6>
</div>:

          <div className='w-75'>
              <Button className='mt-3 bg-primary' variant="info" type="submit" onClick={handlelogin}>
                Login
              </Button>
    
            <h6 className='mt-3'>New user? 
                <Link to={"/register"}>Click here to register.</Link>
                </h6>
          </div>
}
      </Col>
    </Row>
  </Container>

    </div>
  )
}

export default Authntication
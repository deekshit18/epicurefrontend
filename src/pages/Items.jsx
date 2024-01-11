import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Accordion, InputGroup, FormControl } from 'react-bootstrap';
import Rheader from '../components/Rheader';
import { allrecipe } from '../services/allapi';
import { BASEURL } from '../services/baseurl';
import Message from '../components/Message';

function Items() {
  const [allrecipes,setAllrecipes]=useState([])
  const [searchkey,setSearchkey]=useState("")
 const [istoken,setistoken]=useState(false)


 const [userprofiles,setuserprofiles]=useState({
  username:"",email:""
})


 const getuserprofile=async()=>{
   const token=JSON.parse(sessionStorage.getItem("existinguser"))
     
     console.log(token._id);
     setuserprofiles({...userprofiles,username:token.username,email:token.email})
     console.log(userprofiles);
 }
 useEffect(()=>{
   getuserprofile()
   },[])


   const getallrecipe=async()=>{
     if(sessionStorage.getItem("token")){
       const token=sessionStorage.getItem("token")
       const reqheader={
         "Content-Type":"application/json",
     "Authorization":`Bearer ${token}`
       }
     
 
 
     const result=await allrecipe(searchkey,reqheader)
     console.log(result.data);
     if(result.status===200){
       setAllrecipes(result.data)
 
     }
   }
   }
   useEffect(()=>{
     getallrecipe()
     },[searchkey])
     useEffect(()=>{
       if(sessionStorage.getItem("token")){
         setistoken(true)
       }
       },[])
     console.log(searchkey);
 
  return (

    <>
        <Rheader/>

      <Container>
      <Row  className='mb-5'>

        <Col md={4}></Col>
        <Col md={4}>
          <form class="d-flex mt-3">
            <input class="form-control w-100 " type="search" placeholder="Search" value={searchkey}   onChange={e=>setSearchkey(e.target.value)}/>
            {/* <button class="btn btn-secondary my-2 my-sm-0" type="submit" fdprocessedid="w29eyw">Search</button> */}
          </form>
        </Col>
        <Col md={4}></Col>

      </Row>


        {/* Row 1 */}
        <Row  className="" style={{justifyContent:"space-evenly"}}>
        {    
allrecipes?.length>0?allrecipes?.map((item)=> (

          <Col md={3} className='rounded m-2 ' style={{ border: '4px solid #FFD700'}}>
            {/* Row 1, Col 1 */}
            <Row  className='mb-2' style={{  borderBottom:'4px solid #FFD700',background:"#FFD700",color:"red"}}>
              <Col md={8}  className='mb-2 mt-2 d-flex' >
                <img
                  src={item.profiles?`${BASEURL}/uploads/${item.profiles}`:"https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
                  alt="Profile Photo"
                  className="img-fluid rounded-circle"
                  style={{ border: '2px solid red',width:"50px",height:"50px"}}/>
                              <h3 className='ms-4 mt-2'>{item.uname}</h3>
                            <br />  <span>{item.uemail}</span>
  
              </Col>
              
            </Row>
          
          {/* Row 1, Col 2 */}
          {/* <Col md={8}> */}
            {/* Row 2 */}
            <Row>
              <Col md={12}>
                <img src={item?`${BASEURL}/uploads/${item.fimage}`:"https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg"} alt="Image" className="img-fluid" />
              </Col>
            </Row>
            {/* Row 3 */}
            <Row  className='mt-2'>
              <Col md={6}>
                <h3>{item.fname}</h3>
              </Col><Col md={6} style={{}}>
                <h3><Message resp={item} usp={userprofiles}/></h3>
              </Col>
            </Row>
            
          <Accordion className="mt-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Ingredients</Accordion.Header>
            <Accordion.Body>
              <strong>{item.ingredients}</strong>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion className="mt-3 mb-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Instructions</Accordion.Header>
            <Accordion.Body>
              <strong>{item.instructions}</strong>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
          </Col>)):<div>{
  istoken?<p>Sorry no such Recipe currently available</p>:<p className='fs-3 text-danger'>Please Login to view more projects</p>}</div>

}
        </Row>
  
        </Container>
  
    </>
  );
}

export default Items;

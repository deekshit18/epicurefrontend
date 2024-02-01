import React, { useContext, useEffect, useState } from 'react';
import {  Row, Col, Accordion } from 'react-bootstrap';
import { allrecipe, deleterecipe } from '../services/allapi';
import { BASEURL } from '../services/baseurl';
import Message from '../components/Message';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { isadmincontext } from '../context/Contextshare';
import Adminside from '../components/Adminside';
import Pheader from '../components/Pheader';
import nopro from '../noprof.png'
import backg from "../back2.jpg";
import empty from "../empty.png";
function Items() {
  const { isadminres, setisadminres } = useContext(isadmincontext);

  const [allrecipes, setAllrecipes] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [istoken, setIstoken] = useState(false);

  const [userprofiles, setUserprofiles] = useState({
    username: "",
    email: ""
  });

  useEffect(() => {
    // Initialize AOS with your preferred options
    AOS.init({
      duration: 1000,
      offset: 50, // Change as needed
      easing: 'ease-out-cubic', // Choose a timing function
      once: true, // Only animate elements once
    });
  }, []);

  const getuserprofile = async () => {
    const token = JSON.parse(sessionStorage.getItem("existinguser"));

    console.log(token._id);
    setUserprofiles({ ...userprofiles, username: token.username, email: token.email });
    console.log(userprofiles);
  };

  useEffect(() => {
    getuserprofile();
  }, []);

  const getallrecipe = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await allrecipe(searchkey, reqheader);
      console.log(result.data);
      if (result.status === 200) {
        setAllrecipes(result.data);
      }
    }
  };
  const handledelete = async (id) => {
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    await deleterecipe(id, reqheader);
    getallrecipe();
  };
  useEffect(() => {
    getallrecipe();
  }, [searchkey]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIstoken(true);
    }
  }, []);

  console.log(searchkey);

  return (
    <> <div className='xr' style={{backgroundImage: `url(${backg})`,minHeight:"100vh"}}>
{ isadminres?   <Adminside/>:  <Pheader />
}
      {/* <Container className=''> */}
   
          <Row className='mb-5 ' >
            <Col md={4}></Col>
            <Col md={4}>
              <form class="d-flex mt-3 container" data-aos="slide-down">
                <input class="form-control w-100 " type="search" placeholder="Search" value={searchkey} onChange={e => setSearchkey(e.target.value)} />
              </form>
            </Col>
            <Col md={4}></Col>
          </Row>
  
          {/* Recipe Cards */}
          <Row className="justify-content-center m-3 ">
            {allrecipes?.length > 0 ? allrecipes?.map((item) => (
              <Col data-aos="zoom-in" md={3} key={item._id} className='rounded m-4 bg-light' style={{
                border: '4px solid #0099ff',
                boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
              }}>
                {/* Profile Section */}
                <Row className='mb-2' style={{ borderBottom: '4px solid #0099ff', background: "#0099ff", color: "red" }}>
                  <Col md={12} className='mb-2 mt-2 d-flex align-items-center '>
                    <img
                      src={item.profiles ? `${BASEURL}/uploads/${item.profiles}` : nopro}
                      alt="Profile Photo"
                      className="img-fluid rounded-circle"
                      style={{ border: '2px solid white', width: "60px", height: "60px" }}
                    />
                    <div className='ms-4'>
                      <h3 className='text-light'>{item.uname}</h3>
                      <span className='text-light'>{item.uemail}</span>
                    </div>
                  </Col>
                </Row>
  
                {/* Recipe Image */}
                <Row className=' '>
                  <Col md={12} className='w-100'>
                    <img src={item ? `${BASEURL}/uploads/${item.fimage}` : "https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg"} alt="Image" style={{height:"220px"}} className=" w-100" />
                  </Col>
                </Row>
  
                {/* Recipe Details */}
                <Row className='mt-2'>
                  <Col md={12}>
                    <h3 className='' style={{color:"#0099ff"}}>{item.fname}</h3>
                  </Col>
                </Row>
  
                {/* Accordion for Ingredients */}
                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Ingredients</Accordion.Header>
                    <Accordion.Body>
                      <strong>{item.ingredients}</strong>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
  
                {/* Accordion for Instructions */}
                <Accordion className="mt-3 mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Instructions</Accordion.Header>
                    <Accordion.Body>
                      <strong>{item.instructions}</strong>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
  
                {/* Message Component */}
                <Row className='justify-content-center bottom-end m-1 ' style={{bottom:0}}>
{
                isadminres?<button className="noselect dltbut p-2 " onClick={() => handledelete(item._id)}><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
  :<Message resp={item.uemail} usp={userprofiles} />}
                </Row>
                {/* <Row className="justify-content-between m-1" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <Col md={6} className="d-flex justify-content-start">
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <p className="me-3">{item.rdate?item.rdate:null}</p>
        </Col>
      </Row> */}
              </Col>
            )) : <div>{
              istoken ? <div className='text-center'><p className='text-light fs-4'>Sorry, no such recipes are currently available!</p>
              <img src={empty} style={{width:"300px"}} alt="" /></div> : <p className='fs-3 text-danger'>Please login to view more recipes</p>
            }</div>}
          </Row>
  
    </div>      {/* </Container> */}
    </>
  );
}

export default Items;

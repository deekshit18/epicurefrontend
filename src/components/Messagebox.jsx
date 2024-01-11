import React, { useEffect, useState } from 'react';
import { Button, Offcanvas, ListGroup } from 'react-bootstrap';
import { allmessage } from '../services/allapi';

function Messagebox() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
const [getmesg,setgetmesg]=useState({})
  const handleToggle = () => setShowOffcanvas((prev) => !prev);
  const [filtermesg,setfiltermesg]=useState({})



  const getallmessage=async()=>{
    if(sessionStorage.getItem("token")){
      const token=sessionStorage.getItem("token")
       const reqheader={
         "Content-Type":"application/json",
     "Authorization":`Bearer ${token}`
       }
      const result=await allmessage(reqheader)
    console.log(result.data);
    if(result.status===200){
      setgetmesg(result.data)
      console.log(getmesg);
      const email = JSON.parse(sessionStorage.getItem("existinguser")).email
      // Filter messages where sender is the user's email
      const filteredMessages = result.data.filter((message) => message.receiver === email);
      setfiltermesg(filteredMessages);
      console.log(filtermesg);
    }
  }
  }

//   useEffect(()=>{
//     const email=JSON.parse(sessionStorage.getItem("existinguser")).email
//     console.log(email);
// // filter checking sender=email

//   },[])


  useEffect(()=>{
    getallmessage()
    },[])
console.log(getmesg);
  return (
    <>
      <Button variant="primary" onClick={handleToggle}>
        Open Messages
      </Button>

      <Offcanvas show={showOffcanvas} onHide={handleToggle} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Messages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
{        filtermesg?.length>0?filtermesg?.map((item)=> (

          <ListGroup className='mb-2'>
            {/* Replace this with actual messages data */}
            <ListGroup.Item>
              <div style={{ marginBottom: '8px' }}>
                <strong>{item.sender}</strong>
                <span className="float-end">{item.time} {item.date}</span>
              </div>
              <div>{item.message}</div>
            </ListGroup.Item>
            {/* Add more ListGroup.Items as needed */}
          </ListGroup>)): <p>No Notification</p>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Messagebox;

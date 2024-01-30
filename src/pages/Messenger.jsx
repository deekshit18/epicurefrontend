import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Modal, Accordion } from 'react-bootstrap';
import { allmessage, deletemessage, sendmessage } from '../services/allapi';
import Swal from 'sweetalert2';
import Pheader from '../components/Pheader';
import { SketchPicker } from 'react-color';
import { isadmincontext } from '../context/Contextshare';
import Adminside from '../components/Adminside';

function Messenger() {
  const { isadminres, setisadminres } = useContext(isadmincontext);

  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Initial background color

  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const [getmesg, setgetmesg] = useState({});
  const [filtermesgReceiver, setFiltermesgReceiver] = useState([]);
  const [filtermesgSender, setFiltermesgSender] = useState([]);
  const [userdetails, setuserdetails] = useState({});
  const [messages, setMessages] = useState({
    message: "",
    sender: "",
    receiver: "",
    time: "",
    date: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getallmessage = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result = await allmessage(reqheader);
      console.log(result.data);
      if (result.status === 200) {
        setgetmesg(result.data);
        console.log(getmesg);
        const email = JSON.parse(sessionStorage.getItem("existinguser")).email;
        const filteredMessagesReceiver = result.data.filter((message) => message.receiver === email);
        setFiltermesgReceiver(filteredMessagesReceiver);
        const filteredMessagesSender = result.data.filter((message) => message.sender === email);
        setFiltermesgSender(filteredMessagesSender);
        console.log(filtermesgReceiver);
        console.log(filtermesgSender);
      }
    }
  };

  useEffect(() => {
    setuserdetails(JSON.parse(sessionStorage.getItem("existinguser")));
    getallmessage();
  }, []);

  console.log(getmesg);

  const handleSend = async (e) => {
    e.preventDefault();

    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();
    const hour = currentDateTime.getHours();
    const minute = currentDateTime.getMinutes();
    const second = currentDateTime.getSeconds();

    const ndate = `${day}-${month}-${year}`;
    const ntime = `${hour}:${minute}:${second}`;
    const { message, receiver } = messages;

    try {
      if (!message || !receiver) {
        Swal.fire('Fill All TextBox!');
      } else {
        if (receiver === userdetails.email) {
          Swal.fire('Thats Your Email');
        } else {
          const result = await sendmessage({
            ...messages,
            time: ntime,
            date: ndate,
            sender: userdetails.email,
          });

          if (result.status === 200) {
            // Swal.fire('success');
            // setMessages({
            //   message: "",
            //   receiver:""
            // });

            getallmessage();
          } else {
            Swal.fire({
              title: "Failed!",
              icon: 'error',
            });
            console.log(result.response.data);
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const [showSendingSection, setShowSendingSection] = useState(false);

  const handleToggleSendingSection = () => {
    setShowSendingSection(!showSendingSection);
  };
//
const handledelete = async (id) => {
  const token = sessionStorage.getItem("token");
  const reqheader = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
  await deletemessage(id, reqheader);
  getallmessage();
};
  return (
    <>
{   
isadminres?<Adminside/>:   <Pheader />
}  
<div className='maindiv' style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
        <Container fluid>
          <Row className='ms-3 mb-5 me-3 p-3'>
            <Col md={6} className='mb-4'>
              {filtermesgReceiver?.length > 0 ? (
                filtermesgReceiver?.map((item) => (
                  <div key={item._id} style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', marginBottom: '15px', padding: '10px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                    <div style={{}}>
                      <strong>From: {item.sender}</strong>
                      <span style={{}} className="float-end">{item.time} {item.date}</span>

                    </div>
<div>
                      <p className='w-100' style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{item.message}</p>
</div>

                  </div>
                ))
              ) : (
                <p>No Receiver Messages</p>
              )}
            </Col>

            <Col md={6} className='mb-4'>
              {filtermesgSender?.length > 0 ? (
                filtermesgSender?.map((item) => (
                  <div className='w-100' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', marginBottom: '15px', padding: '10px', borderRadius: '8px', backgroundColor: '#0084FF' ,color:"white"}}>
                    <div style={{}}>
                      <strong>To: {item.receiver}</strong>
                      <span className="float-end">{item.time} {item.date} <span class="badge m-2 rounded-pill bg-danger " onClick={() => handledelete(item._id)}>Delete</span>
</span>
                    </div>
                
                    <p className='w-100' style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{item.message}</p>
                    
                  </div>
                ))
              ) : (
                <p>No Sender Messages</p>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Accordion className='fixed-bottom'>
        <div class="accordion-item" >
          <h2 class="accordion-header" id="headingSender" >
            <button class="accordion-button" type="button"  onClick={handleToggleSendingSection}>
              Send Messages
            </button>
          </h2>
          <Accordion.Collapse eventKey="0" in={showSendingSection}>
            <div id="collapseSender" >
              <Form.Group controlId="formTextarea" className='d-flex' style={{ justifyContent: "space-between" }}>
                <Form.Label style={{ color: "#D2122E" }}>
                  <div class="form-group">
                    <label class="col-form-label col-form-label-sm mt-4" for="inputSmall">Send To:</label>
                    <input class="form-control form-control-sm" type="text" placeholder="Receiver's Email" id="inputSmall"
                      value={messages.receiver}
                      onChange={(e) => setMessages({ ...messages, receiver: e.target.value })} />
                  </div>
                </Form.Label>
                <div>
                  <Button className='rounded border border-dark me-4' style={{ backgroundColor: backgroundColor }} onClick={handleShowModal}>
                    
                  </Button>
                  <Button className='bg-success border-light m-1' onClick={handleSend}>
                  <i className="fa-solid fa-paper-plane fa-bounce " style={{color: "#ffffff"}}></i>
                  </Button>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={messages.message}
                  onChange={(e) => setMessages({ ...messages, message: e.target.value })}
                />
              </Form.Group>
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>

      {/* Modal for Color Picker */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Set Background Colour</Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
          <div className='d-flex' style={{ justifyContent: "center" }}>
            <SketchPicker color={backgroundColor} onChange={handleColorChange} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Messenger;

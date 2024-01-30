import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { sendmessage } from '../services/allapi';
import Swal from 'sweetalert2';
import { isadmincontext } from '../context/Contextshare';

function Message({ resp, usp }) {
  const { isadminres, setisadminres } = useContext(isadmincontext);


  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState({
    message: "",
    sender: usp.email,
    receiver: resp,
    time: "",
    date: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    // Load user details from sessionStorage
    const userdetails = JSON.parse(sessionStorage.getItem("existinguser"));
    if (userdetails) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        sender: userdetails.username,
      }));
    }
  }, []);
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
        if (receiver === usp.email) {
          Swal.fire('Thats Your Post');
        }
      else{const result = await sendmessage({
        ...messages,
        time: ntime,
        date: ndate,
        sender: usp.email,
        receiver: resp, // Add the receiver field
      });
  
      if (result.status === 200) {
        Swal.fire('success');
        setMessages({
          message: "",
        });
        handleClose();
      } else {
        Swal.fire({
          title: 'Failed!',
          icon: 'error',
        });
        console.log(result.response.data);
      }}}
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  
  return (
    <>
      {isadminres?
      <i class="fa-regular fs-4 fa-message text-danger" onClick={handleShow}></i> :<Button className='btn m-3' style={{ backgroundColor: "#D2122E" }} onClick={handleShow}>
        Ask Doubts
      </Button>}

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body style={{ border: '2px solid #FFD700', padding: '10px' }}>
          <Form>
            <Form.Group controlId="formTextarea">
              <Form.Label style={{ color: "#D2122E" }}>Send To : {resp}</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={messages.message}
                onChange={(e) => setMessages({ ...messages, message: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ border: '2px solid #FFD700', padding: '10px' }}>
          <Button style={{ backgroundColor: "#D2122E" }} onClick={handleClose}>
            Close
          </Button>
          <Button style={{ backgroundColor: "#FFD700" }} onClick={handleSend}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Message;

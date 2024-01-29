import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { sendmessage } from '../services/allapi';
import Swal from 'sweetalert2';

function Notisend() {
  const [showModal, setShowModal] = useState(false);
  const [userdetails,setuserdetails]=useState({})

  const [messages, setMessages] = useState({
    message: "",
    sender: userdetails.email,
    receiver:"",
    time: "",
    date: "",
  });
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    // Load user details from sessionStorage
     setuserdetails(JSON.parse(sessionStorage.getItem("existinguser")))
    if (userdetails) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        sender: userdetails.email,
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
  
    try {
      const result = await sendmessage({
        ...messages,
        time: ntime,
        date: ndate,
        sender: userdetails.email// Add the receiver field
      });
  
      if (result.status === 200) {
        Swal.fire('success');
        setMessages({
          message: "",
        });
        handleClose();
      } else {
        Swal.fire({
          title: result.response.data,
          icon: 'error',
        });
        console.log(result.response.data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  
  return (
    <>
      <Button className='btn ms-auto' style={{ backgroundColor: "#D2122E" }} onClick={handleShow}>
        Message
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        {/* ... (rest of the Modal component) */}
        <Modal.Body style={{ border: '2px solid #FFD700', padding: '10px' }}>
          <Form>
            <Form.Group controlId="formTextarea">
              <Form.Label style={{ color: "#D2122E" }}><div class="form-group">
  <label class="col-form-label col-form-label-sm mt-4" for="inputSmall">Send To:</label>
  <input class="form-control form-control-sm" type="text" placeholder="Reciver's Email" id="inputSmall"   value={messages.receiver}
                onChange={(e) => setMessages({ ...messages, receiver: e.target.value })}/>
</div>
</Form.Label>
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

export default Notisend

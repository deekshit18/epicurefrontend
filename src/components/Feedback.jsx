import React, { useEffect, useState } from 'react';
import { TextField, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { sendmessage } from '../services/allapi';
import Swal from 'sweetalert2';

function Feedback() {
  const [message, setMessage] = useState('');
  const [uemail, setUemail] = useState('');

  useEffect(() => {
    const userdetails = JSON.parse(sessionStorage.getItem('existinguser'));
    if (userdetails) {
      setUemail(userdetails.email);
    }
  }, []);

  const handleSend = async () => {
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
      if (!message) {
        Swal.fire('Fill in the TextBox!');
      } else {
        if (uemail === 'admin@gmail.com') {
          Swal.fire('You cannot send a message to yourself.');
        } else {
          const result = await sendmessage({
            message,
            sender: uemail,
            receiver: 'admin@gmail.com',
            time: ntime,
            date: ndate,
          });

          if (result.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Feedback Sent Successfully!',
                text: 'Thank you for your feedback.',
              });            setMessage('');
          } else {
            Swal.fire({
              title: result.response.data,
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

  return (
    <>
      <div className="d-flex align-items-center">
      <TextField
  multiline
  fullWidth
  rows={5}
  variant="outlined"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  label="Your Feedback"
  InputLabelProps={{
    style: { color: '' },
  }}
  sx={{ border: '1px solid black', borderRadius: '5px', backgroundColor: 'white', marginTop: '10px' }}
/>

        <IconButton style={{ backgroundColor: '#D2122E', marginLeft: '10px', marginTop: '10px' }} onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </div>
      <Typography variant="subtitle2" sx={{ color: '#D2122E', marginTop: '10px' }}>
        Provide your valuable feedback.
      </Typography>
    </>
  );
}

export default Feedback;

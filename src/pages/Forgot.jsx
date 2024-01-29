import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import { editprofile } from '../services/allapi';
import backg from "../back2.jpg";

// const StyledBox = styled(Box)({

//   height: '100vh',
//   backgroundImage: "url('https://www.pngmagic.com/product_images/blue-3d-background-hd.jpg')",
//   backgroundSize: 'cover',
// });

function Forgot() {
  const [userdetails, setuserdetails] = useState({});
  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    profile: ""
  });

  useEffect(() => {
    setuserdetails(JSON.parse(sessionStorage.getItem("existinguser")));
  }, []);

  const handlePasswordChange = async () => {
    const { username, email, oldPassword, newPassword, profile } = userdata;

    if (!oldPassword || !newPassword) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Please provide both old and new passwords.'
      });
      return;
    }

    if (oldPassword !== userdetails.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Old password does not match the current password.'
      });
      return;
    }

    const reqbody = new FormData();
    reqbody.append("username", userdetails.username);
    reqbody.append("email", userdetails.email);
    reqbody.append("password", newPassword);
    reqbody.append("profile", userdetails.profile);
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    };

    const result = await editprofile(reqbody, reqheader);

    if (result.status === 200) {
      sessionStorage.setItem("existinguser", JSON.stringify(result.data));
      Swal.fire({
        icon: 'success',
        title: 'Password',
        text: 'Updated'
      });
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{backgroundImage: `url(${backg})`, minHeight: '100vh' }}
    >
      <Grid item xs={12} md={6} lg={12}>
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            {/* <h2 >Change Password</h2> */}
            <TextField
              label="Old Password"
              type="password"
              value={userdata.oldPassword}
              onChange={(e) => setuserdata({ ...userdata, oldPassword: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Password"
              type="password"
              value={userdata.newPassword}
              onChange={(e) => setuserdata({ ...userdata, newPassword: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Button className='' variant="contained" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </Box>
      </Grid>
    </Grid>       

  );
}

export default Forgot;

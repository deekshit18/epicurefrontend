import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { editprofile } from '../services/allapi';
import backg from "../back2.jpg";
import Pheader from '../components/Pheader';
import { useNavigate } from 'react-router-dom';

function Forgot() {
  const [userdetails, setuserdetails] = useState({});
  const navigate = useNavigate();

  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    profile: ""
  });
  const [passwordValidation, setPasswordValidation] = useState({
    oldPassword: true,
    newPassword: true,
    newPasswordLabel: ""
  });

  useEffect(() => {
    setuserdetails(JSON.parse(sessionStorage.getItem("existinguser")));
  }, []);

  const handlePasswordChange = async () => {
    const { oldPassword, newPassword } = userdata;
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
      setPasswordValidation({ ...passwordValidation, oldPassword: false });
      return;    }
    // Validate old password
   

    // Validate new password using regular expression
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordValidation({
        ...passwordValidation,
        newPassword: false,
        newPasswordLabel: "Password must be at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character."
      });
      return;
    }
else{
    // Clear validation messages
    setPasswordValidation({
      oldPassword: true,
      newPassword: true,
      newPasswordLabel: ""
    });

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
      navigate('/');

    }
  }}

  return (
    <div style={{ backgroundImage: `url(${backg})`, minHeight: '100vh' }}>
      <Pheader />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid item xs={12} md={6} lg={12} className='m-1'>
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
            <TextField
              label="Old Password"
              type="password"
              value={userdata.oldPassword}
              onChange={(e) => setuserdata({ ...userdata, oldPassword: e.target.value })}
              fullWidth
              margin="normal"
              error={!passwordValidation.oldPassword}
              helperText={!passwordValidation.oldPassword && "Please enter the old password."}
            />
            <TextField
              label="New Password"
              type="password"
              value={userdata.newPassword}
              onChange={(e) => setuserdata({ ...userdata, newPassword: e.target.value })}
              fullWidth
              margin="normal"
              error={!passwordValidation.newPassword}
              helperText={!passwordValidation.newPassword && passwordValidation.newPasswordLabel}
            />
            <div className='text-center m-1'>
              <Button className='' variant="contained" onClick={handlePasswordChange}>
                Change Password
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Forgot;

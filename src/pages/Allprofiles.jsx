import React, { useContext, useEffect, useState } from 'react';
import { alluser } from '../services/allapi';
import backg from "../back2.jpg";

import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
} from '@mui/material';
import { BASEURL } from '../services/baseurl';
import { Dashboard, MailOutline, PeopleAlt, Receipt, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Messagebox from '../components/Messagebox';
import Logout from '../components/Logout';
import Message from '../components/Message';
import { isadmincontext } from '../context/Contextshare';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Adminside from '../components/Adminside';
function Allprofiles() {
  const { isadminres, setisadminres } = useContext(isadmincontext);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [uspp, setuspp] = useState({});


  const getuserprofile = async () => {
setuspp(JSON.parse(sessionStorage.getItem("existinguser")))
console.log(uspp);
  };

  useEffect(() => {
    getuserprofile();
    setisadminres(true);

    AOS.init({
      duration: 1000, 
      once: true, 
      easing: 'ease-in-out', 
    });
  }, []);

  const getalluserss = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqheader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await alluser(reqheader);
      console.log(result.data);
      if (result.status === 200) {
        setUsers(result.data);

      }
    }
  };

  useEffect(() => {
    getalluserss();
  }, []);

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
<div style={{backgroundImage: `url(${backg})`,minHeight:"100vh"}}>
  
      <Grid container spacing={0} >
       <Adminside/>
        {/* Search Input */}
        <Container>
        <Grid item xs={12} md={9} lg={6} className='m-2 mt-3'>
          <TextField
            label="Search by Email or Username"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 5}}
          />
        </Grid>
  
        {/* User Cards */}
          <Grid container spacing={2} className='m-2'>
          {filteredUsers
              .filter(user => user.email !== 'epicurehub@gmail.com') // Exclude admin user
              .map((user) => (            <Grid item key={user.id} xs={12} sm={6} md={4} lg={2} data-aos="fade-up"
             
      >
                <Card>
                  <CardHeader
                    avatar={<Avatar alt={user.userName} src={`${BASEURL}/uploads/${user.profile}`} />}
                    title={user.username}
                    subheader={user.email}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                                <Message resp={user.email} usp={uspp} />      </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grid>
</div>
  );
}

export default Allprofiles;

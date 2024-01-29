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
        <Grid item xs={12} >
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" onClick={handleToggleSidebar} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Admin Dashboard</Typography>
              <IconButton color="inherit" sx={{ ml: 'auto' }}>
                <Messagebox />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
  
        {/* Sidebar */}
        <Grid item xs={12} md={3} lg={2} className='mt-5'>
          <Drawer
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
              },
              display: { xs: openSidebar ? 'block' : 'none', md: 'block' },
            }}
            variant="temporary"
            anchor="left"
            open={openSidebar}
            onClose={handleToggleSidebar}
          >
            {/* Profile Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                backgroundColor: (theme) => theme.palette.primary.main,
              }}
            >
              <Avatar alt="Admin" src="/path/to/profile-photo.jpg" sx={{ width: 64, height: 64, mb: 1 }} />
              <Typography variant="subtitle1" color="white">
                Admin
              </Typography>
            </Box>
  
            {/* Navigation Links */}
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <Link to="/items" className="text-dark">
                <ListItem button>
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText primary="All Recipes" />
                </ListItem>
              </Link>
              <ListItem button>
                <ListItemIcon>
                  <MailOutline />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <PeopleAlt />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </List>
              <Logout />
            </List>
          </Drawer>
        </Grid>
        <Container>
  
        {/* Search Input */}
        <Grid item xs={12} md={9} lg={6}>
          <TextField
            label="Search by Email or Username"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 5}}
          />
        </Grid>
  
        {/* User Cards */}
          <Grid container spacing={2} className='mb-5'>
          {filteredUsers
              .filter(user => user.email !== 'admin@gmail.com') // Exclude admin user
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

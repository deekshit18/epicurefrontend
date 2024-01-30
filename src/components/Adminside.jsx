import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';

import { Menu, Dashboard, Receipt, MailOutline, PeopleAlt } from '@mui/icons-material';
import Logout from './Logout';
import Messagebox from './Messagebox';

function Adminside() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggleSidebar} sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant="h6">Admin</Typography>
            {/* Replace the following IconButton with your actual component */}
            <IconButton color="inherit" sx={{ ml: 'auto' }}>
              <Messagebox />
              {/* Replace the above line with your actual component */}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>

      {/* Sidebar */}
      <Grid item xs={12} md={3} lg={2}>
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
            <Avatar
              alt="Admin"
              src="/path/to/profile-photo.jpg" // Replace with the actual path to the profile photo
              sx={{ width: 64, height: 64, mb: 1 }}
            />
            <Typography variant="subtitle1" color="white">
              Admin
            </Typography>
          </Box>

          {/* Navigation Links */}
          <List>
            <Link to="/" className="text-darkk">
              <ListItem button>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>

            <Link to="/items" className="text-darkk">
              <ListItem button>
                <ListItemIcon>
                  <Receipt />
                </ListItemIcon>
                <ListItemText primary="All Recipes" />
              </ListItem>
            </Link>

            <Link to="/mesg" className="text-darkk">
              <ListItem button>
                <ListItemIcon>
                  <MailOutline />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
            </Link>

            <Divider />

            <List>
              <Link to="/adminpro" className="text-darkk">
                <ListItem button>
                  <ListItemIcon>
                    <PeopleAlt />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </Link>
            </List>
          </List>
          <Logout />
        </Drawer>
      </Grid>
    </>
  );
}

export default Adminside;

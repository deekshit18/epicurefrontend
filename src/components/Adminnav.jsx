import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Box,
} from '@mui/material';
import { Dashboard, Receipt } from '@mui/icons-material';

const AdminNav = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
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
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Receipt />
          </ListItemIcon>
          <ListItemText primary="All Recipes" />
        </ListItem>
      </List>

      {/* Add more links as needed */}

      {/* Divider */}
      <Divider />

      {/* Other Links or Components */}
      {/* <List>
        <ListItem button>
          <ListItemIcon>
            <SomeIcon />
          </ListItemIcon>
          <ListItemText primary="Some Link" />
        </ListItem>
      </List> */}
    </Drawer>
  );
};

export default AdminNav;

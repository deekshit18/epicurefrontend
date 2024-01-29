import React, {  useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider, IconButton, Box, Grid, Paper, Button, AppBar, Toolbar } from '@mui/material';
import { Dashboard, Receipt, Notifications, PeopleAlt, LocalPizza, MailOutline, Event, Menu } from '@mui/icons-material';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import 'react-calendar/dist/Calendar.css';
import { Container } from 'react-bootstrap';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Messagebox from './Messagebox';
import Logout from './Logout';

function Admindash({ recipes, allmesg, users }) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      once: true, // Only run once
      easing: 'ease-in-out', // Easing function
    });
  }, []);
  const data = [
    { name: 'Total Recipes', value: recipes.length },
    { name: 'Total Messages', value: allmesg.length },
    { name: 'Total Users', value: users.length - 1 },
    { name: 'New Users', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const [date, setDate] = useState(new Date());
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggleSidebar} sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant="h6">Admin Dashboard</Typography>
            <IconButton color="inherit" sx={{ ml: 'auto' }}>
              <Messagebox />
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
              src="/path/to/profile-photo.jpg" 
              sx={{ width: 64, height: 64, mb: 1 }}
            />
            <Typography variant="subtitle1" color="white">
              Admin
            </Typography>
          </Box>

          {/* Navigation Links */}
          <List>     <Link to="/" className="text-darkk"> 
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

      {/* Main Content */}
      <Grid item xs={12} md={12} lg={12}>
        <Container>
          <Box p={2}>
            {/* Notification Bell */}

            {/* Statistics Boxes */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}   data-aos="zoom-out-right">
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: '#e8f5e9' }}>
                  <Typography variant="h6">
                    <PeopleAlt fontSize="large" />
                    Users
                  </Typography>
                  {/* Use CountUp for the number display */}
                  <CountUp end={users.length - 1} duration={2} separator="," style={{ fontSize: '1.5rem', color: '#0088FE' }} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} data-aos="zoom-in-up">
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: '#fce4ec' }}>
                  <Typography variant="h6">
                    <LocalPizza fontSize="large" />
                    Recipes
                  </Typography>
                  {/* Use CountUp for the number display */}
                  <CountUp end={recipes.length} duration={2} separator="," style={{ fontSize: '1.5rem', color: '#00C49F' }} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}  data-aos="zoom-out-left">
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: '#ffe0b2' }}>
                  <Typography variant="h6">
                    <MailOutline fontSize="large" />
                    Messages
                  </Typography>
                  {/* Use CountUp for the number display */}
                  <CountUp end={allmesg.length} duration={2} separator="," style={{ fontSize: '1.5rem', color: '#FF8042' }} />
                </Paper>
              </Grid>
            </Grid>

            {/* Pie Charts */}
            <Typography variant="h4" className='text-light' mt={4} mb={3}>
              Statistics Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}  data-aos="flip-right">
                <Paper elevation={3} sx={{ p: 2 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}  data-aos="flip-left">
                <Paper elevation={3} sx={{ p: 2 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} data-aos="fade-down-left">
                <Paper elevation={3} sx={{ p: 2,mt:2 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <Calendar onChange={handleDateChange} value={date} />
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={9} data-aos="fade-down-right">
  <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
</Grid>

            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Admindash;

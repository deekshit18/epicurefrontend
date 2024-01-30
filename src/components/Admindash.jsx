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
import Adminside from './Adminside';

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
    { name: 'New Users', value: 1 },
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
      
      <Adminside/>
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

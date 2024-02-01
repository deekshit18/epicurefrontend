import React, { useContext } from 'react';
import { Container, Grid, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import Feedback from './Feedback';
import { isauthtokencontext } from '../context/Contextshare';

import icon from '../log2.png';
import './Footer.css';

function Footer() {
  // const { istokenres } = useContext(isauthtokencontext);
  const {istokenres,setistokenres}=useContext(isauthtokencontext)

  return (
    <footer className="foot text-dark py-5">
      <Container>
      {istokenres?  
        <Grid container spacing={3}>
           
          <Grid  xs={12} lg={12}>
            <img src={icon} alt="EpicureHub Logo" className="img-fluid mb-3 w-25" />
          </Grid>

         
       
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff', height: '100%' }} />
  
            <Grid item xs={12} lg={3}>
              <Typography variant="h5" className='m-1'>Pages</Typography>
              <ul className="list-unstyled p-1">
                <li>
                  <Link to="/" className="text-light">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/items" className="text-light">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/addrecipe" className="text-light">
                    Add Recipe
                  </Link>
                </li>
                <li>
                  <Link to="/mesg" className="text-light">
                    Message
                  </Link>
                </li>
              </ul>
            </Grid>
  
            {/* Contact Information */}
            <Grid item xs={12} lg={4}>
              <Typography variant="h5" className='m-1'>Contact Us</Typography>
              <ul className="list-unstyled contact-list p-1">
                <li>
                  <a href="#" className="text-light">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="mailto:Epicurehub@example.com" className="text-light">
                    Epicurehub@example.com
                  </a>
                </li>
                <li>
                  <a href="tel:+123456789" className="text-light">
                    +123456789
                  </a>
                </li>
              </ul>
            </Grid>
  
            {/* // Feedback */}
              <Grid item xs={12} lg={4}>
                <Feedback />
              </Grid>
        
          </Grid>:null}
  
          {/* Horizontal Rule */}
          <Divider className="mt-4 mb-3" />
         

        {/* Copyright */}
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body2" align="center" className="text-light">
              &copy; 2023 EpicureHub. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;

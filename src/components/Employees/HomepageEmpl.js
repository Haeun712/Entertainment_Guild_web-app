// src/components/Employees/HomepageEmpl.js
// Component to display the employee homepage with quick links to view patrons/customers and products

import HeroImg from '../../assets/Hero_image.png'
import { Box, Typography, Grid } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
import ViewPatron from '../../assets/viewPatron.svg'
import ViewUser from '../../assets/viewUser.svg'
import ViewItem from '../../assets/viewItem.svg'
import CreateUser from '../../assets/createUser.svg'
import CreateItem from '../../assets/createItem.svg'
import Footer from '../Footer';

const HomepageEmpl = () => {
  const quickLink = [
    /* create pages (Create Product) for adding new user/product (in progress)*/
    /* Currently linking to view pages */
    { label: 'View Customers', to: '/empl/patrons', img: ViewPatron },
    { label: 'View Products', to: '/empl/products', img: ViewItem },
  ]

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url(' + HeroImg + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '80vh',
          marginBottom: '-20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: '10px',
          paddingLeft: '10px'
        }}>
        <Grid container spacing={4}
          sx={{ width: '620px', justifyContent: 'center' }} >
          {quickLink.map((quickLink, index) => (
            <Grid size={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }} >
              <Box
                component={Link}
                to={quickLink.to}
                sx={{
                  color: 'white',
                  width: '180px',
                  height: '180px',
                  borderRadius: 2,
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#282120D3',
                  textDecoration: 'none'
                }}>
                <img src={quickLink.img} alt='icon' style={{ display: 'block', width: '100px' }} />
                <Typography variant='h6' align='center'>{quickLink.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}

export default HomepageEmpl;
import HeroImg from '../../assets/Hero_image.png'
import { Box, Typography, Grid } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
import ViewPatron from '../../assets/viewPatron.svg'
import ViewUser from '../../assets/viewUser.svg'
import ViewItem from '../../assets/viewItem.svg'
import CreatePatron from '../../assets/createPatron.svg'
import CreateUser from '../../assets/createUser.svg'
import CreateItem from '../../assets/createItem.svg'

const HomepageAdmin = () => {
  const quickLink = [
    { label: 'View Patrons', to: '/patrons', img: ViewPatron},
    /* not working (runtime error in users page)*/
    { label: 'View Users', to: '/users', img: ViewUser },
    { label: 'View Items', to: '/items', img: ViewItem },
    /* not working, will link to create patron page */
    { label: 'Create Patron', to: '/patrons', img: CreatePatron},
    /* not working, will link to create user page */
    { label: 'Create User', to: '/users', img: CreateUser },
    /* not working, will link to create patron page */
    { label: 'Create Item', to: '/items', img: CreateItem },
  ]

  return (
      <Box 
      sx={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url(' + HeroImg + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '650px',
        marginBottom: '-20px',
        display: 'flex',
        alignItems: 'center',
            justifyContent: 'center',
            paddingRight: '10px',
            paddingLeft: '10px'
      }}>
          <Grid container spacing={4}
          sx={{width: '540px', justifyContent:'center'}} >
            {quickLink.map((quickLink, index) => (
              <Grid size={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }} >
                <Box
                  component={Link}
                  to={quickLink.to}
                  sx={{
                    color: 'white',
                    width:'150px',
                    height: '150px',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#282120',
                    textDecoration: 'none'
                  }}>
                  <img src={quickLink.img} alt='icon' style={{display:'block', width:'80px'}}/>
                  <Typography variant='h6' align='center'>{quickLink.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
  );
}

export default HomepageAdmin;
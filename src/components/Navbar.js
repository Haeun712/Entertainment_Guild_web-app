import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Entertainment_Guild_Logo from '../assets/Entertainment_Guild_Logo.png';
import UserIcon from '../assets/User.svg';
import CartIcon from '../assets/Shopping cart.svg';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';

function Navbar() {

  return (
      <AppBar position="static" sx={{ backgroundColor: "white", color: "black", height: "100px", boxShadow: "none", borderBottom: "1px solid #282120" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: "100px", display: "flex", alignItems: "center" }}>
            {/*Entertainment Guild Logo  (link to homepage)*/}
            <Box
              component={Link}
              to="/"
              sx={{ display: 'flex', mr: 2, cursor: 'pointer' }}>
              <img src={Entertainment_Guild_Logo} alt="Entertainment Guild Logo" style={{ height: 56 }} />
            </Box>

            <Box sx={{ flexGrow: 1, display:'flex' }}>
              {/*Navigation item, linking to the all product page (including books, movies, games)*/}
              <Typography
                component={Link}
                to={`/products`}
                sx={{
                  color: "black",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  marginRight: 2,
                  cursor: 'pointer',
                  "&:hover": { textDecoration: "underline" }, // hover
                }}
              >
                PRODUCTS
              </Typography>

            

              {/*Navigation item for search functionality, linking to the search page*/}
              <Typography
                component={Link}
                to={`/search`}
                sx={{
                  color: "black",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  marginRight: 2,
                  cursor: 'pointer',
                  "&:hover": { textDecoration: "underline" }, // hover
                }}
              >
                SEARCH
              </Typography>
            </Box>


            {/*Shopping Cart, link not working (in progress)*/}
            <Box
              component={Link}
              to="/cart"
              sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', mr: 2, cursor: 'pointer' }}>
              <img src={CartIcon} alt="Cart icon" style={{ height: 27, widht: 27 }} />
            </Box>

            {/*Login, link not working (in progress)*/}
            <Box
              component={Link}
              to="/login"
              sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}>
              <img src={UserIcon} alt="User icon" style={{ height: 27, widht: 27, marginRight: '5px' }} />
              <Typography
                sx={{
                  color: "black",
                  "&:hover": { textDecoration: "underline" }, // hover
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                LOG IN
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>


  );
}

export default Navbar;
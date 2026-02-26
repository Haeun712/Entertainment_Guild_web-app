// src/components/Navbar.js
// Navigation bar component that includes links to homepage, products, search, cart, and login/profile
// for customer users (Patrons or non-logged-in users)

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
import { useAuth } from '../AuthProvider';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Badge } from '@mui/material';
import { Tooltip } from '@mui/material'

function LogInStatus() {
  // State for menu open/close for Hamburger menu 
  const [anchorElNav, setAnchorElNav] = useState(null);
  const auth = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  console.log("Auth user in Navbar: ", auth.user);





  return (
    <Box
      sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
      <img src={UserIcon} alt="User icon" style={{ height: 27, width: 27, marginRight: '5px' }} />


      {auth.user ? (
        <>
          <Typography
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{
              "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
              cursor: 'pointer',
            }}
          >
            {auth.user.userData.username}
          </Typography>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: 'block' }}
          >

            <MenuItem
              disableRipple
              sx={{
                "&.Mui-focusVisible": { backgroundColor: 'transparent' },
                "&:hover": { backgroundColor: "transparent" } // hover
              }}>
              <Typography
                component={Link}
                to={'/myprofile'}
                sx={{
                  color: "black",
                  textDecoration: "none",
                  alignItems: "center",
                  cursor: 'pointer',
                  "&:hover": {
                    textDecoration: "underline",
                  }, // hover
                }}
                onClick={handleCloseNavMenu}
              >
                MY PROFILE
              </Typography>
            </MenuItem>
            <MenuItem
              disableRipple
              sx={{
                "&:hover": { backgroundColor: "transparent" } // hover
              }}>
              <Typography
                component={Link}
                to={'/myorders'}
                sx={{
                  color: "black",
                  textDecoration: "none",
                  alignItems: "center",
                  cursor: 'pointer',
                  "&:hover": {
                    textDecoration: "underline",
                  }, // hover
                }}
                onClick={handleCloseNavMenu}
              >
                MY ORDERS
              </Typography>
            </MenuItem>
            <MenuItem
              disableRipple
              sx={{
                "&:hover": { backgroundColor: "transparent" } // hover
              }}>
              <Typography
                onClick={() => {
                  handleCloseNavMenu();
                  auth.logout();
                }}
                sx={{
                  color: "black",
                  textDecoration: "none",
                  alignItems: "center",
                  cursor: 'pointer',
                  "&:hover": {
                    textDecoration: "underline",
                  }, // hover
                }}
              >
                LOG OUT
              </Typography>
            </MenuItem>
          </Menu>
        </>
      ) : (

        <Typography
          component={Link}
          to="/login"
          sx={{
            color: "black",
            textDecoration: 'none',
            "&:hover": { textDecoration: "underline" }, // hover
          }}
        >
          LOG IN
        </Typography>
      )}
    </Box>
  );
}

function Navbar() {
  const [itemCount, setitemCount] = useState(JSON.parse(localStorage.getItem('cart')).length || 0);

  React.useEffect(() => {
    const updateItemCount = () => {
      setitemCount(JSON.parse(localStorage.getItem('cart')).length || 0);
    }

    //https://stackoverflow.com/questions/50767241/observe-localstorage-changes-in-js
    //update the number of Item (count) state when Cart (localStorage) changed
    window.addEventListener("cartUpdated", updateItemCount);

    return () => {
      //remove the event listner when the component removed from the UI
      window.removeEventListener("cartUpdated", updateItemCount);
    }
  }, [])

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black", height: "100px", boxShadow: "none", borderBottom: "1px solid #282120" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "100px", display: "flex", alignItems: "center" }}>
          {/*Entertainment Guild Logo  (link to homepage)*/}
          <Tooltip title='Homepage'>
            <Box
              component={Link}
              to="/"
              sx={{ display: 'flex', mr: 2, cursor: 'pointer' }}>
              <img src={Entertainment_Guild_Logo} alt="Entertainment Guild Logo" style={{ height: 72 }} />
            </Box>
          </Tooltip>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
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


          {/*Shopping Cart, linking to the cart page*/}
          <Tooltip title="Cart">
            <Box
              component={Link}
              to="/cart"
              sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', mr: 2, cursor: 'pointer' }}>
              <Badge
                badgeContent={itemCount}
                color='primary'
                showZero
                overlap='circular'
                sx={{
                  "& .MuiBadge-badge": {
                    color: 'white',
                    backgroundColor: "#EC221F"
                  }
                }}
              >
                <img src={CartIcon} alt="Cart icon" style={{ height: 27, width: 27 }} />
              </Badge>

            </Box>
          </Tooltip>

          {/*Login, linking to the login page*/}
          <LogInStatus />
        </Toolbar>
      </Container>
    </AppBar>


  );
}

export default Navbar;
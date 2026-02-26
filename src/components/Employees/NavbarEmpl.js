// src/components/Employees/NavbarEmpl.js
// Component to display the navigation bar for employee users (Employee Homepage, Patrons and Products pages and logout)

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Entertainment_Guild_Logo from '../../assets/Entertainment_Guild_Logo.png';
import UserIcon from '../../assets/User.svg';
import {
  BrowserRouter as Router,
  Routes, Route, Link, 
} from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import logoutIcon from '../../assets/Log out.svg';


const pages = ['ACCOUNTS', 'ITEMS'];

function NavbarEmpl() {
  // State for menu open/close for Hamburger menu 
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const auth = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black", height: "100px", boxShadow: "none", borderBottom: "1px solid #282120" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "100px", display: "flex", alignItems: "center" }}>

          {/*Entertainment Guild Logo  (link to employee homepage)*/}
          <Box
            component={Link}
            to="/empl"
            sx={{ display: 'flex', mr: 2, cursor: 'pointer' }}>
            <img src={Entertainment_Guild_Logo} alt="Entertainment Guild Logo" style={{ height: 72 }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {/*link to view account (patron only) page*/}
              <Typography
              component={Link}
              to={`/empl/patrons`}
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
              ACCOUNTS
            </Typography>

            {/*link to view its product  page*/}
            <Typography
              component={Link}
              to={`/empl/products`}
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
          </Box>

          <Box
            sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={UserIcon} alt="User icon" style={{ height: 27, widht: 27, marginRight: '5px' }} />
            {auth.user ? auth.user.userData.username : null}
          </Box>

          <Box
            onClick={() => auth.logout()}
            sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', ml: 1, cursor: 'pointer' }}>
            <img src={logoutIcon} alt="logout icon" style={{ height: 27, widht: 27 }} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>


  );
}

export default NavbarEmpl;
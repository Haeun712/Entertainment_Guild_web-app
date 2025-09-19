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
  Routes, Route, Link
} from 'react-router-dom';


const pages = ['ACCOUNTS', 'ITEMS'];

function NavbarAdmin() {
  // State for menu open/close for Hamburger menu 
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



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

            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              {/*Menu items for each account type (patron, user), linking to its corresponding page*/}
              <Box sx={{ display: 'flex', marginRight: '20px' }}>
                <Typography
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{
                    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    cursor: 'pointer',
                  }}
                >
                  ACCOUNTS
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
                    sx={{
                      "&:hover": { backgroundColor: "transparent" } // hover
                    }}>
                    <Typography
                      component={Link}
                      to={'/admin/patrons'}
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
                      PATRONS
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": { backgroundColor: "transparent" } // hover
                    }}>
                    <Typography
                      component={Link}
                      to={'/users'}
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
                      USERS
                    </Typography>
                  </MenuItem>

                </Menu>
              </Box>

              <Typography
                component={Link}
                to={`/items`}
                sx={{
                  color: "black",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  marginRight: 2,
                  cursor: 'pointer',
                  "&:hover": { textDecoration: "underline" }, // hover
                }}
                onClick={handleCloseNavMenu}
              >
                ITEMS
              </Typography>
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
                  display: 'flex'
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

export default NavbarAdmin;
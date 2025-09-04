import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Entertainment_Guild_Logo from '../assets/Entertainment_Guild_Logo.png';
import { Link } from '@mui/material';
import UserIcon from '../assets/User.svg';
import CartIcon from '../assets/Shopping cart.svg';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const pages = ['GAMES', 'MOVIES', 'BOOKS'];

function Navbar() {
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

          {/*Menu icon and menu items for small (mobile) screen*/}
          {/*Link not working (in progress)*/}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*Entertainment Guild Logo for small (mobile) screen (link to homepage)*/}
          {/*Link not working (in progress)*/}
          <Box
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Box
              component={Link}
              to="/"
              sx={{ cursor: 'pointer' }}>
              <img src={Entertainment_Guild_Logo} alt="Entertainment Guild Logo" style={{ height: 60, marginRight: 10 }} />
            </Box>
          </Box>


          {/*Entertainment Guild Logo for medium screens and larger (link to homepage)*/}
          {/*Link not working (in progress)*/}
          <Box
            component={Link}
            to="/"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, cursor: 'pointer' }}>
            <img src={Entertainment_Guild_Logo} alt="Entertainment Guild Logo" style={{ height: 56}} />
          </Box>

          {/*Menu items and search bar for medium screens and larger*/}
          {/*Link not working (in progress)*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Typography
                component={Link}
                to={`/${page.toLowerCase()}`} // /games, /movies, /books
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
                {page}
              </Typography>
            ))}

            {/*Search bar*/}
            {/*Search bar query not working (in progress)*/}
            <Paper
              component="form"
              sx={{display: { xs: 'none', md: 'flex'}, alignItems: 'center', width: '100%', maxWidth: 500, marginRight: 2, boxShadow: 'none', borderBottom: '1px solid #282120', borderRadius: 0 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="SEARCH"
                inputProps={{ 'aria-label': 'search', style: {textAlign: 'center'}}}
              />
              <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
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
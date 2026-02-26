// src/components/Login/Login.js
// Component to handle user login functionality for patrons and staff (employees and admins)
// It authenticates users and manages login state using the AuthProvider context

import * as React from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    InputLabel,
    OutlinedInput,
    TextField,
    InputAdornment,
    Link,
    Box,
    IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../../assets/Entertainment_Guild_Logo.png';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const auth = useAuth();

    const handleLogin = (event) => {
        event.preventDefault(); //Prevent reloading of the page
        if (username && password) {
            auth.login(username, password);
            return;
        }
        alert("Please enter both username and password");
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }   

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Box
            sx={{
                margin: '60px 40px',
                display: 'flex',
                justifyContent: 'center'
            }}>
            <Box
                sx={{
                    width: '40%',
                    minWidth: '300px',
                    padding: '10px 30px 50px 30px',
                    maxWidth: '400px',
                    border: '1px solid #282120',
                    borderRadius: '10px'
                }}>
                    <IconButton disableRipple onClick={() => navigate("/")}
                    sx={{
                        color: "Black",
                        "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                        borderColor: "#282120",
                        padding: '0',
                        marginLeft: '-15px'
                    }}><ArrowBackIcon /></IconButton>
                    <h2 style={{textAlign:'center', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center'}}>Log in to <img src={Logo} alt={'logo'} style={{height: '56px', alignItems: 'center'}}/></h2>
                    <p style={{textAlign:'center', marginTop: '8px', marginBottom: '30px', fontSize: '16px'}}>Welcome! <br/>Please log in to continue</p>
                <form method="post" onSubmit={handleLogin}>
                    <FormGroup sx={{my: 2}}>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <InputLabel size="small" htmlFor="input-with-icon-textfield">
                            Email or Username
                        </InputLabel>
                        <OutlinedInput
                            id="username-field"
                            type="text"
                            name="username"
                            size="small"
                            label="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            fullWidth
                        />
                    </FormControl>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <InputLabel size="small" htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="password-field"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            size="small"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff fontSize="inherit" />
                                        ) : (
                                            <Visibility fontSize="inherit" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            value={password}
                            autoComplete='new-password'
                            onChange={handlePasswordChange}
                            required
                            fullWidth
                        />
                    </FormControl>
                    </FormGroup>
                    {/* link to Forgot password page  */}
                    <Link href="/forgotpassword" variant="body2"
                        sx={{
                            display: 'block',
                        }}>
                        Forgot password?
                    </Link>
                    {/* Log in */}
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disableElevation
                        fullWidth
                        sx={{ 
                            marginTop: 5, 
                            marginBottom: '20px',
                            color: 'white',
                            backgroundColor: '#282120',
                            padding: '8px'}}
                    >
                        Log In
                    </Button>
                </form>
                <hr style={{margin: 0}}/>
                <Button href="/register" variant="outlined"
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        marginTop: '20px',
                        color: '#282120',
                        borderColor: '#282120',
                        padding: '8px',
                        '&:hover': {backgroundColor: 'transparent'}
                    }}>
                    SIGN UP
                </Button>

            </Box>
        </Box>
    );
}


export default Login
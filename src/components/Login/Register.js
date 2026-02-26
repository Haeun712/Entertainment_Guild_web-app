// src/components/Login/Register.js
// Component to handle user registration for new patrons
// It collects user details and creates new entries in the User and Patron databases

import * as React from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    TextField,
    InputAdornment,
    Link,
    Checkbox,
    FormControlLabel,
    Box,
    IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../../assets/Entertainment_Guild_Logo.png';
import { tryAddNewPatron } from '../../helpers/patronHelpers';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { tryAddNewUser } from '../../helpers/userHelpers'


const Register = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmpassword, setConfirmPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const isAdmin = false; // customer never be admin
    const isPatron = true;
    const navigate = useNavigate();

    function handleAddPatron(event) {
        event.preventDefault(); //Prevent reloading of the page
        // Check if passwords match
        if (password !== confirmpassword) {
            setPasswordError(true); // Set error state (passwords do not match)
            return;
        }


        setPasswordError(false); // Clear error state (passwords match)

        // add customer to USER DB so they can log in (via POST login request)
        // add customer to PATRON DB
        tryAddNewUser(username, email, name, isAdmin, password, isPatron, navigate)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setUsername(event.target.value);
    }

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
        setName(event.target.value + " " + surname);
    }

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
        setName(firstname + " " + event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }


    // Password visibility toggle
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

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
                    width: '60%',
                    minWidth: '300px',
                    padding: '10px 30px 50px 30px',
                    maxWidth: '400px',
                    border: '1px solid #282120',
                    borderRadius: '10px'
                }}>
                <IconButton disableRipple onClick={() => navigate("/login")}
                    sx={{
                        color: "Black",
                        "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                        borderColor: "#282120",
                        padding: '0',
                        marginLeft: '-15px'
                    }}><ArrowBackIcon /></IconButton>
                <h2 style={{ textAlign: 'center', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>Sign up for <img src={Logo} alt={'logo'} style={{ height: '56px', alignItems: 'center' }} /></h2>
                <form method='post' onSubmit={handleAddPatron}>
                    <FormGroup sx={{ my: 2 }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="email">Email</label>
                            <TextField
                                label="Enter your email"
                                variant="outlined"
                                name="email"
                                id="email"
                                fullWidth
                                size='small'
                                type="email"
                                required
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </FormControl>
                        {/* Name Fields - must be filled */}
                        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px', alignItems: 'center', maxWidth: '500px' }}>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="firstname">First Name</label>
                                <TextField
                                    label="Enter your firstname"
                                    variant="outlined"
                                    name="firstname"
                                    id="firstname"
                                    size='small'
                                    fullWidth
                                    value={firstname}
                                    onChange={handleFirstnameChange}
                                    required
                                />
                            </FormControl>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="surname">Surname</label>
                                <TextField
                                    label="Enter your surname"
                                    variant="outlined"
                                    name="surname"
                                    id="surname"
                                    size='small'
                                    fullWidth
                                    value={surname}
                                    onChange={handleSurnameChange}
                                    required
                                />
                            </FormControl>
                        </div>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="password">Password</label>
                            <TextField
                                label="Create your password"
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                fullWidth
                                size='small'
                                InputProps={{
                                    endAdornment: (
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
                                    ),
                                }}
                                required
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </FormControl>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="confirmpassword">Confirm Password</label>
                            <TextField
                                label="Re-enter your password"
                                variant="outlined"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmpassword"
                                id="confirmpassword"
                                fullWidth
                                sx={{ maxWidth: '500px' }}
                                size='small'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="small"
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff fontSize="inherit" />
                                                ) : (
                                                    <Visibility fontSize="inherit" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                value={confirmpassword}
                                onChange={handleConfirmPasswordChange}
                                required
                                error={passwordError}
                                helperText={passwordError ? "Passwords do not match" : ""}
                            />
                        </FormControl>
                    </FormGroup>

                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disableElevation
                        fullWidth
                        sx={{
                            marginTop: 5,
                            color: 'white',
                            backgroundColor: '#282120',
                            padding: '8px'
                        }}
                    >
                        SIGN UP
                    </Button>
                </form>

            </Box>
        </Box>
    );
}


export default Register
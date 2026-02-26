// src/components/Admins/Account/createStaff.js
// Component to create a new staff account and add it to the User DB (admin only)

import { useState } from "react";
import {
    Box, Button, FormControl,
    FormGroup, TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { tryAddNewUser } from '../../../helpers/userHelpers';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const CreateStaff = () => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [name, setName] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [confirmpassword, setConfirmPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const isPatron = false; // staff/user is never patron

    function handleAddUser(event) {
        event.preventDefault(); //Prevent reloading of the page

        // Check if passwords match
        if (password !== confirmpassword) {
            setPasswordError(true); // Set error state (passwords do not match)
            return;
        }

        setPasswordError(false); // Clear error state (passwords match)
        tryAddNewUser(username, email, name, isAdmin, password, isPatron, navigate);
    }

    const handleIsAdminChange = (event) => {
        setIsAdmin(event.target.checked);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
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
        <div style={{ padding: '40px' }}>
            <Button disableRipple onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}
                sx={{
                    color: "Black",
                    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    borderColor: "#282120"
                }}>
                Back</Button>
            <h1>CREATE STAFF</h1>
            <form  method='post' onSubmit={handleAddUser}>
                <FormGroup sx={{ my: 2, width: '100%', maxWidth: '900px' }}>

                    {/* Is Admin Checkbox */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}> 
                        <Checkbox
                            sx={{
                                color: '#282120',
                                '&.Mui-checked': {
                                    color: '#282120',
                                },
                                paddingLeft: '0',
                            }}
                            checked={isAdmin}
                            onChange={handleIsAdminChange}
                        />
                        <label style={{ fontSize: '16px' }}>Is Admin?<br/>
                        <span style={{ fontSize: '14px', color: 'gray'}}>Allow the user to access admin features</span></label>
                    </div>

                    {/* Username Field - must be filled */}
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="username">User Name</label>
                        <TextField
                            variant="outlined"
                            name="username"
                            id="username"
                            size='small'
                            sx={{ maxWidth: '500px' }}
                            fullWidth
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </FormControl>

                    {/* Email Field - must be email type and filled */}
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="email">Email</label>
                        <TextField
                            variant="outlined"
                            type="email"
                            name="email"
                            id="email"
                            size='small'
                            sx={{ maxWidth: '500px' }}
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </FormControl>

                    {/* Name Fields - must be filled */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px', alignItems: 'center', maxWidth: '500px' }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="firstname">First Name</label>
                            <TextField
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

                    {/* Password Field */}
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="password">Password</label>
                        <TextField
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            fullWidth
                            sx={{ maxWidth: '500px' }}
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
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="confirmpassword">Confirm Password</label>
                        <TextField
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
                {/* create new item in DB */}
            <Button variant="contained"
                type="submit"
                sx={{
                    marginTop: '20px',
                    backgroundColor: '#282120',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    padding: '10px',
                    height: '40px',
                    width: '100px'
                }}>
                CREATE
            </Button>
            </form>
        </div>
    );
}

export default CreateStaff
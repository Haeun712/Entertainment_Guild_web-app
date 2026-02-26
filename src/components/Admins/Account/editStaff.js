// src/components/Admins/Account/editStaff.js
// Component to edit an existing staff account (admin or employee) for admin users (except password)
// It allows updating the staff account information in the User DB (admin only)

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
import { tryEditUser } from '../../../helpers/userHelpers';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const EditStaff = () => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [name, setName] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);

    // Get UserID from URL params
    const UserID = useParams().UserID;
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        },
        withCredentials: true
    });

    useEffect(() => {
        //Get Selected User's Data

        client.get('/User/' + UserID)
            .then((response) => {
                const userData = response.data;
                setUsername(userData.UserName);
                setEmail(userData.Email);
                const nameParts = userData.Name.split(" ");
                setFirstname(nameParts[0]);
                setSurname(nameParts.slice(1).join(" "));
                setName(userData.Name);
                setIsAdmin(JSON.parse(userData.IsAdmin));
            })
    }, []);

    // Handle Edit User form submission
    function handleEditUser(event) {
        event.preventDefault(); //Prevent reloading of the page
        tryEditUser(UserID, username, email, name, isAdmin, navigate);
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


    return (
        <div style={{ padding: '40px' }}>
            <Button disableRipple onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}
                sx={{
                    color: "Black",
                    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    borderColor: "#282120"
                }}>
                Back</Button>
            <h1>EDIT USER</h1>
            <form method='post' onSubmit={handleEditUser}>
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
                        <label style={{ fontSize: '16px' }}>Is Admin?<br />
                            <span style={{ fontSize: '14px', color: 'gray' }}>Allow the user to access admin features</span></label>
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


                </FormGroup>
                
                {/* Save Button - update user in user DB */}
                {/* onClick calls handleEditUser function */}
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
                    SAVE
                </Button>
            </form>
        </div>
    );
}

export default EditStaff
// src/components/Login/ForgotPassword.js
// Component to handle password reset functionality for patrons who have forgotten their password
// It allows users to request a password reset email by entering their registered email address
// reference: https://www.youtube.com/watch?v=S4p--t9Npfo

import * as React from 'react';
import { useRef } from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    InputLabel,
    OutlinedInput,
    Box,
    IconButton,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import emailjs from '@emailjs/browser';


const ForgotPassword = () => {
    const [email, setEmail] = React.useState('');
    const form = useRef();
    const navigate = useNavigate();
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        }
    });

    const handleSendEmail = (event) => {
        event.preventDefault(); //Prevent reloading of the page
        client.get('/Patrons?where=(Email,eq,' + email + ')')
            .then((response) => {
                if (response.data.list[0]) {
                    emailjs.sendForm("service_o3buefc", "template_l08ccbj", form.current, "1_OyuNa_f6jkZ3Ry-")
                        .then(() => {
                            alert("Reset password email reset successfully")
                        })
                        .catch((error)=> {
                            alert("Failed to send email. Please try again");
                        })
                } else {
                    alert('Email not found. Please check your email and try again');
                }
            })
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

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
                <IconButton disableRipple onClick={() => navigate("/login")}
                    sx={{
                        color: "Black",
                        "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                        borderColor: "#282120",
                        padding: '0',
                        marginLeft: '-15px'
                    }}><ArrowBackIcon /></IconButton>
                <h2 style={{ textAlign: 'center', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>FORGOT PASSWORD?</h2>
                <p style={{ textAlign: 'center', marginTop: '8px', marginBottom: '0px', fontSize: '16px' }}>Please enter your email address. <br /> We'll send you a link to reset your password.
                </p>
                <p style={{ textAlign: 'center', marginTop: '8px', marginBottom: '30px', fontSize: '12px' }}>
                    <i>(Password reset is available for <strong>customers only</strong>)</i></p>
                <form ref={form} method="post" onSubmit={handleSendEmail}>
                    <FormGroup sx={{ my: 2 }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <InputLabel size="small" htmlFor="email">
                                Email
                            </InputLabel>
                            <OutlinedInput
                                id="email-field"
                                type="email"
                                name="email"
                                size="small"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                fullWidth
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
                            marginTop: '10px',
                            color: 'white',
                            backgroundColor: '#282120',
                            padding: '8px'
                        }}
                    >
                        Send Email
                    </Button>
                </form>

            </Box>
        </Box>
    );
}


export default ForgotPassword
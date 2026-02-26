// src/components/Login/ResetPassword.js
// Component to handle password reset functionality for patrons who have forgotten their password
// It allows users to set a new password after accessing this page via a link sent to their email (including their email as a query parameter)

import * as React from 'react';
import { useRef } from 'react';
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
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { tryResetPassword } from '../../helpers/userHelpers';


const ResetPassword = () => {
    const [password, setPassword] = React.useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email");
    console.log(email);
    const [confirmpassword, setConfirmPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const navigate = useNavigate();
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        },
        withCredentials: true
    });
    const auth = useAuth();



    React.useEffect(() => {
        const adminCredentialFlow = async () => {
            //Normally this shouldn't be here, 
            //but it's required to use withCredential: true for Patch request (update password)
            try {
                await auth.login("adminAccount", "adminPW");
                await auth.logout();
            } catch (error) {
                console.log("Error message:" + error.message)
            }
        };

        const openResetPage = async () => {

            //wait for login/logout to complete
            await adminCredentialFlow();
            navigate('/resetpassword?email=' + email);
        };

        openResetPage();
    }, []);


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

    const handleSendEmail = (event) => {
        event.preventDefault(); //Prevent reloading of the page

        // Check if passwords match
        if (password !== confirmpassword) {
            setPasswordError(true); // Set error state (passwords do not match)
            return;
        }


        setPasswordError(false); // Clear error state (passwords match)

        client.get('/User?where=(UserName,eq,' + email + ')')
            .then((response) => {
                const userId = response.data.list[0].UserID;

                // reset patron's user password (User table)
                tryResetPassword(userId, email, password, navigate)
            })
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
                <h2 style={{ textAlign: 'center', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>RESET PASSWORD</h2>
                {email ? (
                    <>
                        <p style={{ textAlign: 'center', marginTop: '8px', marginBottom: '30px', fontSize: '16px' }}>Please enter a new password.
                        </p>
                        <form method="post" onSubmit={handleSendEmail}>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <TextField
                                    label="Enter new password"
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
                                <TextField
                                    label="Re-enter new password"
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
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                disableElevation
                                fullWidth
                                sx={{
                                    marginTop: '30px',
                                    color: 'white',
                                    backgroundColor: '#282120',
                                    padding: '8px'
                                }}
                            >
                                RESET PASSWORD
                            </Button>
                        </form>
                    </>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: 'center'
                        }}>
                        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '16px' }}>
                            Email not found. Cannot reset password.
                        </p>
                        <Link sx={{ textAlign: 'center' }} href="/">Back To Homepage</Link>
                    </Box>
                )}


            </Box>
        </Box>
    );
}


export default ResetPassword
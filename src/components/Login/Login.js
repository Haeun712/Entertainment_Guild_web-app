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
import Logo from '../../assets/Entertainment_Guild_Logo.png'

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const Login = () => {
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
                    <h2 style={{textAlign:'center', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center'}}>Log in to <img src={Logo} alt={'logo'} style={{height: '56px', alignItems: 'center'}}/></h2>
                    <p style={{textAlign:'center', marginTop: '8px', marginBottom: '30px', fontSize: '14px'}}>Welcome user, please log in to continue</p>
                <form>
                    <FormGroup sx={{my: 2}}>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <InputLabel size="small" htmlFor="input-with-icon-textfield">
                            Email
                        </InputLabel>
                        <OutlinedInput
                            id="input-with-icon-textfield"
                            type="email"
                            name="email"
                            size="small"
                            label="Email"
                            required
                            fullWidth
                        />
                    </FormControl>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <InputLabel size="small" htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
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
                        />
                    </FormControl>
                    </FormGroup>
                    {/* Forgot password linking not working */}
                    <Link href="/" variant="body2"
                        sx={{
                            display: 'block',
                        }}>
                        Forgot password?
                    </Link>
                    {/* Log in not working */}
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
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
import Logo from '../../assets/Entertainment_Guild_Logo.png'


const Register = () => {
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
                    width: '60%',
                    minWidth: '300px',
                    padding: '10px 30px 50px 30px',
                    maxWidth: '400px',
                    border: '1px solid #282120',
                    borderRadius: '10px'
                }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>Sign up for <img src={Logo} alt={'logo'} style={{ height: '56px', alignItems: 'center' }} /></h2>
                <p style={{ textAlign: 'center', marginTop: '8px', marginBottom: '30px', fontSize: '14px' }}>Welcome user, please log in to continue</p>
                <form>
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
                            />
                        </FormControl>
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
                            />
                        </FormControl>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="confirm_password">Confirm Password</label>
                            <TextField
                                label="Re-enter your password"
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                name="confirm_password"
                                id="confirm_password"
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
                            />
                        </FormControl>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="firstname">First Name</label>
                            <TextField
                                label="Enter your first name"
                                variant="outlined"
                                name="firstname"
                                id="firstname"
                                fullWidth
                                size='small'
                            />
                        </FormControl>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="surname">Surame</label>
                            <TextField
                                label="Enter your surname"
                                variant="outlined"
                                name="surname"
                                id="surname"
                                fullWidth
                                size='small'
                            />
                        </FormControl>
                        <FormControlLabel control={<Checkbox 
                        sx={{   
                                size: 'small',
                                color: '#282120',
                                "&.Mui-checked": {
                                    color: '#282120'
                                }
                            }}/>} 
                            slotProps={{
                                typography: {fontSize: '12px'}
                            }}
                            label="I have read and agree to the Terms & Conditions" />
                    </FormGroup>
                    
                    {/* not working */}
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
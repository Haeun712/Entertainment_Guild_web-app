import {useState} from "react";
import { Box, Button, FormControl, 
    FormGroup, TextField, FormLabel, 
    Select, MenuItem, InputLabel
 } from "@mui/material";

const Order = () => {
    const [state, setState] = useState('NSW');
    const handleChange = (event) => {
    setState(event.target.value);
  };
    return (
        <Box margin={10}>
            <h1>ORDER</h1>
            <form>
                <FormGroup sx={{my: 2, width: '100%', minWidth: '400px', maxWidth: '700px'}}>
                    <FormLabel
                        sx={{
                            fontSize: '20px'
                        }}>Customer Details</FormLabel>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="firstname">First Name</label>
                            <TextField
                                label="Enter your first name"
                                variant="outlined"
                                name="firstname"
                                id="firstname"
                                size='small'
                            />
                        </FormControl>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="surname">Surname</label>
                            <TextField
                                label="Enter your surname"
                                variant="outlined"
                                name="surname"
                                id="surname"
                                size='small'
                            />
                        </FormControl>
                    </div>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} for="phonenumber">Phone number</label>
                        <TextField
                            label="Enter your phone number"
                            variant="outlined"
                            name="phonenumber"
                            id="phonenumber"
                            size='small'
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup sx={{ marginTop: '60px',width: '100%', minWidth: '400px', maxWidth: '700px'}}>
                    <FormLabel
                        sx={{
                            fontSize: '20px'
                        }}>Shipping Address</FormLabel>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} for="address">Address</label>
                        <TextField
                            label="Enter your address"
                            variant="outlined"
                            name="address"
                            id="address"
                            size='small'
                        />
                    </FormControl>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} for="suburb">Suburb/City</label>
                        <TextField
                            label="Enter your suburb or city"
                            variant="outlined"
                            name="suburb"
                            id="suburb"
                            size='small'
                        />
                    </FormControl>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="state">State</label>
                            
                            <Select
                                id="state"
                                name="suburb"
                                value={state}
                                onChange={handleChange}
                                size="small"
                            >
                                <MenuItem value='NSW'>NSW</MenuItem>
                                <MenuItem value='VIC'>VIC</MenuItem>
                                <MenuItem value='QLD'>QLD</MenuItem>
                                <MenuItem value='ACT'>ACT</MenuItem>
                                <MenuItem value='NT'>NT</MenuItem>
                                <MenuItem value='SA'>SA</MenuItem>
                                <MenuItem value='WA'>WA</MenuItem>
                                <MenuItem value='TAS'>TAS</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="postcode">Postcode</label>
                            <TextField
                                label="Enter your postcode"
                                variant="outlined"
                                name="postcode"
                                id="postcode"
                                size='small'
                            />
                        </FormControl>
                    </div>
                </FormGroup>
                <FormGroup sx={{marginTop: '60px',width: '100%', minWidth: '400px', maxWidth: '700px'}}>
                    <FormLabel
                        sx={{
                            fontSize: '20px'
                        }}>Card Details</FormLabel>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} for="cardnumber">Card Number</label>
                        <TextField
                            label="Enter your card number"
                            variant="outlined"
                            name="cardnumber"
                            id="cardnumber"
                            size='small'
                        />
                    </FormControl>
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} for="cardowner">Name on Card</label>
                        <TextField
                            label="Enter card owner"
                            variant="outlined"
                            name="cardowner"
                            id="cardowner"
                            size='small'
                        />
                    </FormControl>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="expiry">Expiry Date</label>
                            <TextField
                                label="Enter expiry date (MM/YY)"
                                variant="outlined"
                                name="expiry"
                                id="expiry"
                                size='small'
                            />
                        </FormControl>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} for="d">CVV</label>
                            <TextField
                                label="Enter CVV (000)"
                                variant="outlined"
                                name="cvv"
                                id="cvv"
                                size='small'
                            />
                        </FormControl>
                    </div>
                    </FormGroup>

            </form>
            <div style={{
                display: 'flex', gap: '60px', marginTop: '60px'
            }}>
                <h4>Total:</h4>
                <h3>$ 0</h3>
            </div>

            {/* not working */}
            <Button variant="contained"
                href="/"
                sx={{
                    marginTop: '20px',
                    backgroundColor: '#282120',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    minWidth: '400px',
                    width: '100%',
                    maxWidth: '700px',
                    height: '50px',
                    padding: '10px'
                }}>
                PLACE ORDER
            </Button>
        </Box>
    );
}

export default Order
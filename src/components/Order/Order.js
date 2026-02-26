// src/components/Order/Order.js
// Component to handle the order placement process including customer details, shipping address, card details, and order summary
// It retrieves user information if logged in and pre-fills the form accordingly
// When the order is placed, it creates a new data in the To and Order databases, but POST request to ProductsInOrders database fails.

import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ItemImg from '../../assets/itemImg.svg';
import {
    Box, Button, FormControl,
    FormGroup, TextField, FormLabel,
    Select, MenuItem, Tooltip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { tryAddNewOrder } from "../../helpers/orderHelpers";
import { useAuth } from '../../AuthProvider';
import axios from "axios";

const Order = () => {
    const [itemsInCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [streetAddress, setStreetAddress] = useState('');
    const [streetAddressError, setStreetAddressError] = useState(false);
    const [suburb, setSuburb] = useState('');
    const [state, setState] = useState('NSW');
    const [postcode, setPostcode] = useState('');
    const [postcodeError, setPostcodeError] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberError, setCardNumberError] = useState(false);
    const [cardOwner, setCardOwner] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCVV] = useState('');
    const [cvvError, setCVVError] = useState(false);
    const auth = useAuth();
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        }
    });

    useEffect(() => {

        if (auth.user) {
            setEmail(auth.user.userData.email);

            // Find Patron Id using email from Patron DB
            client.get('Patrons?where=(Email,eq,' + auth.user.userData.email + ')')
            .then((response) => {
                const patronId = response.data.list[0].UserID;

                 client.get('/TO?where=(PatronId,eq,' + patronId + ')')
                .then((response) => {
                    console.log(response.data.list)
                    if (response.data.list && response.data.list.length > 0) {
                        const recentCustomerData = response.data.list.at(-1);
                        
                        if(!phoneNumber)
                        {
                            setPhoneNumber(recentCustomerData.PhoneNumber ? recentCustomerData.PhoneNumber : '')
                        }

                        if(!streetAddress)
                        {
                            setStreetAddress(recentCustomerData.StreetAddress ? recentCustomerData.StreetAddress : '')
                        }

                        if(!postcode)
                        {
                            setPostcode(recentCustomerData.PostCode ? recentCustomerData.PostCode.toString() : '')
                        }

                        if(!suburb)
                        {
                            setSuburb(recentCustomerData.Suburb ? recentCustomerData.Suburb : '')
                        }

                        if(!state)
                        {
                            setState(recentCustomerData.State ? recentCustomerData.State : ''  )
                        }
                    }
                })
            })

           
        }


        let sum = 0;
        for (let i = 0; i < itemsInCart.length; i++) {
            sum += itemsInCart[i].Item.Price * itemsInCart[i].Quantity;

        }

        setTotal(parseFloat(sum.toFixed(2)));

    }, [])

    //Customer Detail
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePhoneNumberChange = (event) => {
        //https://stackoverflow.com/questions/995183/how-to-allow-only-numeric-0-9-in-html-inputbox-using-jquery/5348481
        const value = event.target.value.replace(/[^0-9]/g, '');
        setPhoneNumber(value);
    };


    //Address
    const handleStreetAddressChange = (event) => {
        setStreetAddress(event.target.value);
    };

    const handleSuburbChange = (event) => {
        setSuburb(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handlePostcodeChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setPostcode(value);
    };

    //Card Detail
    const handleCardNumberChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setCardNumber(value);
    };

    const handleCardOwnerChange = (event) => {
        setCardOwner(event.target.value);
    };

    const handleExpiryChange = (event) => {
        setExpiry(event.target.value);
    }
    const currentDate = new Date();
    //https://stackoverflow.com/questions/2878184/get-month-in-mm-format-in-javascript
    const month = `0${currentDate.getMonth() + 1}`.slice(-2);
    const year = currentDate.getFullYear();
    const minMonth = year + '-' + month;

    const handleCVVChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setCVV(value);
    };

    function handlePlaceOrder(event) {
        event.preventDefault(); //Prevent reloading of the page

        let localPhoneNumberError = false;
        let localPostcodeError = false;
        let localCardNumberError = false;
        let localCVVError = false;
        let localStreetAddressError = false;


        // Check if phone number contains 10 digits
        if (phoneNumber.length !== 10) {
            localPhoneNumberError = true; //(not 10 digits)
        }


        //Check if street address contains both letters and numbers
        //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a/51816930
        const res = new RegExp("^(?=.*\\d)(?=.*[A-Za-z])");
        if (!res.test(streetAddress)) {
            localStreetAddressError = true; //(not contain both letters and numbers)
        }


        // Check if postcode contains only 4 digits
        if (postcode.length !== 4) {
            localPostcodeError = true; //(not 4 digits)
        }



        // Check if card number contains 16 digits
        if (cardNumber.length !== 16) {
            localCardNumberError = true; //(not 16 digits)
        }



        // Check if CVV contains only 3 digits
        if (cvv.length !== 3) {
            localCVVError = true; // (not 3 digits)
        }

        // Set error state 
        setPhoneNumberError(localPhoneNumberError);
        setPostcodeError(localPostcodeError);
        setCardNumberError(localCardNumberError);
        setCVVError(localCVVError);
        setStreetAddressError(localStreetAddressError);


        if (localCardNumberError || localCVVError) {
            alert('Your payment has been declined. Please check your card details and try again.');

        }

        if (!localPhoneNumberError && !localPostcodeError && !localCardNumberError && !localCVVError &&!localStreetAddressError) {
            alert('Your payment has been approved');

            const customer = {
                Email: email,
                PhoneNumber: phoneNumber
            }

            const address = {
                StreetAddress: streetAddress,
                Suburb: suburb,
                State: state,
                Postcode: postcode
            }

            const card = {
                CardNumber: cardNumber,
                CardOwner: cardOwner,
                Expiry: expiry,
                CVV: cvv
            }

            tryAddNewOrder(customer, address, card, itemsInCart, navigate)
        }

    }


    return (
        <Box margin='40px 80px'>
            <Button disableRipple onClick={() => navigate("/cart")} startIcon={<ArrowBackIcon />}
                sx={{
                    color: "Black",
                    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    borderColor: "#282120"
                }}>
                Back To Cart</Button>
            <h1 style={{ marginTop: '0' }}>ORDER</h1>

            <form method="POST" onSubmit={handlePlaceOrder}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '30px', maxWidth: '1000px' }}>
                    <Box style={{ flex: 1.2 }}>
                        <FormGroup sx={{ my: 2, width: '100%', minWidth: '400px', maxWidth: '600px' }}>
                            <FormLabel
                                sx={{
                                    fontSize: '20px'
                                }}>Customer Details</FormLabel>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <label style={{ marginBottom: '10px', fontSize: '18px' }} for="email">Email</label>
                                <TextField
                                    label="john.smith@email.com"
                                    variant="outlined"
                                    name="email"
                                    id="email"
                                    size='small'
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </FormControl>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <label style={{ marginBottom: '10px', fontSize: '18px' }} for="phonenumber">Phone number</label>
                                <TextField
                                    label="0400 123 456"
                                    variant="outlined"
                                    type="tel"
                                    name="phonenumber"
                                    id="phonenumber"
                                    size='small'
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    error={phoneNumberError}
                                    helperText={phoneNumberError ? "Phone Number must be 10 digits" : ""}
                                    required
                                    inputProps={{
                                        maxLength: 10,
                                    }}
                                />
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{ marginTop: '60px', width: '100%', minWidth: '400px', maxWidth: '600px' }}>
                            <FormLabel
                                sx={{
                                    fontSize: '20px'
                                }}>Shipping Address</FormLabel>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <label style={{ marginBottom: '10px', fontSize: '18px' }} for="streetaddress">Street Address</label>
                                <TextField
                                    label="123 Ring Road"
                                    variant="outlined"
                                    name="streetaddress"
                                    id="streetaddress"
                                    size='small'
                                    required
                                    value={streetAddress}
                                    onChange={handleStreetAddressChange}
                                    error={streetAddressError}
                                    helperText={streetAddressError ? "Street Address should contain both letters and numbers" : ""}
                                />
                            </FormControl>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <label style={{ marginBottom: '10px', fontSize: '18px' }} for="suburb">Suburb/City</label>
                                <TextField
                                    label="Newcastle"
                                    variant="outlined"
                                    name="suburb"
                                    id="suburb"
                                    size='small'
                                    value={suburb}
                                    onChange={handleSuburbChange}
                                    required
                                />
                            </FormControl>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                    <label style={{ marginBottom: '10px', fontSize: '18px' }} for="state">State</label>

                                    <Select
                                        id="state"
                                        name="state"
                                        value={state}
                                        onChange={handleStateChange}
                                        size="small"
                                        required
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
                                        label="0000"
                                        variant="outlined"
                                        name="postcode"
                                        id="postcode"
                                        size='small'
                                        required
                                        value={postcode}
                                        onChange={handlePostcodeChange}
                                        error={postcodeError}
                                        helperText={postcodeError ? "Postcode must be 4 digits" : ""}
                                        inputProps={{
                                            maxLength: 4,
                                        }}
                                    />
                                </FormControl>
                            </div>
                        </FormGroup>
                        <FormGroup sx={{ marginTop: '60px', width: '100%', minWidth: '400px', maxWidth: '600px' }}>
                            <FormLabel
                                sx={{
                                    fontSize: '20px'
                                }}>Card Details</FormLabel>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <label style={{ marginBottom: '10px', fontSize: '18px' }} for="cardnumber">Card Number</label>
                                <TextField
                                    label="0000 0000 0000 0000"
                                    variant="outlined"
                                    name="cardnumber"
                                    id="cardnumber"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    size='small'
                                    required
                                    inputProps={{
                                        maxLength: 16,
                                    }}
                                    error={cardNumberError}
                                    helperText={cardNumberError ? "Card Number must be 16 digits" : ""}
                                />
                            </FormControl>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <label style={{ marginBottom: '10px', fontSize: '18px' }} for="cardowner">Name on Card</label>
                                <TextField
                                    label="John Smith"
                                    variant="outlined"
                                    name="cardowner"
                                    id="cardowner"
                                    value={cardOwner}
                                    onChange={handleCardOwnerChange}
                                    size='small'
                                    required
                                />
                            </FormControl>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                    <label style={{ marginBottom: '10px', fontSize: '18px' }} for="expiry">Expiry Date</label>
                                    <TextField
                                        //https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/month
                                        variant="outlined"
                                        name="expiry"
                                        id="expiry"
                                        size='small'
                                        type='month'
                                        onChange={handleExpiryChange}
                                        value={expiry}
                                        required
                                        inputProps={{
                                            min: minMonth
                                        }}
                                    />
                                </FormControl>
                                <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                    <label style={{ marginBottom: '10px', fontSize: '18px' }} for="d">CVV</label>
                                    <TextField
                                        label="000"
                                        variant="outlined"
                                        name="cvv"
                                        id="cvv"
                                        size='small'
                                        required
                                        value={cvv}
                                        onChange={handleCVVChange}
                                        error={cvvError}
                                        helperText={cvvError ? "CVV must be 3 digits" : ""}
                                        inputProps={{
                                            maxLength: 3,
                                        }}
                                    />
                                </FormControl>
                            </div>
                        </FormGroup>
                    </Box>
                    <Box sx={{ flex: 1, marginTop: { sx: '15px' } }}>
                        <p style={{
                            fontSize: '20px', margin: '15px 0',
                            color: 'rgba(0, 0, 0, 0.6)', fontWeight: '400',
                            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                            lineHeight: '1.4375em', letterSpacing: '0.00938em'
                        }}>Products In Order</p>
                        {itemsInCart.length > 0 && (
                            itemsInCart.map((item) => (
                                <Box
                                    key={item.Item.ItemId}
                                    sx={{
                                        border: '1px solid #28212050',
                                        height: '100px',
                                        padding: '10px',
                                        display: 'flex', gap: '10px',
                                        alignItems: 'start',
                                        marginBottom: '20px',
                                        maxWidth: '580px'
                                    }}>
                                    <Box
                                        component="img"
                                        src={ItemImg}
                                        alt="item image"
                                        sx={{
                                            height: '100%',
                                            display: { md: 'none', xs: 'inline-block' }
                                        }} />
                                    <div style={{ flex: 1, height: '100%', position: 'relative' }}>
                                        <div>
                                            <h4 style={{ margin: '0', fontWeight: 'bold' }}>{item.Item.Product.Name}</h4>
                                            <p style={{ margin: '3px 0' }}>{item.Item.Source.SourceName}</p>
                                            <p style={{ margin: '3px 0' }}>Quantity: {item.Quantity}</p>
                                        </div>
                                        <p style={{ position: 'absolute', bottom: 0, right: 0, margin: 0, fontSize: '20px' }}>$ {(item.Item.Price * item.Quantity).toFixed(2)}</p>
                                    </div>
                                </Box>
                            ))

                        )}
                        <div style={{
                            display: 'flex', gap: '60px', marginTop: '40px'
                        }}>
                            <h2>Total:</h2>
                            <h2>$ {total}</h2>
                        </div>

                        {/* Place order - create new order in Order DB */}
                        <Button variant="contained"
                            disabled={itemsInCart.length === 0}
                            type="submit"
                            sx={{
                                marginTop: '20px',
                                backgroundColor: '#282120',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: '100%',
                                maxWidth: '600px',
                                height: '50px',
                                padding: '10px'
                            }}>
                            PLACE ORDER
                        </Button>
                    </Box>


                </Box>
            </form>

        </Box >
    );
}

export default Order
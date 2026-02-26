// src/components/Patrons/Profile.js
// Component to display and edit the profile of a patron (after login as patron)
// phone number and address from the most recent order (TO) record

import { display, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import axios from "axios";
import {
    useSearchParams, useNavigate, Link
} from 'react-router-dom';
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ItemImg from '../../assets/itemImg.svg';
import {
    Box, Button, FormControl,
    FormGroup, TextField, FormLabel,
    Select, MenuItem, Tooltip
} from "@mui/material";
import { useAuth } from "../../AuthProvider";
import { tryUpdatePatronInfo } from "../../helpers/patronHelpers";

const Profile = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [streetAddress, setStreetAddress] = useState('');
    const [streetAddressError, setStreetAddressError] = useState(false);
    const [postcode, setPostcode] = useState('');
    const [postcodeError, setPostcodeError] = useState(false);
    const [suburb, setSuburb] = useState('');
    const [state, setState] = useState('');
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        },
        withCredentials: true
    });
    const auth = useAuth();
    const [phoneNumberDisabled, setPhoneNumberDisabled] = useState(true);
    const [streetAddressDisabled, setStreetAddressDisabled] = useState(true);
    const [suburbDisabled, setSuburbDisabled] = useState(true);
    const [stateDisabled, setStateDisabled] = useState(true);
    const [postcodeDisabled, setPostcodeDisabled] = useState(true);
    const [patronId, setPatronId] = useState([]);




    useEffect(() => {


        const userEmail = auth.user.userData.email;

        client.get('/Patrons?where=(Email,eq,' + userEmail + ')')
            .then((response) => {
                setEmail(userEmail);
                //https://stackoverflow.com/questions/74797782/javascript-split-slice-join-string
                const fullName = response.data.list[0].Name;
                //split full name into first name and surname
                setFirstName(fullName.split('').slice(0, 1).join(" "));
                setSurname(fullName.split('').slice(1).join(" "))


                // find Recent Patron Information from To DB using Patron Id
                setPatronId(response.data.list[0].UserID);
                client.get('/TO?where=(PatronId,eq,' + response.data.list[0].UserID + ')')
                    .then((response) => {
                        if (response.data.list && response.data.list.length > 0) {
                            const recentCustomerData = response.data.list.at(-1);

                            if (!phoneNumber) {
                                setPhoneNumber(recentCustomerData.PhoneNumber ? recentCustomerData.PhoneNumber : '')
                            }

                            if (!streetAddress) {
                                setStreetAddress(recentCustomerData.StreetAddress ? recentCustomerData.StreetAddress : '')
                            }

                            if (!postcode) {
                                setPostcode(recentCustomerData.PostCode ? recentCustomerData.PostCode.toString() : '')
                            }

                            if (!suburb) {
                                setSuburb(recentCustomerData.Suburb ? recentCustomerData.Suburb : '')
                            }

                            if (!state) {
                                setState(recentCustomerData.State ? recentCustomerData.State : '')
                            }
                        }
                    })
            })
    }, []);

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

    function handleUpdateProfile(event) {
        event.preventDefault(); //Prevent reloading of the page

        let localPhoneNumberError = false;
        let localPostcodeError = false;
        let localStreetAddressError = false;


        // Check if phone number contains 10 digits
        if (phoneNumber && phoneNumber.length !== 10) {
            localPhoneNumberError = true; //(not 10 digits)
        }

        //Check if street address contains both letters and numbers
        //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a/51816930
        const res = new RegExp("^(?=.*\\d)(?=.*[A-Za-z])");
        if (!res.test(streetAddress)) {
            localStreetAddressError = true; //(not contain both letters and numbers)
        }

        // Check if postcode contains only 4 digits
        if (postcode && postcode.length !== 4) {
            localPostcodeError = true; //(not 4 digits)
        }

        // Set error state 
        setPhoneNumberError(localPhoneNumberError);
        setPostcodeError(localPostcodeError);
        setStreetAddressError(localStreetAddressError);


        if (!localPhoneNumberError && !localPostcodeError && !localStreetAddressError) {

            tryUpdatePatronInfo(patronId, email, phoneNumber, streetAddress, postcode, suburb, state);
        }

    }

    return (
        <div style={{
            padding: '40px',
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '40px'
        }}>

            <div style={{
                borderRight: '1px solid #282120',
                height: '200px',
                width: '20%',
                maxWidth: '200px',
                paddingRight: '40px',
                paddingTop: '30px'
            }}>
                <Typography
                    component={Link}
                    to={"/myprofile"} // go to products page
                    sx={{
                        color: "black",
                        alignItems: "center",
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        textDecoration: 'underline'
                    }}
                >
                    MY PROFILE
                </Typography>
                <div style={{ marginTop: '20px' }}></div>
                <Typography
                    component={Link}
                    to={"/myorders"} // go to books page
                    sx={{
                        color: "black",
                        textDecoration: "none",
                        alignItems: "center",
                        cursor: 'pointer',
                        "&:hover": {
                            textDecoration: "underline",
                        }, // hover
                    }}
                >
                    MY ORDERS
                </Typography>
            </div>

            <Stack direction="row" spacing={2} >
                <Box margin={10} width={'60vw'} maxWidth={600} >
                    <h2>MY PROFILE</h2>
                    <p style={{ display: 'block', borderBottom: '1px solid #2821204D', padding: '24px 0', margin: '0' }}
                    >Email: {email}
                    </p>
                    <form method="Post" onSubmit={handleUpdateProfile}>

                        <FormControl fullWidth variant="outlined">
                            <div style={{ display: 'flex', borderBottom: '1px solid #2821204D', padding: '16px 0' }}>
                                <label style={{ marginTop: '8px', marginRight: '5px' }} for="phonenumber">Phone number:</label>
                                <TextField
                                    type="tel"
                                    name="phonenumber"
                                    id="phonenumber"
                                    size='small'
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    error={phoneNumberError}
                                    helperText={phoneNumberError ? "Phone Number must be 10 digits" : ""}
                                    inputProps={{
                                        maxLength: 10,
                                    }}
                                    sx={{
                                        '& .Mui-disabled': {
                                            '& .MuiInputBase-input': {
                                                backgroundColor: '#28212010',
                                                color: 'black',
                                                WebkitTextFillColor: '#505050'
                                            }
                                        }
                                    }}
                                    disabled={phoneNumberDisabled}
                                />
                                <Button
                                    onClick={() => {
                                        if (phoneNumberDisabled === true) {
                                            setPhoneNumberDisabled(false)
                                        } else {
                                            setPhoneNumberDisabled(true)
                                        }
                                    }}
                                    sx={{
                                        border: 'solid 1px #282120',
                                        backgroundColor: 'white',
                                        color: '#282120',
                                        padding: '5px',
                                        height: '30px',
                                        minWidth: '30px',
                                        marginLeft: '10px',
                                        marginTop: '5px'
                                    }}><ModeEditIcon sx={{ width: '20px' }} /></Button>
                            </div>
                        </FormControl>
                        <FormControl fullWidth variant="outlined">
                            <div style={{ display: 'flex', borderBottom: '1px solid #2821204D', padding: '16px 0' }}>

                                <label style={{ marginTop: '8px', marginRight: '7px' }} for="streetaddress">Street Address:</label>
                                <TextField
                                    variant="outlined"
                                    name="streetaddress"
                                    id="streetaddress"
                                    size='small'
                                    value={streetAddress}
                                    onChange={handleStreetAddressChange}
                                    disabled={streetAddressDisabled}
                                    error={streetAddressError}
                                    helperText={streetAddressError ? "Street Address should contain both letters and numbers" : ""}
                                    sx={{
                                        '& .Mui-disabled': {
                                            '& .MuiInputBase-input': {
                                                backgroundColor: '#28212010',
                                                color: 'black',
                                                WebkitTextFillColor: '#505050'
                                            }
                                        }
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        if (streetAddressDisabled === true) {
                                            setStreetAddressDisabled(false)
                                        } else {
                                            setStreetAddressDisabled(true)
                                        }
                                    }}
                                    sx={{
                                        border: 'solid 1px #282120',
                                        backgroundColor: 'white',
                                        color: '#282120',
                                        padding: '5px',
                                        height: '30px',
                                        minWidth: '30px',
                                        marginLeft: '10px',
                                        marginTop: '5px'
                                    }}><ModeEditIcon sx={{ width: '20px' }} /></Button>
                            </div>
                        </FormControl>
                        <FormControl fullWidth variant="outlined">
                            <div style={{ display: 'flex', borderBottom: '1px solid #2821204D', padding: '16px 0' }}>

                                <label style={{ marginTop: '8px', marginRight: '24px' }} for="suburb">Suburb/City:</label>
                                <TextField
                                    variant="outlined"
                                    name="suburb"
                                    id="suburb"
                                    size='small'
                                    value={suburb}
                                    onChange={handleSuburbChange}
                                    disabled={suburbDisabled}
                                    sx={{
                                        '& .Mui-disabled': {
                                            '& .MuiInputBase-input': {
                                                backgroundColor: '#28212010',
                                                color: 'black',
                                                WebkitTextFillColor: '#505050'
                                            }
                                        }
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        if (suburbDisabled === true) {
                                            setSuburbDisabled(false)
                                        } else {
                                            setSuburbDisabled(true)
                                        }
                                    }}
                                    sx={{
                                        border: 'solid 1px #282120',
                                        backgroundColor: 'white',
                                        color: '#282120',
                                        padding: '5px',
                                        height: '30px',
                                        minWidth: '30px',
                                        marginLeft: '10px',
                                        marginTop: '5px'
                                    }}><ModeEditIcon sx={{ width: '20px' }} /></Button>
                            </div>
                        </FormControl>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <div style={{ display: 'flex', borderBottom: '1px solid #2821204D', padding: '16px 0' }}>

                                    <label style={{ marginTop: '8px', marginRight: '7px' }} for="state">State:</label>

                                    <Select
                                        id="state"
                                        name="state"
                                        value={state}
                                        onChange={handleStateChange}
                                        size="small"
                                        disabled={stateDisabled}
                                        sx={{
                                            width: '120px',
                                        }}
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
                                    <Button
                                        onClick={() => {
                                            if (stateDisabled === true) {
                                                setStateDisabled(false)
                                            } else {
                                                setStateDisabled(true)
                                            }
                                        }}
                                        sx={{
                                            border: 'solid 1px #282120',
                                            backgroundColor: 'white',
                                            color: '#282120',
                                            padding: '5px',
                                            height: '30px',
                                            minWidth: '30px',
                                            marginLeft: '10px',
                                            marginTop: '5px'
                                        }}><ModeEditIcon sx={{ width: '20px' }} /></Button>
                                </div>
                            </FormControl>
                            <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                                <div style={{ display: 'flex', borderBottom: '1px solid #2821204D', padding: '16px 0' }}>

                                    <label style={{ marginTop: '8px', marginRight: '7px' }} for="postcode">Postcode:</label>
                                    <TextField
                                        variant="outlined"
                                        name="postcode"
                                        id="postcode"
                                        size='small'
                                        value={postcode}
                                        onChange={handlePostcodeChange}
                                        error={postcodeError}
                                        helperText={postcodeError ? "Must be 4 digits" : ""}
                                        inputProps={{
                                            maxLength: 4,
                                        }}
                                        sx={{
                                            width: '120px',
                                            '& .Mui-disabled': {
                                                '& .MuiInputBase-input': {
                                                    backgroundColor: '#28212010',
                                                    color: 'black',
                                                    WebkitTextFillColor: '#505050'
                                                }
                                            }
                                        }}
                                        disabled={postcodeDisabled}
                                    />
                                    <Button
                                        onClick={() => {
                                            if (postcodeDisabled === true) {
                                                setPostcodeDisabled(false)
                                            } else {
                                                setPostcodeDisabled(true)
                                            }
                                        }}
                                        sx={{
                                            border: 'solid 1px #282120',
                                            backgroundColor: 'white',
                                            color: '#282120',
                                            padding: '5px',
                                            height: '30px',
                                            minWidth: '30px',
                                            marginLeft: '10px',
                                            marginTop: '5px'
                                        }}><ModeEditIcon sx={{ width: '20px' }} /></Button>
                                </div>
                            </FormControl>
                        </div>
                        <Button variant="contained"
                            type='submit'
                            sx={{
                                marginTop: '40px',
                                backgroundColor: '#282120',
                                color: 'white',
                                height: '40px',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                padding: '10px'
                            }}>
                            Save Changes
                        </Button>
                    </form>
                </Box>
            </Stack>
        </div>
    );
}

export default Profile
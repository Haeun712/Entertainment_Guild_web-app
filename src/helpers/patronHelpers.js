// src/helpers/patronHelpers.js
// Helper functions for adding and updating for patrons in the Patron database
// and reseting patron passwords (updating password in the User database)

import axios from 'axios'

//API endpoints
const API_PREFIX_SHORT = "http://localhost:3001";
const API_PREFIX_LONG = API_PREFIX_SHORT + "/api/inft3050"

//SHA256 password hashing
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
// Generate a random salt: a 32-character hex string
const generateSalt = () => {
    const salt = window.crypto.randomUUID().replaceAll("-", "");
    //console.log("Salt: ", salt);
    return salt;
}

//Add new Patron to Patron DB (server)  
const tryAddNewPatron = (email, name, salt, hashPW, navigate) => {
    const headers = {
        'Accept': 'application/json',
    };
    let newCredentials = {
        Email: email,
        Name: name,
        Salt: salt,
        HashPW: hashPW
    }

    // Post new user to server
    axios.post(API_PREFIX_LONG + "/Patrons", newCredentials,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            navigate('/login');
            alert("Your account created successfully!");
        }).catch(error => {

            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while creating your account.");
            }
        })
}

//update Patron Information (address, phonenumber)in To DB (server)
const tryUpdatePatronInfo = (patronId, email, phonenumber, streetAddress, postcode, suburb, state) => {
    const headers = {
        'Accept': 'application/json',
    };

    //craete new To to update Patron Information
    let newTo = {
        PatronId: parseInt(patronId, 10),
        Email: email,
        PhoneNumber: phonenumber,
        StreetAddress: streetAddress,
        PostCode: parseInt(postcode, 10),
        Suburb: suburb,
        State: state,
    }
    // Post new TO in TO DB to update the patron information
    axios.post(API_PREFIX_LONG + "/TO/", newTo,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            alert("Your profile updated successfully!");
        }).catch(error => {
            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while updating the profile.");
            }
        })
}

const tryResestPasswordPatron = (email, salt, hashPW, navigate) => {
    const headers = {
        'Accept': 'application/json',
    };

    axios.get(API_PREFIX_LONG + '/Patrons?where=(Email,eq,' + email + ')',
        { headers: headers})
        .then((response) => {
            const patronId = response.data.list[0].UserID;

            let updatedCredentials = {
                Salt: salt,
                HashPW: hashPW
            }

            // Update user with new password
            axios.patch(API_PREFIX_LONG + "/Patrons/" + patronId, updatedCredentials,
                { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
                .then(response => {
                    navigate('/login');
                    alert("Your Password has been reset successfully!");
                }).catch(error => {

                    if (error.message) {
                        alert("Error: " + error.message);
                    } else {
                        alert("An error occurred while reseting your password.");
                    }
                })
        })
}

export { tryAddNewPatron, tryUpdatePatronInfo, tryResestPasswordPatron };
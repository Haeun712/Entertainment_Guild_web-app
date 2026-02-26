// src/helpers/userHelpers.js
// Helper functions for adding, deleting, and editing users in the User database (for admin)
// Adding new patrons to the User and Patron databases when a customer signs up, and reseting patron passwords

import axios from 'axios'
import { tryAddNewPatron, tryResestPasswordPatron } from './patronHelpers';

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

//Add new user to User DB (server)  
const tryAddNewUser = (username, email, name, isAdmin, password, isPatron, navigate) => {
    const headers = {
        'Accept': 'application/json',
    };
    let newCredentials = {
        UserName: username,
        Email: email,
        Name: name,
        IsAdmin: isAdmin.toString(),
        Salt: generateSalt(),
        HashPW: ""
    }

    //Create hash of salt and password and POST new user
    sha256(newCredentials.Salt + password)
        .then(hashedPW => {
            newCredentials.HashPW = hashedPW;
            console.log(newCredentials);

            // Post new user to server
            axios.post(API_PREFIX_LONG + "/User", newCredentials,
                { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
                .then(response => {
                    console.log("User created successfully!");
                    if (isPatron) {
                        // if the user is patron, add new patron to Patron DB 
                        tryAddNewPatron(email, name, newCredentials.Salt, newCredentials.HashPW, navigate);
                    } else {
                        navigate('/admin/staffs')
                        alert("User created successfully!")
                    }
                }).catch(error => {

                    if (error.response && error.response.data && error.response.data.msg.includes("Violation of UNIQUE KEY constraint 'UQ_User_UserName'")) {
                        alert("Error: " + "Email already exists. Please choose a different email.");
                    } else {
                        alert("Error: " + error.message);
                    }
                })
        });
}

//delete user from User DB (server)
const tryDeleteUser = (userID, navigate) => {
    const headers = {
        'Accept': 'application/json',
    };
    axios.delete(API_PREFIX_LONG + "/User/" + userID,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            navigate('/admin/staffs');
            alert("User deleted successfully!");
        }).catch(error => {
            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while deleting the user.");
            }
        })
}

//edit user in User DB (server)
const tryEditUser = (userID, username, email, name, isAdmin, navigate) => {
    const headers = {
        'Accept': 'application/json',
    };
    let updatedCredentials = {
        UserName: username,
        Email: email,
        Name: name,
        IsAdmin: isAdmin.toString(),
    }
    // Patch updated user to server
    axios.patch(API_PREFIX_LONG + "/User/" + userID, updatedCredentials,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            navigate('/admin/staffs/' + userID);
            alert("User updated successfully!");
        }).catch(error => {
            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while updating the user.");
            }
        })
}

//reset password for Patron only
const tryResetPassword = (userID, email, password, navigate) => {
    const headers = {
        'Accept': 'application/json',
    };

    let updatedCredentials = {
        Salt: generateSalt(),
        HashPW: ""
    }

    //Create hash of salt and password and update user password
    sha256(updatedCredentials.Salt + password)
        .then(hashedPW => {
            updatedCredentials.HashPW = hashedPW;
            console.log(updatedCredentials);

            // update patron user to server
            axios.patch(API_PREFIX_LONG + "/User/" + userID, updatedCredentials,
                { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
                .then(response => {
                    console.log("Your Password has been reset successfully!");
                    // reset password for patron in Patron table 
                    tryResestPasswordPatron(email, updatedCredentials.Salt, updatedCredentials.HashPW, navigate);

                }).catch(error => {

                    if (error.message) {
                        alert("Error: " + error.message);
                    } else {
                        alert("An error occurred while reseting the password.");
                    }
                })
        });


}

export { tryAddNewUser, tryDeleteUser, tryEditUser, tryResetPassword };
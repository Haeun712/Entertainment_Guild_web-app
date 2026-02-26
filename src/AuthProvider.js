// src/AuthProvider.js 
// Provides authentication context and methods for login and logout
// Set user role (admin, employee, or patron) based on database records

import React, { createContext, useState, useEffect, useContext, use } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

//API endpoints
const API_PREFIX_SHORT = "http://localhost:3001";
const API_PREFIX_LONG = API_PREFIX_SHORT + "/api/inft3050"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initialize user state from sessionStorage if available
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate();

    // Sync user state with sessionStorage
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    const login = (username, password) => {

        return new Promise((resolve, reject) => {

            /* Axios database calls */
            //Login user
            const headers = {
                'Accept': 'application/json',
            };

            //POST credentials to login
            axios.post(API_PREFIX_SHORT + "/login", { username: username, password: password }, {
                headers: headers, withCredentials: true
            }).then((response) => { //Success
                console.log(response);
                const userData = response.data;
                if (response.data.isAdmin === true) {
                    setUser({ userData, role: 'admin' });
                    navigate('/admin');
                    resolve();
                } else {

                    //Check if the user Email exists in the Patron DB
                    if (userData.email) {
                        axios.get(API_PREFIX_LONG + '/Patrons?where=(Email,eq,' + userData.email + ')', {
                            headers: headers
                        }).then((response) => {
                            console.log(response);

                            //If the user is a patron (exist in Patron DB), set role to patron
                            if (response.data.list && response.data.list.length > 0) {
                                setUser({ userData, role: 'patron' });
                                navigate('/');
                                resolve();
                            } else {
                                //If the user is not a patron, set role to employee
                                setUser({ userData, role: 'employee' });
                                navigate('/empl');
                                resolve();
                            }
                        }).catch((error) => {
                            console.log("Failed to fetch Patrons", error);
                            alert("Error: " + error.message);
                            //Failed to fetch Patrons
                            reject(error);
                        });
                    }

                }
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    alert("Invalid username or password");
                } else {
                    alert("Error: " + error.message);
                }
                reject(error);
            });
        });
    };

    const logout = () => {
        return new Promise((resolve, reject) => {
            setUser(null);
            navigate('/');
            resolve();
        })
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);

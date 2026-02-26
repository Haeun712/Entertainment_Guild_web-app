// src/helpers/orderHelpers.js
// Helper functions for adding orders to the To, Orders, and ProductsInOrders databases when a customer places an order
// Post requests to To and Orders work correctly, but ProductsInOrders currently has a POST request error 400

import { Email } from '@mui/icons-material';
import axios from 'axios'

//API endpoints
const API_PREFIX_SHORT = "http://localhost:3001";
const API_PREFIX_LONG = API_PREFIX_SHORT + "/api/inft3050"

//Add new order to Order DB (server)  
const tryAddNewOrder = (customer, address, card, items, navigate) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const [year, month] = card.Expiry.split('-');
    const expiryDate = month + '/' + year.slice(-2);

    const patronEmail = sessionStorage.getItem('user') ?
        JSON.parse(sessionStorage.getItem('user')).userData.email : null;

    axios.get(API_PREFIX_LONG + '/Patrons?where=(Email,eq,' + patronEmail + ')')
        .then(response => {
            const patronList = response.data.list;
            const patronId = patronList && patronList.length > 0 ?
                patronList[0].UserID : null;

            let newTo = {

                PatronId: parseInt(patronId, 10),
                Email: customer.Email,
                PhoneNumber: customer.PhoneNumber,
                StreetAddress: address.StreetAddress,
                PostCode: parseInt(address.Postcode, 10),
                Suburb: address.Suburb,
                State: address.State,
                CardNumber: card.CardNumber,
                CardOwner: card.CardOwner,
                Expiry: expiryDate,
                CVV: parseInt(card.CVV, 10)
            }

            console.log(newTo);
            // Post new TO to server
            axios.post(API_PREFIX_LONG + "/TO", newTo,
                { headers: headers, withCredentials: true })
                .then(response => {
                    const customerId = response.data.CustomerID;

                    let newOrder = {
                        Customer: customerId,
                        StreetAddress: address.StreetAddress,
                        PostCode: address.Postcode,
                        Suburb: address.Suburb,
                        State: address.State
                    }

                    axios.post(API_PREFIX_LONG + "/Orders", newOrder,
                        { headers: headers, withCredentials: true })
                        .then(response => {
                            const orderId = response.data.OrderID;


                            // Not working (POST Request error 400)
                            // Create an array of promises for each item to be added to ProductsInOrders
                            const itemRequests = items.map(item => {
                                const itemInOrder = {
                                    OrderId: parseInt(orderId, 10),
                                    produktId: parseInt(item.Item.ItemId, 10),
                                    Quantity: parseInt(item.Quantity, 10)
                                };
                                
                                //it is correctly displyaying as an 'int' type for each field in the console log.
                                console.log(itemInOrder);
                                return axios.post("http://localhost:3001/api/inft3050/ProductsInOrders", itemInOrder,
                                    { headers: headers, withCredentials: true });
                            });

                            // waiting until all requests are completed
                            return Promise.all(itemRequests);

                        })
                        .catch(error => {
                            alert("Error: " + error.message);
                        })

                }).catch(error => {
                    if (error.message) {
                        alert("Error: " + error.message);
                    } else {
                        alert("An error occurred while placing the order.");
                    }
                })
        })








}

export { tryAddNewOrder };
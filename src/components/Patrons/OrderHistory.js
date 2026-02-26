// src/components/Patrons/OrderHistory.js
// Component to display the order history of a patron (after login as patron)
// including order details and product information
// But due to ProductsInOrders POST error, it does not show any data. except 'Jane Citizen' user with existing data. 
// If you sign up as a new user using "jane.l.j.citizen@somemail.com" and login, you can see the order history.

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import { useAuth } from '../../AuthProvider';
import {
    Box, Typography, Stack
} from "@mui/material";
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const auth = useAuth();
    const [orderList, setOrderList] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        },
        withCredentials: true
    });

    //update Patron Order to include Price information in ProductsInOrders List
    async function updatePatronOrders(patronOrders) {
        const updatedPatronOrders = [];

        if (patronOrders && patronOrders.length > 0) {
            for (const order of patronOrders) {
                for (const item of order["ProductsInOrders List"]) {
                    await client.get('/Stocktake/' + item.ProduktId)
                        .then((response) => {
                            item.Price = response.data.Price;
                            item.ProductName = response.data.Product.Name;
                            //{OrderId, ProduktId, Quantity, Price, ProductName}
                        })
                }
                updatedPatronOrders.push(order);
            }
        }
        return updatedPatronOrders
    }

    useEffect(() => {
        //Get Selected Patron's Data
        const userEmail = auth.user.userData.email;

        client.get('/Patrons?where=(Email,eq,' + userEmail + ')')
            .then((response) => {
                //find Customer Ids related to Patron using PatronId (UserID)
                const UserID = response.data.list[0].UserID;
                client.get('/TO?where=(PatronId,eq,' + UserID + ')&&fields=CustomerID')
                    .then((response) => {
                        const customerIds = response.data.list.map(item => item.CustomerID);

                        client.get('/Orders?nested[ProductsInOrders List][fields]=OrderId,ProduktId,Quantity,Stocktake')
                            .then((response) => {
                                const orders = response.data.list;

                                //filter patron related orders
                                const patronOrders = orders.filter(order =>
                                    customerIds.includes(order.Customer));

                                console.log(patronOrders);
                                setOrderList(patronOrders);

                                //Update Patron Order to include 'Price' attribute
                                updatePatronOrders(patronOrders)
                                    .then((updatedPatronOrders) => {
                                        console.log(updatedPatronOrders);
                                        setOrderList(updatedPatronOrders);
                                    })
                            })
                    })
            })
    }, []);

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
                    to={"/myprofile"} // go to profile page
                    sx={{
                        color: "black",
                        textDecoration: "none",
                        alignItems: "center",
                        cursor: 'pointer',
                        "&:hover": {
                            textDecoration: "underline",
                        }
                    }}
                >
                    MY PROFILE
                </Typography>
                <div style={{ marginTop: '20px' }}></div>
                <Typography
                    component={Link}
                    to={"/myorders"} // go to order history page
                    sx={{
                        color: "black",
                        alignItems: "center",
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        textDecoration: 'underline'
                    }}
                >
                    MY ORDERS
                </Typography>
            </div>

            <Stack direction="row" spacing={2} >
                <Box margin={10} width={'70vw'} maxWidth={800} >
                    <h2>MY ORDERS</h2>

                    <TableContainer sx={{
                        borderRadius: '0',
                        border: '1px solid #282120',
                    }}>
                        <Table sx={{
                            borderCollapse: 'collapse',
                            'th': { fontWeight: 'bold', padding: '8px', backgroundColor: '#2821202D', border: '1px solid #2821206D' },
                            'td': { padding: '8px', border: '1px solid #2821203D' }
                        }} aria-label="productlist-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell sx={{textAlign:'center', width: '50px'}}>Price</TableCell>
                                    <TableCell sx={{textAlign:'center'}}>Qty</TableCell>
                                    <TableCell sx={{textAlign:'center'}}>Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(orderList && orderList.length > 0 ? orderList : []
                                ).map((order) => (
                                    order["ProductsInOrders List"].map((item) => (
                                        <TableRow key={order.OrderID + "-" + item.ProduktId}>
                                            <TableCell>{order.OrderID}</TableCell>
                                            <TableCell>{item.ProductName ? item.ProductName : 'N/A'}</TableCell>
                                            <TableCell>{order.StreetAddress ? order.StreetAddress : ''},
                                                {order.Suburb ? order.Suburb : ''}, {order.State ? order.State : ''},
                                                {order.PostCode ? order.PostCode : ''}
                                            </TableCell>
                                            <TableCell sx={{textAlign:'center'}}>$ {item.Price ? item.Price : 'N/A'}</TableCell>
                                            <TableCell sx={{textAlign:'center'}}>{item.Quantity ? item.Quantity : 'N/A'}</TableCell>
                                            <TableCell sx={{textAlign:'center'}}>$ {(item.Price * item.Quantity).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </Stack>

        </div>
    )
}

export default OrderHistory;
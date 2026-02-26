// src/components/Employees/PatronDetailEmpl.js
// Component to display detailed information about a specific patron for employee users (view only)

import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button, Dialog } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';

const ViewPatron = () => {
    const navigate = useNavigate();

    const UserID = useParams().UserID;
    const [user, setUser] = useState({});
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
                            //{OrderId, ProduktId, Quantity, Price}
                        })
                }
                updatedPatronOrders.push(order);
            }
        }
        return updatedPatronOrders
    }

    useEffect(() => {
        //Get Selected Patron's Data

        client.get('/Patrons/' + UserID)
            .then((response) => {
                const userData = response.data;
                setUser(userData);


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
        <div style={{ padding: '40px' }}>
            <Button disableRipple onClick={() => navigate("/empl/patrons")} startIcon={<ArrowBackIcon />}
                sx={{
                    color: "Black",
                    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    borderColor: "#282120"
                }}>
                Back</Button>


            <div style={{ maxWidth: '800px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h1>{user.Name}</h1>
                </div>
                <p style={{ display: 'block', borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}
                >User ID: {user.UserID}
                </p>
                <p style={{ display: 'block', borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}
                >Email: {user.Email ? user.Email : 'N/A'}
                </p>
                <div style={{ paddingBottom: '16px', borderBottom: '1px solid #2821204D' }}>
                    <p style={{ display: 'block', flex: 1, padding: '16px 0', margin: '0' }}>
                        Order List:
                    </p>
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
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Customer ID</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Item ID</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(orderList && orderList.length > 0 ? orderList : []
                                ).map((order) => (
                                    order["ProductsInOrders List"].map((item) => (
                                        <TableRow key={order.OrderID + "-" + item.ProduktId}>
                                            <TableCell>{order.OrderID}</TableCell>
                                            <TableCell>{order.Customer ? order.Customer : 'N/A'}</TableCell>
                                            <TableCell>{order.StreetAddress ? order.StreetAddress : ''},
                                                {order.Suburb ? order.Suburb : ''}, {order.State ? order.State : ''},
                                                {order.PostCode ? order.PostCode : ''}
                                            </TableCell>
                                            <TableCell>{item.ProduktId}</TableCell>
                                            <TableCell>$ {item.Price}</TableCell>
                                            <TableCell>{item.Quantity}</TableCell>
                                            <TableCell>$ {(item.Price * item.Quantity).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </div>

        </div>
    )
}

export default ViewPatron;
// src/components/Admins/Account/Patrons.js
// Component to display customer/patron accounts for admin users (view only)
// It fetches user data from the Patron DB and displays it in a table format

import { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField, Button, Box, Table, TableContainer, TableRow, TableCell,
    TableHead, TableBody, Paper, Stack, Typography
} from "@mui/material";
import { Link } from "react-router-dom";


const Patrons = () => {
    const [patrons, setPatrons] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050/Patrons",
        header: {
            'Accept': 'application/json'
        }
    });

    //Get data from Server and store it in the patrons state. Only run on initial render
    useEffect(() => {
        client.get('')
            .then((response) => {
                console.log(response.data.list);
                setPatrons(response.data.list);
            });
    }, [])

    return (
        <div style={{
            padding: '30px',
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '60px'
        }}>

            {/* Side Navigation bar */}
            <div style={{
                borderRight: '1px solid #282120',
                height: '200px',
                width: '20%',
                maxWidth: '200px',
                paddingRight: '10px',
                paddingTop: '10px'
            }}>
                <Typography
                    component={Link}
                    to={"/admin/patrons"} // go to customer/patron accounts page
                    sx={{
                        display: 'inline-block',
                        color: "black",
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        alignItems: "center",
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    CUSTOMER
                </Typography>
                <Typography
                    component={Link}
                    to={"/admin/staffs"} // go to staff/user accounts page
                    sx={{
                        display: 'inline-block',
                        width: '100%',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        color: "black",
                        alignItems: "center",
                        textDecoration: "none",
                        cursor: 'pointer',
                        "&:hover": {
                            textDecoration: "underline",
                        }, // hover
                    }}
                >
                    STAFF
                </Typography>
            </div>

            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                <Box margin={10} width="95%" maxWidth={1200}>
                    <h2>CUSTOMER ACCOUNTS</h2>
                    <TableContainer component={Paper} sx={{
                        border: '1px solid #282120 ',
                        borderRadius: '0',
                    }}>
                        <Table sx={{
                            borderCollapse: 'collapse',
                            'th': { fontWeight: 'bold', padding: '8px', backgroundColor: '#2821202D', border: '1px solid #2821206D' },
                            'td': { padding: '8px', border: '1px solid #2821203D' },
                            width: "100%"
                        }} aria-label="items-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patrons.map((p) => {
                                    return (
                                        <TableRow key={p.UserID}>
                                            <TableCell>{p.UserID}</TableCell>
                                            <TableCell>{p.Name}</TableCell>
                                            <TableCell>{p.Email}</TableCell>
                                            <TableCell sx={{ justifyContent: 'center', textAlign: 'center' }}>
                                                <Typography
                                                    component={Link}
                                                    to={"/admin/patrons/" + p.UserID}
                                                    sx={{
                                                        textDecoration: "none",
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        "&:hover": { textDecoration: "underline" }, // hover
                                                    }}
                                                >
                                                    View
                                                </Typography>
                                            </TableCell>
                                        </TableRow>)
                                }
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Stack>
        </div>
    )
}
export default Patrons;
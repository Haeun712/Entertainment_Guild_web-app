// src/components/Employees/PatronsEmpl.js
// Component to display patrons for employee users (view only)
// It fetches patron data from the Patron DB and displays it in a table format

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
            margin: '40px',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Stack direction="row" spacing={2}>
                <Box margin={10} width={'80vw'} maxWidth={800}>
                    <h1>CUSTOMER ACCOUNTS</h1>
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
                                                    to={"/empl/patrons/" + p.UserID}
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
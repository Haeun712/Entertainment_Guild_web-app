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
            padding: '40px',
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '60px'
        }}>

            <div style={{
                borderRight: '1px solid #282120',
                height: '200px',
                width: '20%',
                maxWidth: '200px',
                paddingRight: '10px',
                paddingTop: '30px'
            }}>
                <Typography
                    component={Link}
                    to={"/patrons"} // go to partons account page
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
                    PATRONS
                </Typography>
                <div style={{ marginTop: '20px' }}></div>
                <Typography
                    component={Link}
                    to={"/users"} // go to users account page
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
                    USERS
                </Typography>
            </div>

            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                <Box margin={10} width="80%" maxWidth={1200}>
                    <h2>PATRONS</h2>
                    <TableContainer component={Paper} sx={{
                        border: '1px solid #282120 ',
                        borderRadius: '0',
                    }}>
                        <Table sx={{
                            'th': { fontWeight: 'bold', padding: '12px', backgroundColor: '#2821202D' },
                            'td': { padding: '10px' },
                            width: "100%"
                        }} aria-label="items-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patrons.map((p) => {
                                    return (
                                        <TableRow key={p.id}>
                                            <TableCell>{p.UserID}</TableCell>
                                            <TableCell>{p.Name}</TableCell>
                                            <TableCell>{p.Email}</TableCell>
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
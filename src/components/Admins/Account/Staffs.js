// src/components/Admins/Account/Staffs.js
// Component to display staff accounts (admins and employees only) for admin users
// It fetches user data from the User DB and Patron DB to filter and display only staff (admins and employees) accounts in a table format

import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Table, TableContainer, TableRow, TableCell,
    TableHead, TableBody, Paper, Stack, Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';


const Staffs = () => {
    const [users, setUsers] = useState([]);
    const headers = {
        'Accept': 'application/json',
    };

    //Get data from Server and store it in the users state. Only run on initial render
    useEffect(() => {
        axios.get("http://localhost:3001/api/inft3050/User", {
            headers: headers, withCredentials: true
        })
            .then((response) => {
                const userList = response.data.list;

                axios.get("http://localhost:3001/api/inft3050/Patrons", {
                    headers: headers, withCredentials: true
                }).then((response) => {
                    const patronList = response.data.list;
                    const staffList = userList.filter((user) => !patronList
                        .some(patron => patron.Email === user.Email))

                        setUsers(staffList);
                })



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
                        textDecoration: "none",
                        alignItems: "center",
                        cursor: 'pointer',
                        "&:hover": {
                            textDecoration: "underline",
                        }, // hover
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
                        fontWeight: 'bold',
                        color: "black",
                        alignItems: "center",
                        cursor: 'pointer',
                    }}
                >
                    STAFF
                </Typography>
            </div>

            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                <Box margin={10} width="95%" maxWidth={1200}>
                    <h2>STAFF ACCOUNTS</h2>
                    {/* Create STAFF ACCOUNTS Button linking create Staff page  */}
                    <Button variant="contained"
                        component={Link}
                        to={"/admin/staffs/create"}
                        sx={{
                            backgroundColor: '#282120',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            padding: '8px',
                            height: '36px',
                            margin: '10px 0'
                        }}>
                        <AddCircleIcon sx={{ width: '18px', marginRight: '5px' }} />
                        CREATE STAFF
                    </Button>
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
                                    <TableCell>Username</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>Admin</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((u) => {
                                    return (
                                        <TableRow key={u.UserID}>
                                            <TableCell>{u.UserID}</TableCell>
                                            <TableCell>{u.UserName}</TableCell>
                                            <TableCell>{u.Name}</TableCell>
                                            <TableCell>{u.Email ? u.Email : ''}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{u.IsAdmin ? 'O' : 'X'}</TableCell>
                                            <TableCell sx={{ justifyContent: 'center', textAlign: 'center' }}>
                                                <Typography
                                                    component={Link}
                                                    to={"/admin/staffs/" + u.UserID}
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
export default Staffs;
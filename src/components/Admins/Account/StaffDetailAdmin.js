// src/components/Admins/Account/StaffDetailAdmin.js
// Component to display detailed information about a specific staff account (admin or employee) for admin users
// It allows editing and deleting the staff account, and displays the list of products managed by the staff (specifically admins, if any)

import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button, Dialog } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';
import { tryDeleteUser } from '../../../helpers/userHelpers';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

const ViewStaff = () => {
    const navigate = useNavigate();

    const UserID = useParams().UserID;
    const [user, setUser] = useState({});
    const [productList, setProductList] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        },
        withCredentials: true
    });

    useEffect(() => {
        //Get Selected User's Data

        client.get('/User/' + UserID)
            .then((response) => {
                const userData = response.data;
                setUser(userData);


                //Get Selected User's Product List
                const products = userData['Product List'] || [];
                setProductList(products);
            })
    }, []);

    // Delete User function 
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handledeleteUser = (event) => {
        event.preventDefault(); //Prevent reloading of the page
        tryDeleteUser(UserID, navigate);
    }

    return (
        <div style={{ padding: '40px' }}>
            <Button disableRipple onClick={() => navigate("/admin/staffs")} startIcon={<ArrowBackIcon />}
                sx={{
                    color: "Black",
                    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    borderColor: "#282120"
                }}>
                Back</Button>


            <div style={{ maxWidth: '800px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h1>{user.Name} <span style={{ fontSize: '24px' }}>({user.IsAdmin ? 'Admin' : 'Employee'})</span></h1>
                    {/* Edit User Link Button (In progress)*/}
                    <Button variant="contained"
                        component={Link}
                        to={"/admin/staffs/" + UserID + "/edit"}
                        sx={{
                            marginTop: '20px',
                            backgroundColor: '#282120',
                            color: 'white',
                            height: '40px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            padding: '10px'
                        }}>
                        <ModeEditIcon sx={{ width: '18px', marginRight: '5px' }} />
                        EDIT USER
                    </Button>
                </div>
                <p style={{ display: 'block', borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}
                >User ID: {user.UserID}
                </p>
                <p style={{ display: 'block', borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}
                >User Name: {user.UserName}
                </p>
                <p style={{ display: 'block', borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}
                >Email: {user.Email ? user.Email : 'N/A'}
                </p>
                <p style={{ display: 'block', borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}
                >Name: {user.Name}
                </p>
                {productList && productList.length > 0 && (
                    <div style={{ paddingBottom: '16px', borderBottom: '1px solid #2821204D' }}>
                        <p style={{ display: 'block', flex: 1, padding: '16px 0', margin: '0' }}>
                            Product List:
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
                                        <TableCell sx={{ width: '80px' }}>Product ID</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell sx={{ textAlign: 'center', width: '50px' }}>Detail</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(productList && productList.length > 0 ? productList : []
                                    ).map((product) => (
                                        <TableRow key={product.ID}>
                                            <TableCell>{product.ID}</TableCell>
                                            <TableCell>{product.Name}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', width: '50px' }}>
                                                <Typography
                                                    component={Link}
                                                    to={"/admin/products/" + product.ID}
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>)}

                {/* Delete User from DB */}
                <Button variant="contained"
                    onClick={handleClickOpen}
                    sx={{
                        marginTop: '20px',
                        backgroundColor: '#EC221F',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        padding: '10px',
                        height: '40px'
                    }}>
                    <DeleteIcon sx={{ width: '18px', marginRight: '5px' }} />
                    DELETE USER
                </Button>
                
                {/* Delete User Confirmation Dialog */}
                {/* Cancel - Close dialog without deleting */}
                {/* Yes, Delete - Call delete user function */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle id="delete-user-dialog-title">
                        {"Delete User?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-user-dialog-description">
                            Are you sure you want to delete this user? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ gap: '8px' }}>
                        <Button variant='outlined' color='#282120' onClick={handleClose} autoFocus sx={{'&:hover': {backgroundColor:'#28212020'}}}>Cancel</Button>
                        <Button variant='outlined' sx={{ backgroundColor: '#EC221F', color: 'white', borderColor: '#C00F0C', '&:hover': {backgroundColor:'#C00F0C'}}} onClick={handledeleteUser}>
                            Yes, Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )
}

export default ViewStaff;
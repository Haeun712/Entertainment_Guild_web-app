// src/components/Admins/Product/ProductDetailAdmin.js
// Component to display detailed information about a specific product for admin users
// It allows editing and deleting the product, as well as managing its stocktake items (add, edit, delete)

import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';
import { tryDeleteProduct } from '../../../helpers/productHelpers';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateItem from './Item/createItem';
import EditItem from './Item/editItem';
import { tryDeleteItem } from '../../../helpers/itemHelpers';

const ViewProduct = () => {
    const navigate = useNavigate();

    const ID = useParams().ID;
    const [product, setProduct] = useState({});
    const [stocktake, setStocktake] = useState({});
    const [genre, setGenre] = useState({});
    const [subGenre, setSubGenre] = useState({});
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        }
    });
    const page = parseInt(sessionStorage.getItem('page') || '1', 10);

    useEffect(() => {
        //Get Selected Product's Data

        client.get('/Product/' + ID)
            .then((response) => {
                const productData = response.data;
                setProduct(productData);

                client.get('/Genre?nested[Product List][limit]=200')
                    .then((response) => {
                        const genreList = response.data.list;

                        // find product's genre by checking if the product ID exists in genre's Product List
                        const targetGenre = genreList.find(g => g['Product List']
                            .some(p => p.ID === productData.ID));
                        setGenre(targetGenre);
                        const genreId = targetGenre.GenreID

                        //Get Selected Product's SubGenre ID
                        const subGenreId = productData.SubGenre;

                        //Get Selected Product's SubGenre Name using its Genre ID
                        // Genre ID mapping: 1 -> BookGenre, 2-> MovieGenre, 3 -> GameGenre
                        if (genreId === 1) {
                            if (subGenreId <= 11) {
                                client.get('/BookGenre/' + subGenreId)
                                    .then((response) => {
                                        setSubGenre(response.data)
                                    })
                            }
                            else {
                                client.get('/BookGenre new/' + subGenreId)
                                    .then((response) => {
                                        setSubGenre(response.data)
                                    })
                            }
                        }
                        else if (genreId === 2) {
                            client.get('/MovieGenre/' + subGenreId)
                                .then((response) => {
                                    setSubGenre(response.data)
                                })
                        }
                        else if (genreId === 3) {
                            client.get('/GameGenre/' + subGenreId)
                                .then((response) => {
                                    setSubGenre(response.data)
                                })
                        }



                        //Get Selected Product's Stocktake List
                        client.get('/Stocktake?where=(ProductId,eq,' + ID + ')&limit=1000')
                            .then((response) => {
                                console.log(response.data.list);
                                setStocktake(response.data.list);
                            })
                    })
            })
    }, []);

    // Delete Product function 
    // State for delete product dialog
    const [openDialogP, setOpenDialogP] = React.useState(false);

    const OpenDeleteProduct = () => {
        setOpenDialogP(true);
    };

    const CloseDeleteProduct = () => {
        setOpenDialogP(false);
    };

    const handledeleteProduct = (event) => {
        event.preventDefault(); //Prevent reloading of the page
        tryDeleteProduct(ID, navigate, page);
    }



    // Control visibility of the "Create (Add) Item" component
    const [showAdd, setShowAdd] = useState(false);
    const openAddItem = () => {
        setShowAdd(true);
    }

    const closeAddItem = () => {
        setShowAdd(false);
    }

    // target Item to edit/delete
    const [targetItem, setTargetItem] = useState(null);
    
    // Control visibility of the "Edit Item" component
    const [showEdit, setShowEdit] = useState(false);
    const openEditItem = (itemId) => {
        setShowEdit(true);
        setTargetItem(itemId);
    }

    const closeEditItem = () => {
        setShowEdit(false);
        setTargetItem(null);
    }

    // Delete Item function 
    // State for delete item dialog
    const [openDialogI, setOpenDialogI] = React.useState(false);

    const OpenDeleteItem = (itemId) => {
        setOpenDialogI(true);
        setTargetItem(itemId);
    };

    const CloseDeleteItem = () => {
        setOpenDialogI(false);
        setTargetItem(null);
    };

    const handledeleteItem = (event) => {
        event.preventDefault(); //Prevent reloading of the page
        tryDeleteItem(targetItem);
    }

    return (
        <div style={{ padding: '40px' }}>
            <Button disableRipple onClick={() => navigate("/admin/products?page=" + page)} startIcon={<ArrowBackIcon />}
                sx={{
                    color: "Black",
                    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    borderColor: "#282120"
                }}>
                Back</Button>


            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h1>{product.Name}</h1>
                    {/* Edit Product Link Button - go to Edit Product Page*/}
                    <Button variant="contained"
                        href={"/admin/products/" + ID + "/edit"}
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
                        EDIT PRODUCT
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px' }}>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}
                    >Product ID: {product.ID}
                    </p>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Name: {product.Name}
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px' }}>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Author: {product.Author}
                    </p>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Published: {product.Published ? new Date(product.Published).toISOString().split('T')[0] : "-"}
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px' }}>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Genre: {genre.Name}
                    </p>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Subgenre: {subGenre.Name}
                    </p>
                </div>
                <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                    Description: <br /><br />
                    {product.Description}
                </p>
                    <div style={{ paddingBottom: '16px', borderBottom: '1px solid #2821204D' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ display: 'block', flex: 1, padding: '16px 0', margin: '0' }}>
                                Stocktake List:
                            </p>
                            <Button variant="outlined"
                                onClick={() => {openAddItem(); closeEditItem()}}
                                disabled={showAdd}
                                sx={{
                                    border: 'solid 1px #282120',
                                    backgroundColor: 'white',
                                    color: '#282120',
                                    fontWeight: 'bold',
                                    fontSize: '12px',
                                    padding: '5px',
                                    height: '30px',
                                    margin: '10px 0'
                                }}>
                                <AddCircleIcon sx={{ width: '18px', marginRight: '5px' }} />
                                ADD ITEM
                            </Button>
                        </div>
                        <TableContainer sx={{
                            borderRadius: '0',
                            border: '1px solid #282120'
                        }}>
                            <Table sx={{
                                borderCollapse: 'collapse',
                                'th': { fontWeight: 'bold', padding: '8px', backgroundColor: '#2821202D', border: '1px solid #2821206D' },
                                'td': { padding: '8px', border: '1px solid #2821203D' }
                            }} aria-label="stocktake-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Id</TableCell>
                                        <TableCell>Source Id</TableCell>
                                        <TableCell>Source Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell sx={{width:'40px', textAlign:'center'}}>Edit</TableCell>
                                        <TableCell sx={{width:'40px', textAlign:'center'}}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(stocktake && stocktake.length > 0 ? stocktake : []
                                    ).map((item) => (
                                        <TableRow key={item.ItemId}>
                                            <TableCell>{item.ItemId}</TableCell>
                                            <TableCell>{item.SourceId}</TableCell>
                                            <TableCell>{item.Source?.SourceName || "N/A"}</TableCell>
                                            <TableCell>${item.Price}</TableCell>
                                            <TableCell>{item.Quantity}</TableCell>
                                            <TableCell sx={{width:'40px', textAlign:'center'}}>
                                                <Button 
                                                onClick={() => {openEditItem(item.ItemId); closeAddItem();}}
                                                disabled = {showEdit}
                                                sx={{
                                                    border: 'solid 1px #282120',
                                                    backgroundColor: 'white',
                                                    color: '#282120',
                                                    padding: '5px',
                                                    height: '30px',
                                                    minWidth: '30px',
                                                }}><ModeEditIcon sx={{ width: '20px' }} /></Button>
                                            </TableCell>
                                            <TableCell sx={{width:'40px', textAlign:'center'}}>
                                                <Button 
                                                onClick={() => OpenDeleteItem(item.ItemId)}
                                                sx={{
                                                    border: 'solid 1px #EC221F',
                                                    backgroundColor: 'white',
                                                    color: '#EC221F',
                                                    padding: '5px',
                                                    height: '30px',
                                                    minWidth: '30px',
                                                }}>                    
                                                <DeleteIcon sx={{ width: '20px' }} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <CreateItem show={showAdd} onClose={closeAddItem} />
                        <EditItem show={showEdit} onClose={closeEditItem} itemId={targetItem}/>
                    </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px' }}>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        LastUpdated: {product.LastUpdated ? new Date(product.LastUpdated).toISOString().split('T')[0] : "-"}
                    </p>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        LastUpdatedBy: {product.LastUpdatedBy}
                    </p>
                </div>




                {/* Delete Product from DB */}
                <Button variant="contained"
                    onClick={OpenDeleteProduct}
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
                    DELETE PRODUCT
                </Button>

                {/* Delete Product Confirmation Dialog */}
                {/* Cancel - Close dialog without deleting */}
                {/* Yes, Delete - Call delete product function */}
                <Dialog
                    open={openDialogP}
                    onClose={CloseDeleteProduct}
                >
                    <DialogTitle id="delete-product-dialog-title">
                        {"Delete Product?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-product-dialog-description">
                            Are you sure you want to delete this product? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ gap: '8px' }}>
                        <Button variant='outlined' color='#282120' onClick={CloseDeleteProduct} autoFocus
                            sx={{ '&:hover': { backgroundColor: '#28212020' } }}
                            disableRipple>Cancel</Button>
                        <Button variant='outlined'
                            sx={{ backgroundColor: '#EC221F', color: 'white', borderColor: '#C00F0C', '&:hover': { backgroundColor: '#C00F0C' } }}
                            onClick={handledeleteProduct}
                            disableRipple>
                            Yes, Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Item Confirmation Dialog */}
                {/* Cancel - Close dialog without deleting */}
                {/* Yes, Delete - Call delete item function */}
                <Dialog
                    open={openDialogI}
                    onClose={CloseDeleteItem}
                >
                    <DialogTitle id="delete-item-dialog-title">
                        {"Delete Item (Item ID:" + targetItem +")"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-product-dialog-description">
                            Are you sure you want to delete this item? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ gap: '8px' }}>
                        <Button variant='outlined' color='#282120' onClick={CloseDeleteItem} autoFocus
                            sx={{ '&:hover': { backgroundColor: '#28212020' } }}
                            disableRipple>Cancel</Button>
                        <Button variant='outlined'
                            sx={{ backgroundColor: '#EC221F', color: 'white', borderColor: '#C00F0C', '&:hover': { backgroundColor: '#C00F0C' } }}
                            onClick={handledeleteItem}
                            disableRipple>
                            Yes, Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )
}

export default ViewProduct
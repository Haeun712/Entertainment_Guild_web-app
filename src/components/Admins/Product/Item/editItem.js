// src/components/Admins/Product/Item/editItem.js
// Component to edit an existing stocktake item in the Stocktake DB

import { useState } from "react";
import {
    Box, Button, FormControl,
    FormGroup, TextField, Select, MenuItem,
    InputAdornment,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import axios from "axios";
import { tryEditItem } from "../../../../helpers/itemHelpers";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close'


const EditItem = ({ show, onClose, itemId }) => {
    const [productId, setProductId] = useState(useParams().ID);
    const [sourceId, setSourceId] = useState(0);
    const [sourceList, setSourceList] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        }
    });

    
    React.useEffect(() => {

        // Get Source List stored in the server
        client.get('/Source')
            .then((response) => {
                setSourceList(response.data.list);

                // Get Selected Item's Data
                client.get('/Stocktake/' + itemId)
                    .then((response) => {
                        const targetItem = response.data;
                        setSourceId(targetItem.SourceId);
                        setQuantity(targetItem.Quantity);
                        setPrice(targetItem.Price);
                    }).catch(err => console.error(err));
            }).catch(err => console.error(err));

    }, [itemId]);

    if (!show) return null;




    function handleEditItem(event) {
        event.preventDefault(); //Prevent reloading of the page
        tryEditItem(itemId, sourceId, quantity, price);
    }

    const handleSourceChange = (event) => {
        setSourceId(event.target.value);
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }



    return (
        <div style={{ border: 'solid 1px #28212050', padding: '8px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: '0', fontWeight: 'bold' }}>EDIT ITEM <span style={{ fontWeight: 'normal' }}>(Item ID: {itemId})</span></p>
                <IconButton
                    onClick={onClose}>
                    <CloseIcon sx={{ fontSize: '18px' }} />
                </IconButton>
            </div>
            <form method='post' onSubmit={handleEditItem}>
                <FormGroup sx={{ my: 1, width: '100%', maxWidth: '800px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        {/* Source Field - must select one genre*/}
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <label style={{ marginTop: '5px', fontSize: '18px' }} id="source-label">Source:</label>
                                <Select
                                    aria-labelledby='source-label'
                                    id="source"
                                    name="source"
                                    value={sourceId}
                                    onChange={handleSourceChange}
                                    size="small"
                                    required
                                    displayEmpty
                                    sx={{
                                        minWidth: '0'
                                    }}
                                    MenuProps={{
                                        disableAutoFocusItem: true,
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 200,
                                            }
                                        }
                                    }}
                                    fullWidth
                                >
                                    <MenuItem value={0} disabled sx={{ display: 'none' }}>Select Source</MenuItem>

                                    {(sourceList && sourceList.length > 0 ? sourceList : []
                                    ).map((s) => (
                                        <MenuItem sx={{
                                            '&:hover': { backgroundColor: '#f5f5f5' }
                                        }}
                                            value={s.Sourceid}>{s.SourceName}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </FormControl>

                        {/* Quantity Field - must be filled */}
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <label style={{ marginTop: '5px', fontSize: '18px' }} htmlFor="quantity">Quantity:</label>
                                <TextField
                                    variant="outlined"
                                    name="quantity"
                                    id="quantity"
                                    size='small'
                                    type='number'
                                    fullWidth
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    required
                                    inputProps={{
                                        min: 0,
                                        step: 1
                                    }}
                                />
                            </div>
                        </FormControl>

                        {/* Price Field - must be filled */}
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <label style={{ marginTop: '5px', fontSize: '18px' }} htmlFor="price">Price:</label>
                                <TextField
                                    variant="outlined"
                                    name="price"
                                    id="price"
                                    size='small'
                                    type='number'
                                    fullWidth
                                    value={price}
                                    onChange={handlePriceChange}
                                    required
                                    inputProps={{
                                        min: 0,
                                        step: 0.01
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    sx={{
                                        minWidth: '0'
                                    }}
                                />
                            </div>
                        </FormControl>
                    </div>
                </FormGroup>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {/* save updated item in DB */}
                    <Button variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#282120',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            padding: '5px',
                            height: '30px',
                        }}>
                        SAVE
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditItem
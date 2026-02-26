// src/components/Order/Cart.js
// Component to display the shopping cart, allowing users to view items, adjust quantities, delete item from cart and proceed to checkout

import { Box, Button, Tooltip, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ItemImg from '../../assets/itemImg.svg';

const Cart = () => {
    const [itemsInCart, setItemsInCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    console.log(itemsInCart)
    const [total, setTotal] = useState(0);

    useEffect(() => {

        let sum = 0;
        for (let i=0; i < itemsInCart.length; i++) {
            sum += itemsInCart[i].Item.Price * itemsInCart[i].Quantity;
            
        }
        

        localStorage.setItem('cart',JSON.stringify(itemsInCart));
        setTotal(parseFloat(sum.toFixed(2)));

        window.dispatchEvent(new Event("cartUpdated"));

     },[itemsInCart])

     const hasOufOfStockError = itemsInCart.some(item => item.Quantity > item.Item.InStockQty);

        return (
            <Box margin={10} width={'80vw'} maxWidth={800}>
                <h1>CARTS ({itemsInCart.length})</h1>

                {/* List of items/products in the order (cart)*/}
                {itemsInCart.length === 0 && (
                    <Box
                            sx={{
                                height: '150px',
                                padding: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '20px',
                                fontSize: '20px'
                            }}>
                        Your cart is empty.
                    </Box>
                )}
                {itemsInCart.length > 0 && (
                    itemsInCart.map((item) => (
                        <Box
                            key={item.Item.ItemId}
                            sx={{
                                border: '1px solid #282120',
                                maxWidth: '800px',
                                height: '150px',
                                padding: '10px',
                                display: 'flex', gap: '10px',
                                alignItems: 'start',
                                marginBottom: '20px'
                            }}>
                            <Box
                                component="img"
                                src={ItemImg}
                                alt="item image"
                                sx={{
                                    height: '100%'
                                }} />
                            <div style={{ flex: 1, height: '100%', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <h3 style={{ margin: '0', fontWeight: 'bold' }}>{item.Item.Product.Name}</h3>
                                        <p style={{ margin: '8px 0' }}>{item.Item.Source.SourceName}</p>
                                        <FormControl fullWidth variant="outlined">
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <label style={{ marginTop: '2.5px' }} htmlFor="quantity">Quantity:</label>
                                                <TextField
                                                    variant="outlined"
                                                    name="quantity"
                                                    id="quantity"
                                                    size='small'
                                                    type='number'
                                                    sx={{ maxWidth: '60px' }}
                                                    value={item.Quantity}
                                                    onChange={(event) => {
                                                        const newQuantity = Number(event.target.value);

                                                        const QtyUpdatedCart = itemsInCart.map(cartItem =>
                                                            cartItem.Item.ItemId === item.Item.ItemId
                                                                ? { ...cartItem, Quantity: newQuantity } : cartItem

                                                        );

                                                        setItemsInCart(QtyUpdatedCart);
                                                    }}
                                                    required
                                                    inputProps={{
                                                        min: 1,
                                                        step: 1,
                                                        sx: {
                                                            padding: '4px 8px'
                                                        }
                                                    }}
                                                    error={item.Quantity > item.Item.InStockQty}
                                                    helperText={item.Quantity > item.Item.InStockQty ? "Only " + item.Item.InStockQty + " items available" : ""}
                                                    FormHelperTextProps={{
                                                        sx: {
                                                            width: '150px',
                                                            whiteSpace: 'normal'
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                    </div>
                                    <Tooltip title="Delete from cart">
                                        <IconButton
                                            aria-label="Delete"
                                            sx={{
                                                color: 'gray',
                                                marginTop: '-8px',
                                                marginRight: '-8px'
                                            }}
                                            onClick = {(event) => {
                                               const updatedCart = itemsInCart.filter(i => i.Item.ItemId !== item.Item.ItemId);
                                               
                                               setItemsInCart(updatedCart);
                                            }}>
                                            <DeleteIcon sx={{ fontSize: '24px' }} />
                                        </IconButton>
                                    </Tooltip>

                                </div>
                                <p style={{ position: 'absolute', bottom: 0, right: 0, margin: 0, fontSize: '20px' }}>$ {(item.Item.Price * item.Quantity).toFixed(2)}</p>
                            </div>
                        </Box>
                    ))

                )}
                <div style={{
                    display: 'flex', gap: '60px'
                }}>
                    <h2>Total:</h2>
                    <h2>$ {total}</h2>
                </div>
                <Button variant="contained"
                    href="/order"
                    disabled={itemsInCart.length === 0 || hasOufOfStockError}
                    sx={{
                        marginTop: '20px',
                        backgroundColor: '#282120',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        width: '100%',
                        maxWidth: '500px',
                        height: '50px',
                        padding: '10px'
                    }}>
                    PROCEED TO CHECKOUT
                </Button>
            </Box>
        );
    }

export default Cart
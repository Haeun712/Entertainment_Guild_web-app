// src/components/Products/ItemDetail.js
// Component to display detailed information about a specific item
// Allows patrons to select quantity and add the item to their cart

import axios from 'axios';
import ItemImg from '../../assets/itemImg.svg';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormControl, TextField, Box } from '@mui/material';


const ItemDetail = () => {
    const navigate = useNavigate();

    const ItemId = useParams().ItemId;
    const [item, setItem] = useState({});
    const [product, setProduct] = useState({});
    const [genre, setGenre] = useState({});
    const [subGenre, setSubGenre] = useState({});
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        }
    });
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState(false);

    useEffect(() => {
        //Get Selected Item's Data
        client.get('/Stocktake/' + ItemId)
            .then((response) => {
                const itemData = response.data;
                setItem(itemData);
                const ProductId = itemData.ProductId;

                client.get('/Product/' + ProductId)
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
                            })


                    })
            })
    }, []);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    const handleAddToCart = (event) => {
        event.preventDefault(); //Prevent reloading of the page

        // Set the error state (true - display error message) (if the quantity exceeds the available stock)
        if (quantity > item.Quantity) {
            setQuantityError(true);
            return;
        }

        setQuantityError(false);

        // Retrieve the existing cart from local storage or empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];


        const exisitngItemIndex = cart.findIndex(cartItem => cartItem.Item.ItemId === item.ItemId);
        console.log("Existing Item Index: ", exisitngItemIndex);

        if (exisitngItemIndex !== -1) {

            // if the item is already in the cart
            cart[exisitngItemIndex].Quantity =  cart[exisitngItemIndex].Quantity + Number(quantity);

        } else {
            // add a new item to the cart 

            cart.push({
                Quantity: Number(quantity),
                Item: {
                    ItemId: item.ItemId,
                    SourceId: item.SourceId,
                    ProductId: item.ProductId,
                    InStockQty: item.Quantity,
                    Price: item.Price,
                    Product: item.Product,
                    Source: item.Source
                }
            });
        }

      // save the updated cart back to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log(JSON.parse(localStorage.getItem('cart')));

        alert("Item (" + product.Name + ") has been added to your cart successfully !");
        window.dispatchEvent(new Event("cartUpdated"));
        navigate(-1);
    }

    return (
        <div style={{ padding: '40px' }}>
            <Button disableRipple onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}
                sx={{
                    color: "Black",
                    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    borderColor: "#282120"
                }}>
                Back</Button>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: "flex-start", flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap' }}>

                <Box
                    sx={{
                        display: 'flex',
                        flex: '1', maxWidth: { md: '500px' }, margin: '20px 0', justifyContent: 'center', alignItems: 'center'
                        , width: { xs: '100%' }, marginRight: { md: '40px' }
                    }}>
                    <Box
                        component="img"
                        src={ItemImg}
                        alt="item image"
                        sx={{
                            width: '100%', height: '100%',
                            maxHeight: { xs: 500, md: 'none' },
                            objectFit: 'contain', display: 'block'
                        }} />
                </Box>
                <div style={{ flex: '1', paddingLeft: '40px', paddingBottom: '20px', borderLeft: '1px solid #282120 ' }}>

                    <h1 style={{ marginTop: '0' }}>{product.Name}</h1>
                    <p style={{ fontSize: '18px' }}>{product.Author}</p>
                    <h2 style={{ fontSize: '25px' }}>${item.Price}</h2>

                    <p style={{ margin: '5px 0' }}>Genre: {genre.Name} ({subGenre.Name})</p>
                    <p style={{ margin: '5px 0' }}>Published: {product.Published ? new Date(product.Published).toISOString().split('T')[0] : "-"}</p>
                    <p style={{ margin: '5px 0' }}>Source: {item.Source?.SourceName || "-"}</p>
                    <p style={{ marginTop: "40px" }}>{product.Description}</p>

                    <form method='post' onSubmit={handleAddToCart}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <label style={{ marginTop: '7px' }} htmlFor="quantity">Quantity:</label>
                                <TextField
                                    variant="outlined"
                                    name="quantity"
                                    id="quantity"
                                    size='small'
                                    type='number'
                                    sx={{ maxWidth: '80px' }}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    required
                                    inputProps={{
                                        min: 1,
                                        step: 1,
                                    }}
                                    error={quantityError}
                                    helperText={quantityError ? "Only " + item.Quantity + " items available" : ""}
                                    FormHelperTextProps={{
                                        sx: {
                                            width: '150px',
                                            whiteSpace: 'normal'
                                        }
                                    }}
                                />
                            </div>
                        </FormControl>

                        {/* Add Item into Order (Cart) - Local Storage */}
                        <Button variant="contained"
                            type='submit'
                            sx={{
                                marginTop: '20px',
                                backgroundColor: '#282120',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                width: '100%',
                                maxWidth: '500px',
                                height: '50px',
                                padding: '10px'
                            }}>
                            ADD TO CART
                        </Button>
                    </form>
                </div>

            </Box>
        </div>
    )
}

export default ItemDetail
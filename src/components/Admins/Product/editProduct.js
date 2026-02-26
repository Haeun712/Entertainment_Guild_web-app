// src/components/Admins/Product/editProduct.js
// Component to edit an existing product's details in the Product DB

import { useState } from "react";
import {
    Box, Button, FormControl,
    FormGroup, TextField, Select, MenuItem
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as React from 'react';
import axios from "axios";
import { tryEditProduct } from "../../../helpers/productHelpers";

const EditProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [subGenre, setSubGenre] = useState('');
    const [subGenreList, setSubGenreList] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        }
    });
    const ProductID = useParams().ID;

    React.useEffect(() => {

        // Get Selected Product's Data
        client.get('/Product/' + ProductID)
            .then((response) => {
                const targetProduct = response.data;
                setName(targetProduct.Name);
                setAuthor(targetProduct.Author);
                setDescription(targetProduct.Description);

                //Conver ISO date string into format ("YYYY-MM-DD")
                const publishedDate = new Date(targetProduct.Published).toISOString().split('T')[0];
                setPublished(publishedDate);

                client.get('/Genre?nested[Product List][limit]=200')
                    .then((response) => {
                        const genreList = response.data.list;

                        // find product's genre by checking if the product ID exists in genre's Product List
                        const targetGenre = genreList.find(g => g['Product List']
                            .some(p => p.ID === targetProduct.ID));
                        console.log(targetGenre);
                        setGenre(targetGenre.GenreID);
                        const genreId = targetGenre.GenreID;

                        //Get Selected Product's SubGenre ID
                        const subGenreId = targetProduct.SubGenre;

                        //Get Selected Product's SubGenre Name using its Genre ID
                        // Genre ID mapping: 1 -> BookGenre, 2-> MovieGenre, 3 -> GameGenre
                        if (genreId === 1) {
                            if (subGenreId <= 11) {
                                client.get('/BookGenre/' + subGenreId)
                                    .then((response) => {
                                        setSubGenre(response.data.SubGenreID)

                                        client.get('/BookGenre')
                                            .then((response) => {
                                                const bookGenre = response.data.list;

                                                client.get('/BookGenre new')
                                                    .then((response) => {
                                                        const bookGenreNew = response.data.list;
                                                        setSubGenreList([...bookGenre, ...bookGenreNew])
                                                    })

                                            })
                                    })
                            }
                            else {
                                client.get('/BookGenre new/' + subGenreId)
                                    .then((response) => {
                                        setSubGenre(response.data.SubGenreID)
                                    })
                            }
                        }
                        else if (genreId === 2) {
                            client.get('/MovieGenre/' + subGenreId)
                                .then((response) => {
                                    setSubGenre(response.data.SubGenreID)

                                    client.get('/MovieGenre')
                                        .then((response) => {
                                            setSubGenreList(response.data.list)
                                        })
                                })
                        }
                        else if (genreId === 3) {
                            client.get('/GameGenre/' + subGenreId)
                                .then((response) => {
                                    setSubGenre(response.data.SubGenreID)

                                    client.get('/GameGenre')
                                        .then((response) => {
                                            setSubGenreList(response.data.list)
                                        })
                                })
                        }
                    })
            })
    },[])

    function handleEditProduct(event) {
        event.preventDefault(); //Prevent reloading of the page
        tryEditProduct(ProductID, name, author, description, genre, subGenre, published, navigate);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handlePublishedChange = (event) => {
        console.log(event.target.value);
        setPublished(event.target.value)
    }

    const handleGenreChange = (event) => {
        const selectedGenre = parseInt(event.target.value, 10);
        if (selectedGenre === 1) {
            client.get('/BookGenre')
                .then((response) => {
                    const bookGenre = response.data.list;

                    client.get('/BookGenre new')
                        .then((response) => {
                            const bookGenreNew = response.data.list;
                            setSubGenreList([...bookGenre, ...bookGenreNew])
                        })

                })

        }
        else if (selectedGenre === 2) {
            client.get('/MovieGenre')
                .then((response) => {
                    setSubGenreList(response.data.list)
                })
        }
        else if (selectedGenre === 3) {
            client.get('/GameGenre')
                .then((response) => {
                    setSubGenreList(response.data.list)
                })
        }

        setGenre(isNaN(selectedGenre) ? null : selectedGenre)
    }

    const handleSubGenreChange = (event) => {
        const value = parseInt(event.target.value, 10)
        setSubGenre(isNaN(value) ? null : value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
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
            <h1>EDIT PRODUCT</h1>
            <form method='post' onSubmit={handleEditProduct}>
                <FormGroup sx={{ my: 2, width: '100%', maxWidth: '900px' }}>

                    {/* Product Name Field - must be filled */}
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="name">Product Name</label>
                        <TextField
                            variant="outlined"
                            name="name"
                            id="name"
                            size='small'
                            sx={{ maxWidth: '500px' }}
                            fullWidth
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </FormControl>

                    {/* Author Field - must be filled */}
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="author">Author</label>
                        <TextField
                            variant="outlined"
                            name="author"
                            id="author"
                            size='small'
                            sx={{ maxWidth: '500px' }}
                            fullWidth
                            value={author}
                            onChange={handleAuthorChange}
                            required
                        />
                    </FormControl>

                    {/* Published Date Field */}
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="published">Published Date</label>
                        <TextField
                            variant="outlined"
                            name="published"
                            id="published"
                            type='date'
                            size='small'
                            sx={{ maxWidth: '500px' }}
                            fullWidth
                            value={published}
                            onChange={handlePublishedChange}
                            required
                        />
                    </FormControl>

                    {/* Genre and SubGenre Fields */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px', alignItems: 'center', maxWidth: '500px' }}>
                        {/* Genre Field - must select one genre*/}
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} id="genre-label">Genre</label>
                            <Select
                                aria-labelledby='genre-label'
                                id="genre"
                                name="genre"
                                value={genre}
                                onChange={handleGenreChange}
                                size="small"
                                required
                                displayEmpty
                            >
                                <MenuItem value="" disabled sx={{ display: 'none' }}>Select Genre</MenuItem>
                                <MenuItem value={1}>Books</MenuItem>
                                <MenuItem value={2}>Movies</MenuItem>
                                <MenuItem value={3}>Games</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Sub Genre Field*/}
                        {/* The available options change according to the chosen genre */}
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <label style={{ marginBottom: '10px', fontSize: '18px' }} id="subgenre-label">Subgenre</label>
                            <Select
                                aria-labelledby='subgenre-label'
                                id="subgenre"
                                name="subgenre"
                                value={subGenre}
                                onChange={handleSubGenreChange}
                                size="small"
                                MenuProps={{
                                    disableAutoFocusItem: true,
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 200,
                                        }
                                    }
                                }}
                                required
                                displayEmpty
                            >
                                <MenuItem value="" disabled sx={{ display: 'none' }}>Select Subgenre</MenuItem>

                                {(subGenreList && subGenreList.length > 0 ? subGenreList : []
                                ).map((sg) => (
                                    <MenuItem sx={{
                                        '&:hover': { backgroundColor: '#f5f5f5' }
                                    }}
                                        value={sg.SubGenreID}>{sg.Name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* Description Field */}
                    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                        <label style={{ marginBottom: '10px', fontSize: '18px' }} htmlFor="description">Description</label>
                        <TextField
                            variant="outlined"
                            name="description"
                            id="description"
                            fullWidth
                            sx={{ maxWidth: '500px' }}
                            size='small'
                            rows={5}
                            multiline
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </FormControl>

                </FormGroup>
                {/* create new item in DB */}
                <Button variant="contained"
                    type="submit"
                    sx={{
                        marginTop: '20px',
                        backgroundColor: '#282120',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        padding: '10px',
                        height: '40px',
                        width: '100px'
                    }}>
                    SAVE
                </Button>
            </form>
        </div>
    );
}

export default EditProduct
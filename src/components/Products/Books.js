// src/components/Products/Books.js
// Component to display a list of books with pagination from the Stocktake database

import axios from "axios";
import { useState, useEffect } from "react";
import {
    Box, Stack, Typography
} from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Pagination from "@mui/material/Pagination";
import Grid from '@mui/material/Grid';
import ItemImg from '../../assets/itemImg.svg'
import { Link, useNavigate
} from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

const Books = () => {

    const [data, setData] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        }
    });
    // Initialize pagination state from the URL query parameter (?page=)
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = React.useState(initialPage);
    const cardPerPage = 16
    const navigate = useNavigate();

    useEffect(() => {
        client.get('/StockTake?limit=1000')
            .then((response) => {

                const items = response.data.list;

                client.get('/Genre?where=(GenreID,eq,1)&nested[Product List][limit]=200')
                    .then((response) => {
                        const productList = response.data.list[0]['Product List'];
                        const productIds = productList.map(p => p.ID);

                        const books = items.filter(item => productIds.includes(item.ProductId));

                        console.log(books);
                        setData(books);
                    })
            });
    }, []);

    useEffect(() => {
    
            if (!searchParams.get("page")) {
                //Reset page number when entering this page without page URL parameter
                navigate("/products/books?page=1");
                window.location.reload();
            }
    
        }, [searchParams])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setSearchParams({ page: newPage });
    };

    const DataForEachPage = data.slice(
        (page - 1) * cardPerPage,
        page * cardPerPage
    )

    return (
        <div style={{
            padding: '40px',
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '40px'
        }}>

            <div style={{
                borderRight: '1px solid #282120',
                height: '200px',
                width: '20%',
                maxWidth: '200px',
                paddingRight: '40px',
                paddingTop: '30px'
            }}>
                <Typography
                    component={Link}
                    to={"/products"} // go to products page
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
                    ALL
                </Typography>
                <div style={{ marginTop: '20px' }}></div>
                <Typography
                    component={Link}
                    to={"/products/books"} // go to books page
                    sx={{
                        fontWeight: 'bold',
                        color: "black",
                        alignItems: "center",
                        cursor: 'pointer',
                    }}
                >
                    BOOKS
                </Typography>
                <div style={{ marginTop: '20px' }}></div>
                <Typography
                    component={Link}
                    to={"/products/movies"} // go to movies page
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
                    MOVIES
                </Typography>
                <div style={{ marginTop: '20px' }}></div>
                <Typography
                    component={Link}
                    to={"/products/games"} // go to games page
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
                    GAMES
                </Typography>
            </div>

            <Stack direction="row" spacing={2}>
                <Box margin={10} width={'70vw'} maxWidth={800}>
                    <h2>BOOKS</h2>

                    <Grid container spacing={3} margin={2}>
                        {DataForEachPage.map((d) => (
                            <Grid size={{ xs: 6, md: 3 }} key={d.ItemId} sx={{ display: 'flex' }}>
                                <Card sx={{ flex: 1 }}>
                                    <CardActionArea component={Link} to={'/products/' + d.ItemId}>
                                        <CardMedia
                                            component="img"
                                            image={ItemImg}
                                            alt="item image"
                                            sx={{
                                                height: '120px',
                                            }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="p" component="div">
                                                {d.Product.Name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary', }}>
                                                {d.Source.SourceName}
                                            </Typography>
                                            <Typography gutterBottom variant="p" component="div"
                                                sx={{ fontWeight: "bold", paddingTop: '10px', fontSize: "15px" }}>
                                                ${d.Price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Pagination
                        count={Math.ceil(data.length / cardPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            border: 'none'
                        }}
                    />


                </Box>
            </Stack>
        </div>
    )
        ;
}

export default Books;
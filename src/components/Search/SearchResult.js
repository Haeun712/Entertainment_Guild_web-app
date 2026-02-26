// src/components/Search/SearchResult.js
// Search result component that displays products matching the search query with pagination
// references: https://blogs.purecode.ai/blogs/mui-search-bar, https://nextjs.org/docs/app/api-reference/functions/use-search-params

import { Stack } from "@mui/system";
import { Paper, Box, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import ItemImg from '../../assets/itemImg.svg'
import React from "react";
import Pagination from "@mui/material/Pagination";
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";



const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const searchString = searchParams.get('query') || "";
    const [filteredList, setFilteredList] = useState([]);

    const [items, setItems] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050/Stocktake",
        header: {
            'Accept': 'application/json'
        }
    });

    //Get data from Server and store it in the items state. Only run on initial render
    useEffect(() => {
        client.get('?limit=1000')
            .then((response) => {
                console.log(response.data.list);
                setItems(response.data.list);

                setFilteredList(items);
            });

    }, [])

    // Initialize pagination state from the URL query parameter (?page=)
    const [pageParams, setPageParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = React.useState(initialPage);
    const cardPerPage = 16
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setPageParams({ page: newPage, query: searchString });
    };

    useEffect(() => {

        if (!pageParams.get("page")) {
            //Reset page number when entering this page without page URL parameter
            navigate("/search?page=1");
            window.location.reload();
        }

    }, [pageParams])

    // Create a new array, filteredList, using the array filter function to filter the dummy data based on input.
    useEffect(() => {
        const list = items.filter((item) => {
            if (searchString === "") {
                return true;
            } else {
                return item.Product.Name.toLowerCase().includes(searchString);
            }
        });

        setFilteredList(list);
        setPage(parseInt(searchParams.get("page") || "1", 10));
    }, [items, searchString]);

    const DataForEachPage = filteredList.slice(
        (page - 1) * cardPerPage,
        page * cardPerPage
    )
    // Display the filtered product list.
    return (
        <div style={{
            margin: '100px',
            display: 'flex',
            justifyContent: 'center'
        }
        }>
            <Stack direction="row" spacing={2} >
                <Box margin={10} width={'80vw'} maxWidth={800} >

                    < Grid container spacing={3} margin={2} >
                        {
                            DataForEachPage.map((s) => (
                                <Grid size={3} key={s.ItemId} sx={{ display: 'flex' }} >
                                    <Card sx={{ flex: 1 }}>
                                        <CardActionArea component={Link} to={'/products/' + s.ItemId}>
                                            <CardMedia
                                                component="img"
                                                image={ItemImg}
                                                alt="item image"
                                                sx={{
                                                    height: '120px',
                                                }}
                                            />
                                            < CardContent >
                                                <Typography gutterBottom variant="p" component="div" >
                                                    {s.Product.Name}
                                                </Typography>
                                                < Typography variant="body2" sx={{ color: 'text.secondary', }}>
                                                    {s.Source.SourceName}
                                                </Typography>
                                                < Typography gutterBottom variant="p" component="div"
                                                    sx={{ fontWeight: "bold", paddingTop: '10px', fontSize: "15px" }}>
                                                    ${s.Price}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                    <Pagination
                        count={Math.ceil(filteredList.length / cardPerPage)}
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
    );
}

export default SearchResult;
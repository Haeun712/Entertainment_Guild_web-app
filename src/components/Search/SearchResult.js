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
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";



const SearchResult = () => {
    const location = useLocation();
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
            });

            setFilteredList(items);
    }, [])

    const [page, setPage] = React.useState(1);
    const cardPerPage = 16

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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
// src/components/Admins/Product/ProductsAdmin.js
// Component to display the admin products page with a list of products and pagination
// It fetches product data from the Product DB and displays it in a paginated table format


import { useState, useEffect } from "react";
import axios from "axios";
import {
    Button, Box, Table, TableContainer, TableRow, TableCell,
    TableHead, TableBody, Paper, Stack, Typography
} from "@mui/material";
import React from "react";
import Pagination from '@mui/material/Pagination';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050/Product",
        header: {
            'Accept': 'application/json'
        }
    });
    // Initialize pagination state from the URL query parameter (?page=)
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = React.useState(initialPage);
    const rowsPerPage = 50;
    const navigate = useNavigate();

    useEffect(() => {

        //Get data from Server and store it in the items state. Only run on initial render
        client.get('?limit=1000')
            .then((response) => {
                console.log(response.data.list);
                setProducts(response.data.list);
            });
    }, [])

    useEffect(() => {

        if (!searchParams.get("page")) {
            //Reset page number (session) state when entering this page
            sessionStorage.removeItem('page');
            navigate("/admin/products?page=1");
            window.location.reload();
        }

    }, [searchParams])


    // Update page number and sync it with the URL query
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setSearchParams({ page: newPage });
    };

    // save current page number to restore this page when returning from Detail page
    const savePage = () => {
        sessionStorage.setItem('page', page)
    }


    return (
        <div style={{
            margin: '40px',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Stack direction="row" spacing={2}>
                <Box margin={10} width={'80vw'} maxWidth={800}>
                    <h1>PRODUCTS</h1>
                    {/* Create New Product Button (In progress)  */}
                    <Button variant="contained"
                        component={Link}
                        to={"/admin/products/create"}
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
                        CREATE PRODUCT
                    </Button>
                    <TableContainer component={Paper} sx={{
                        borderRadius: '0',
                        border: '1px solid #282120'
                    }}>
                        <Table sx={{
                            borderCollapse: 'collapse',
                            'th': { fontWeight: 'bold', padding: '8px', backgroundColor: '#2821202D', border: '1px solid #2821206D' },
                            'td': { padding: '8px', border: '1px solid #2821203D' }
                        }} aria-label="products-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>LastUpdated</TableCell>
                                    <TableCell>LastUpdatedBy</TableCell>
                                    <TableCell>Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? products.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                    : products
                                ).map((p) => (
                                    <TableRow key={p.ID}>
                                        <TableCell>{p.ID}</TableCell>
                                        <TableCell>{p.Name}</TableCell>
                                        <TableCell>{p.Author}</TableCell>
                                        <TableCell>{p.LastUpdated ? new Date(p.LastUpdated).toISOString().split('T')[0] : "-"}</TableCell>
                                        <TableCell>{p.LastUpdatedBy}</TableCell>
                                        <TableCell sx={{ justifyContent: 'center', textAlign: 'center' }}>
                                            <Typography
                                                component={Link}
                                                to={"/admin/products/" + p.ID}
                                                onClick={savePage}
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

                    <Pagination
                        count={Math.ceil(products.length / rowsPerPage)}
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
}
export default Products;
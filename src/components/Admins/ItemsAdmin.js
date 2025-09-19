import { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField, Button, Box, Table, TableContainer, TableRow, TableCell,
    TableHead, TableBody, Paper, Stack,
} from "@mui/material";
import React from "react";
import TablePagination from '@mui/material/TablePagination';





const Items = () => {
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
    }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    return (
        <div style={{
            margin: '40px',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Stack direction="row" spacing={2}>
                <Box margin={10} width={'80vw'} maxWidth={800}>
                    <h2>ITEMS</h2>
                    <TableContainer component={Paper} sx={{
                        border: '1px solid #282120 ',
                        borderRadius: '0',
                    }}>
                        <Table sx={{
                            'th': { fontWeight: 'bold', padding: '12px', backgroundColor: '#2821202D'},
                            'td': { padding: '10px' }
                        }} aria-label="items-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item ID</TableCell>
                                    <TableCell>Product ID</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Source Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Stock Qty</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : items
                                ).map((i) => (
                                    <TableRow key={i.id}>
                                        <TableCell>{i.ItemId}</TableCell>
                                        <TableCell>{i.ProductId}</TableCell>
                                        <TableCell>{i.Product.Name}</TableCell>
                                        <TableCell>{i.Source.SourceName}</TableCell>
                                        <TableCell>{i.Price}</TableCell>
                                        <TableCell>{i.Quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        count={items.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
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
export default Items;
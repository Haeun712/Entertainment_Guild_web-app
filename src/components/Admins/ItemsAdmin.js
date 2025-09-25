import { useState, useEffect } from "react";
import axios from "axios";
import {
    Button, Box, Table, TableContainer, TableRow, TableCell,
    TableHead, TableBody, Paper, Stack,
} from "@mui/material";
import React from "react";
import TablePagination from '@mui/material/TablePagination';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Link} from 'react-router-dom';


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
                    <h1>ITEMS</h1>
                    <Button variant="contained"
                        href="/createItem"
                        sx={{
                            margin: '10px 0',
                            backgroundColor: '#282120',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            padding: '8px'
                        }}>
                        <AddCircleIcon sx={{width: '18px', marginRight: '5px'}}/>
                        CREATE NEW ITEM
                    </Button>
                    <TableContainer component={Paper} sx={{
                        borderRadius: '0',
                        border: '1px solid #282120'
                    }}>
                        <Table sx={{
                            borderCollapse: 'collapse',
                            'th': { fontWeight: 'bold', padding: '12px', backgroundColor: '#2821202D', border: '1px solid #2821206D'},
                            'td': { padding: '10px', border: '1px solid #2821203D' }
                        }} aria-label="items-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item ID</TableCell>
                                    <TableCell>Product ID</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Source Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Stock Qty</TableCell>
                                    <TableCell></TableCell>
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
                                        <TableCell>
                                            <Link to={"/" + i.ItemId}>View</Link>
                                        </TableCell>
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
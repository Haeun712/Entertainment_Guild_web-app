// src/components/Employees/ProductDetailEmpl.js
// Component to display detailed information about a specific product for employee users (view only)

import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const ViewProduct = () => {
    const navigate = useNavigate();

    const ID = useParams().ID;
    const [product, setProduct] = useState({});
    const [stocktake, setStocktake] = useState({});
    const [genre, setGenre] = useState({});
    const [subGenre, setSubGenre] = useState({});
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        }
    });
    const page = parseInt(sessionStorage.getItem('page') || '1', 10);

    useEffect(() => {
        //Get Selected Product's Data

        client.get('/Product/' + ID)
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



                        //Get Selected Product's Stocktake List
                        client.get('/Stocktake?where=(ProductId,eq,' + ID + ')&limit=1000')
                            .then((response) => {
                                console.log(response.data.list);
                                setStocktake(response.data.list);
                            })
                    })
            })
    }, []);


    return (
        <div style={{ padding: '40px' }}>
            <Button disableRipple onClick={() => navigate("/empl/products?page=" + page)} startIcon={<ArrowBackIcon />}
                sx={{
                    color: "Black",
                    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
                    borderColor: "#282120"
                }}>
                Back</Button>


            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h1>{product.Name}</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px' }}>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}
                    >Product ID: {product.ID}
                    </p>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Name: {product.Name}
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px' }}>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Author: {product.Author}
                    </p>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Published: {product.Published ? new Date(product.Published).toISOString().split('T')[0] : "-"}
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px' }}>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Genre: {genre.Name}
                    </p>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        Subgenre: {subGenre.Name}
                    </p>
                </div>
                <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                    Description: <br /><br />
                    {product.Description}
                </p>
                    <div style={{ paddingBottom: '16px', borderBottom: '1px solid #2821204D' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ display: 'block', flex: 1, padding: '16px 0', margin: '0' }}>
                                Stocktake List:
                            </p>
                        </div>
                        <TableContainer sx={{
                            borderRadius: '0',
                            border: '1px solid #282120'
                        }}>
                            <Table sx={{
                                borderCollapse: 'collapse',
                                'th': { fontWeight: 'bold', padding: '8px', backgroundColor: '#2821202D', border: '1px solid #2821206D' },
                                'td': { padding: '8px', border: '1px solid #2821203D' }
                            }} aria-label="stocktake-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Id</TableCell>
                                        <TableCell>Source Id</TableCell>
                                        <TableCell>Source Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Qty</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(stocktake && stocktake.length > 0 ? stocktake : []
                                    ).map((item) => (
                                        <TableRow key={item.ItemId}>
                                            <TableCell>{item.ItemId}</TableCell>
                                            <TableCell>{item.SourceId}</TableCell>
                                            <TableCell>{item.Source?.SourceName || "N/A"}</TableCell>
                                            <TableCell>${item.Price}</TableCell>
                                            <TableCell>{item.Quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: '20px' }}>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        LastUpdated: {product.LastUpdated ? new Date(product.LastUpdated).toISOString().split('T')[0] : "-"}
                    </p>
                    <p style={{ display: 'block', flex: 1, borderBottom: '1px solid #2821204D', padding: '16px 0', margin: '0' }}>
                        LastUpdatedBy: {product.LastUpdatedBy}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default ViewProduct
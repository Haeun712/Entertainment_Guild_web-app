import axios from 'axios';
import ItemImg from '../../assets/itemImg.svg';
import { useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const ItemDetail = () => {
    const navigate = useNavigate();
    
    const ItemId = useParams().ItemId;
    const [item, setItem] = useState({});
    const [product, setProduct] = useState({});
    const [subGenre, setSubGenre] = useState({});
    const client = axios.create({
        baseURL: "http://localhost:3001/api/inft3050",
        header: {
            'Accept': 'application/json'
        }
    });

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

                        const SubGenreId = productData.SubGenre;

                        if (ProductId <= 200) {
                            if (SubGenreId <= 11) {
                                client.get('/BookGenre/' + SubGenreId)
                                    .then((response) => {
                                        setSubGenre(response.data)
                                    })
                            }
                            else {
                                client.get('/BookGenre new/' + SubGenreId)
                                    .then((response) => {
                                        setSubGenre(response.data)
                                    })
                            }
                        }
                        else if (ProductId <= 300) {
                                client.get('/MovieGenre/' + SubGenreId)
                                    .then((response) => {
                                        setSubGenre(response.data)
                                    })
                        }
                        else {
                            client.get('/GameGenre/'+ SubGenreId)
                            .then ((response) => {
                                setSubGenre(response.data)
                            })
                        }
                    })
            })
    }, []);
    return (
        <div  style={{padding: '40px'}}>
            <Button disableRipple onClick={() => navigate(-1)}startIcon={<ArrowBackIcon />}
                sx={{color: "Black", 
                    "&:hover": {backgroundColor: "transparent", textDecoration: "underline"},
                    borderColor: "#282120"}}>
                        Go Back</Button>
        
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems:"flex-start" }}>
            
            <img src={ItemImg} alt="item image" style={{ flex: '1 1 50%', maxWidth: '500px', display: 'block', marginTop: '30px', marginRight:'40px'}} />
            <div style={{flex: '1 1 50%', borderLeft: '1px solid #282120 ', paddingLeft: '40px'}}>
                <p style={{marginBottom: '0'}}><i>{subGenre.Name}</i></p>
                <h1 style={{marginTop: '0'}}>{product.Name}</h1>
                <p style={{fontSize: '18px'}}>{product.Author}</p>
                <h2 style={{fontSize: '25px'}}>${item.Price}</h2>
                
            
            <p style={{marginBottom: "5px"}}>Published: {product.Published ? new Date(product.Published).toISOString().split('T')[0] : "-"}</p>
            <p style={{marginTop: "0px"}}>Source: {item.Source?.SourceName || "-"}</p>
            <p style={{marginTop: "40px"}}>{product.Description}</p>
            {/* not working */}
            {/* Add Item into Order (Cart) */}
            <Button variant="contained"
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
            </div>
            
        </div>
        </div>
    )
}

export default ItemDetail
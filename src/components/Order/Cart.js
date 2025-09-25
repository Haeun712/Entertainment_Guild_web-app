import { Box, Button } from "@mui/material";

const Cart = () => {
    return (
        <Box margin={10} width={'80vw'} maxWidth={800}>
                    <h1>CARTS</h1>
                    {/* List of items/products in the order (cart)*/}
                    {/* in progress */}
                    <div style={{display: 'flex', gap: '60px'
                    }}>
                        <h4>Total:</h4>
                        <h3>$ 0</h3>
                    </div>
                    <Button variant="contained"
                        href="/order"
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
                        PROCEED TO CHECKOUT
                    </Button>
        </Box>
    );
}

export default Cart
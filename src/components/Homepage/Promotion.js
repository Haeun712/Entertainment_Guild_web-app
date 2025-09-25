import PromotionImg from '../../assets/Promotion_image.jpg';
import Button from '@mui/material/Button';

const Promotion = () => {
  return (
    /* Promotion section */
    <div className="promotion" style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 90%), url(' + PromotionImg + ')', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgourndRepeat: 'no-repeat', 
        height: '650px',
        justifyContent: 'center',
        marginTop: '-32px'}}>

        {/* Promotion text */}
        <div className='promotion-text'
         style={{paddingTop: '120px', width: '40%'}}>
            <h1 style={{fontSize: '40px', marginLeft: '80px',color: "white", minWidth: '200px'}}>Bestseller Just In!</h1>
            <p style={{fontSize: '24px', marginTop: '10px', marginLeft: '80px',color: "white", maxWidth: '300px', minWidth: '200px'}}>Don't miss your chance to own this must-read.</p>
        </div>

        {/* Promotion button */}
        <Button variant="contained" 
        href="/books" 
        sx={{ 
            backgroundColor: '#FAD25B', 
            color: '#282120',
            fontWeight: 'bold',
            fontSize: '20px',
            width: '150px',
            height: '50px',
            marginTop: '20px',
            marginLeft: '80px'}}>
        Buy Now
        </Button>

    </div>
    );
}

export default Promotion;
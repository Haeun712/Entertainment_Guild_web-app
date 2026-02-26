// src/components/Homepage/Hero.js
// Component to display the hero section on the homepage

import HeroImg from '../../assets/Hero_image.png';

const Hero = () => {
  return (
    /* Hero section */
    <div className="hero" style={{
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 90%),url(' + HeroImg + ')', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgourndRepeat: 'no-repeat', 
        height: '650px',
        justifyContent: 'center',}}>

        {/* Hero text */}
        <div className='hero-text' style={{paddingTop: '120px', marginLeft: '80px', width: '40%', maxWidth: '400px',color: 'white'}}>
            <p style={{fontSize: '32px', margin: 0, }}>Welcome!</p>
            <h1 style={{fontSize: '40px', marginTop: '8px', minWidth: '270px'}}>Step into Entertainment Guild</h1>
            <p style={{fontSize: '24px', marginTop: '8px', minWidth: '200px'}}> Explore amazing stories and unforgettable adventures</p>
        </div>
    </div>
    );
}

export default Hero;
import HeroImg from '../assets/Hero_image.png';

const Hero = () => {
  return (
    /* Hero section */
    <div className="hero" style={{
        backgroundImage: 'url(' + HeroImg + ')', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgourndRepeat: 'no-repeat', 
        height: '600px',
        justifyContent: 'center',}}>

        {/* Hero text */}
        <div className='hero-text' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '60px', color: '#282120'}}>
            <h1 style={{fontSize: '48px', margin: 0}}>Welcome to Entertainment Guild</h1>
            <p style={{fontSize: '24px', marginTop: '8px'}}> Let's dive into amazing stories and adventures together</p>
        </div>
    </div>
    );
}

export default Hero;
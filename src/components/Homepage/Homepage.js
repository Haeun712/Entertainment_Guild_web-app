import Hero from './Hero';
import Promotion from './Promotion';
import HomepageCards from './HomepageCards';
import Footer from '../Footer'

const Homepage = () => {
    return (
      <div>
        <Hero />
        <Promotion />
        <HomepageCards />
      <Footer />
      </div>
    );
}   

export default Homepage;
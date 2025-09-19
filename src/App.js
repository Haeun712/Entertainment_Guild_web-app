import './App.css';
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes, Route, useLocation
} from 'react-router-dom';
import ItemsAdmin from './components/Admins/ItemsAdmin';
import Patrons from './components/Admins/Patrons';
import Users from './components/Admins/Users';
import HomepageAdmin from './components/Admins/HomepageAdmin'
import Games from './components/Products/Games';
import Movies from './components/Products/Movies';
import Books from './components/Products/Books';
import Search from './components/Search/Search';
import Homepage from './components/Homepage/Homepage';
import NavbarAdmin from './components/Admins/NavbarAdmin';
import Products from './components/Products/Products';
import ItemDetail from './components/Products/ItemDetail';

//temporary function for separate navbar for common and admin only
function NavbarTem() {
  const location = useLocation();
  const path = location.pathname;
  if (path.startsWith('/admin')
    || path.startsWith('/items')
    || path.startsWith('/patrons')
    || path.startsWith('/users')) {
    return <NavbarAdmin />
  }
  return <Navbar />
}

function App() {
  return (
    <div>
      <Router>
        <NavbarTem />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/games" element={<Games />} />
          <Route path="/products/movies" element={<Movies />} />
          <Route path="/products/books" element={<Books />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products/:ItemId" element={<ItemDetail />} />

          <Route path="/admin" element={<HomepageAdmin />} />
          <Route path="/items" element={<ItemsAdmin />} />
          <Route path="/patrons" element={<Patrons />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;

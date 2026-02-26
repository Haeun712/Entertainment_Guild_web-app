// src/App.js
// Main application component that sets up routing (including protected routing) and auth context providers
// set different navbars for admin, employee, and patron views

import './App.css';
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes, Route, useLocation
} from 'react-router-dom';
import ProductsAdmin from './components/Admins/Product/ProductsAdmin';
import Patrons from './components/Admins/Account/Patrons';
import Staffs from './components/Admins/Account/Staffs';
import HomepageAdmin from './components/Admins/HomepageAdmin'
import Games from './components/Products/Games';
import Movies from './components/Products/Movies';
import Books from './components/Products/Books';
import Search from './components/Search/Search';
import Homepage from './components/Homepage/Homepage';
import NavbarAdmin from './components/Admins/NavbarAdmin';
import Products from './components/Products/Products';
import ItemDetail from './components/Products/ItemDetail';
import Cart from './components/Order/Cart';
import Order from './components/Order/Order';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import ProductDetailAdmin from './components/Admins/Product/ProductDetailAdmin';
import EditProduct from './components/Admins/Product/editProduct';
import CreateProduct from './components/Admins/Product/createProduct';
import { AuthProvider } from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import { Box } from '@mui/material';
import CreateStaff from './components/Admins/Account/createStaff';
import StaffDetailAdmin from './components/Admins/Account/StaffDetailAdmin';
import EditStaff from './components/Admins/Account/editStaff';
import PatronDetailAdmin from './components/Admins/Account/PatronDetailAdmin';
import NavbarEmpl from './components/Employees/NavbarEmpl';
import HomepageEmpl from './components/Employees/HomepageEmpl';
import PatronsEmpl from './components/Employees/PatronsEmpl';
import PatronDetailEmpl from './components/Employees/PatronDetailEmpl';
import ProductsEmpl from './components/Employees/ProductsEmpl';
import ProductDetailEmpl from './components/Employees/ProductDetailEmpl';
import Profile from './components/Patrons/Profile';
import OrderHistory from './components/Patrons/OrderHistory';
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Box><Navbar /><Homepage /></Box>} />
            <Route path="/login" element={<Box><Navbar /><Login /></Box>} />
            <Route path="/forgotpassword" element={<Box><Navbar /><ForgotPassword /></Box>}/>
            <Route path="/resetpassword" element={<Box><Navbar /><ResetPassword /></Box>}/>
            <Route path="/register" element={<Box><Navbar /><Register /></Box>} />

            <Route path="/products" element={<Box><Navbar /><Products /></Box>} />
            <Route path="/products/games" element={<Box><Navbar /><Games /></Box>} />
            <Route path="/products/movies" element={<Box><Navbar /><Movies /></Box>} />
            <Route path="/products/books" element={<Box><Navbar /><Books /></Box>} />
            <Route path="/search" element={<Box><Navbar /><Search /></Box>} />
            <Route path="/products/:ItemId" element={<Box><Navbar /><ItemDetail /></Box>} />
            <Route path="/cart" element={<Box><Navbar /><Cart /></Box>} />
            <Route path="/order" element={<Box><Navbar /><Order /></Box>} />
            <Route path="/myprofile" element={<Box><Navbar /><Profile /></Box>} />
            <Route path="/myorders" element={<Box><Navbar /><OrderHistory /></Box>} />


            {/* Routes for homepage for 'admin' */}
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <HomepageAdmin />
                </Box>
              </ProtectedRoute>
            }
            />

            {/* Routes for product pages for 'admin' */}
            <Route path="/admin/products" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <ProductsAdmin />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/admin/products/create" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <CreateProduct />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/admin/products/:ID" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <ProductDetailAdmin />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/admin/products/:ID/edit" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <EditProduct />
                </Box>
              </ProtectedRoute>
            }
            />

            {/* Routes for account pages for 'admin' */}
            <Route path="/admin/patrons/:UserID" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <PatronDetailAdmin />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/admin/patrons" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <Patrons />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/admin/staffs" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <Staffs />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/admin/staffs/create" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <CreateStaff />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/admin/staffs/:UserID" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <StaffDetailAdmin />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/admin/staffs/:UserID/edit" element={
              <ProtectedRoute roles={['admin']}>
                <Box>
                  <NavbarAdmin />
                  <EditStaff />
                </Box>
              </ProtectedRoute>
            }
            />

            {/* Routes for Homepage for 'employee' */}
            <Route path="/empl" element={
              <ProtectedRoute roles={['employee']}>
                <Box>
                  <NavbarEmpl />
                  <HomepageEmpl />
                </Box>
              </ProtectedRoute>
            }
            />

            {/* Routes for account pages for 'employee' */}
            <Route path="/empl/patrons" element={
              <ProtectedRoute roles={['employee']}>
                <Box>
                  <NavbarEmpl />
                  <PatronsEmpl />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/empl/patrons/:UserID" element={
              <ProtectedRoute roles={['employee']}>
                <Box>
                  <NavbarEmpl />
                  <PatronDetailEmpl />
                </Box>
              </ProtectedRoute>
            }
            />

            {/* Routes for product pages for 'employee' */}
            <Route path="/empl/products" element={
              <ProtectedRoute roles={['employee']}>
                <Box>
                  <NavbarEmpl />
                  <ProductsEmpl />
                </Box>
              </ProtectedRoute>
            }
            />
            <Route path="/empl/products/:ID" element={
              <ProtectedRoute roles={['employee']}>
                <Box>
                  <NavbarEmpl />
                  <ProductDetailEmpl />
                </Box>
              </ProtectedRoute>
            }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div >
  );
}

export default App;

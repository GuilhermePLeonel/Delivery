import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/customer/Products';
import Checkout from './pages/customer/Checkout';
import Orders from './pages/customer/Orders';
import Details from './pages/customer/Details';
import Admin from './pages/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders/:id" element={ <Details /> } />
      <Route path="/customer/orders" element={ <Orders /> } />
      <Route path="/admin/manage" element={ <Admin /> } />
    </Routes>
  );
}
export default App;

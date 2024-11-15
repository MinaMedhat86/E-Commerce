import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Componants/Home/Home';
import Layout from './Componants/Layout/Layout';
import Profile from './Componants/Profile/Profile';
import Cart from './Componants/Cart/Cart';
import Products from './Componants/Products/Products';
import Notfound from './Componants/Notfound/Notfound';
import { AuthProvider } from './Componants/context/AuthContext';
import ProductDetail from './Componants/ProductDetails/ProductDetails';
import { CartProvider } from './Componants/context/CartContext';
import Checkout from './Componants/Checkout/Checkout';
import Login from './Componants/Login/Login';


// Define the router configuration type
const routers = createBrowserRouter([
  {path : "/" , element : <Login/>},
  {path : "*" , element : <Notfound/>},
  {
    path: "E-commerce",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <Products /> },
      {path : "productDetails/:id" , element : <ProductDetail/>},
      {path : "checkout" , element : <Checkout/>},
      { path: "*", element: <Notfound /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    
    <AuthProvider>
      <CartProvider>
      <RouterProvider router={routers} />
      </CartProvider>
    </AuthProvider>  );
}

export default App;


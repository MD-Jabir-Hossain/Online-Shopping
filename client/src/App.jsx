// App.jsx
import React from 'react';
import './app.css';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Feature from "./pages/Feature";
import Deals from "./pages/Deals";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from './context/CartContext'; 
import CartPage from './pages/CartPage';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductDetails from './pages/ProductDetails';
import AdminPanel from './pages/AdminPanel';
import AdminLoginPage from './pages/AdminLoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "features", element: <Feature /> },
      { path: "deals", element: <Deals /> },
      { path: "shop", element: <Shop /> },
      { path: "contact", element: <Contact /> },
      { path: "allProduct", element: <Shop /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "cart", element: <CartPage /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "admin/login", element: <AdminLoginPage /> },
      { path: "admin", element: <AdminPanel /> },

    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
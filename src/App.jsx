import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext.jsx';
import Layout from './components/Layout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const MenuPage = lazy(() => import('./pages/Menu.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const CartPage = lazy(() => import('./pages/Cart.jsx'));
const CheckoutPage = lazy(() => import('./pages/Checkout.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return <StoreProvider><BrowserRouter><Routes><Route element={<Layout/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/menu" element={<MenuPage/>}/>
    <Route path="/menu/:slug" element={<ProductDetail/>}/>
    <Route path="/cart" element={<CartPage/>}/>
    <Route path="/checkout" element={<CheckoutPage/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/gallery" element={<Gallery/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/order-success" element={<OrderSuccess/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Route></Routes></BrowserRouter></StoreProvider>;
}

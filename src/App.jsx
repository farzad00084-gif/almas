import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import MenuPage from './pages/Menu.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import CartPage from './pages/Cart.jsx';
import CheckoutPage from './pages/Checkout.jsx';
import About from './pages/About.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import NotFound from './pages/NotFound.jsx';

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

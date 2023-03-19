import "./App.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";
// Pages
import {Home, Contact, Login, Register, Reset, Admin} from "./pages";
// Components
import { Header, Footer } from "./components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";

function App() {
  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Reset" element={<Reset/>}/>
      <Route path="/admin/*" element={<AdminOnlyRoute><Admin/></AdminOnlyRoute>}/>
      <Route path="/product-details/:id" element={<ProductDetails/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout-details" element={<CheckoutDetails/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;

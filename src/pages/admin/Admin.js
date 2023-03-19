import React from 'react'
import styles from "./Admin.module.scss"
import {Routes, Route} from "react-router-dom";
import Navbar from "../../components/admin/navbar/Navbar";
import Home from "../home/Home";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Orders from "../../components/admin/orders/Orders";
const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home/>}/>
          <Route path="all-products" element={<ViewProducts/>}/>
          <Route path="add-products/:id" element={<AddProduct/>}/>
          <Route path="orders" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Admin
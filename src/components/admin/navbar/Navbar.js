import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { selectUserName } from '../../../redux/slice/authSlice';
import { NavLink } from 'react-router-dom';
import styles from "./Navbar.module.scss";
import { useSelector } from 'react-redux';

const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);
  console.log(userName);
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="fff"/>
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
            </li>
            <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
            </li>
            <li>
            <NavLink to="/admin/add-products/ADD" className={activeLink}>
              Add Products
            </NavLink>
            </li>
            <li>
            <NavLink to="/admin/orders" className={activeLink}>
              View Orders
            </NavLink>
            </li>
          
        </ul>
      </nav>
      
    </div>
  )
}

export default Navbar
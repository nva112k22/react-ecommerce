/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import styles from "./Header.module.scss";
import {FaShoppingCart, FaTimes, FaUserCircle} from "react-icons/fa";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import { toast } from 'react-toastify';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
import {useDispatch, useSelector} from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/slice/cartSlice';





const logo = (
    <div className={styles.logo}>
        <Link to="/">
            <h2>
                e<span>Shop</span>.
            </h2>
        </Link>
    </div>
);



const activeLink = ({isActive}) =>
    (isActive ? `${styles.active}` : "")


const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [scrollPage, setScrollPage] = useState(false);
    const navigate = useNavigate();
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }, [])
    const dispatch = useDispatch();

    const fixNavbar = () => {
        if(window.scrollY > 50) {
            setScrollPage(true);
        } else {
            setScrollPage(false);
        }
    };
    window.addEventListener("scroll", fixNavbar);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                // console.log(user);
                if(user.displayName == null) {
                    const u1 = user.email.substring(0, user.email.indexOf("@"));
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    setDisplayName(uName);
                } else {
                setDisplayName(user.displayName);
                }
                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userID: user.uid,
                }));
            } else {
                setDisplayName("");
                dispatch(REMOVE_ACTIVE_USER());
            }
        });
    }, [dispatch, displayName])
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    };
    const hideMenu = () => {
        setShowMenu(false)
    };
    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success("Logout successfully.");
            navigate("/");
          }).catch((error) => {
            toast.error(error.message);
          });
    };

    const cart = (
        <span className={styles.cart}>
        <Link to="/cart">
            Cart
            <FaShoppingCart size={20}/>
            <p>{cartTotalQuantity}</p>
        </Link>
    </span>
    );
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
            {logo}
            <nav className={showMenu ? `${styles["show-nav"]}`
            : `${styles["hide-nav"]}`}>
                <div className={
                    showMenu
                     ? `${styles["nav-wrapper"]} ${styles
                     ["show-nav-wrapper"]}`
                     : `${styles["nav-wrapper"]}`
                    }
                    onClick={hideMenu}
                     ></div>

                <ul onClick={hideMenu}>
                    <li className={styles["logo-mobile"]}>
                        {logo}
                        <FaTimes size={22} color="#fff" onClick={hideMenu}/>
                    </li>
                    <li>
                        <AdminOnlyLink>
                        <Link to="/admin/home">
                        <button className='--btn --btn-primary'>
                            Admin
                        </button>
                        </Link>
                        </AdminOnlyLink>
                    </li>
                    <li>
                        <NavLink to="/" className={activeLink}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={activeLink}>
                            Contact Us
                        </NavLink>
                    </li>
                </ul>
                <div className={styles["header-right"]}
                onClick={hideMenu}>
                    <span className={styles.links}>
                        <ShowOnLogout>
                        <NavLink to="/login" className={activeLink}>Login</NavLink>
                        </ShowOnLogout>
                        <ShowOnLogin>
                        <a href='#' style={{color: "#ff7722"}}>
                            <FaUserCircle size={16}/>
                            Hi, {displayName}
                        </a>
                        </ShowOnLogin>
                        <ShowOnLogin>
                        <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
                        </ShowOnLogin>
                       <ShowOnLogin>
                        <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
                        </ShowOnLogin>
                    </span>
                    {cart}
                </div>
            </nav>
            <div className={styles["menu-icon"]}>
                {cart}
                <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
            </div>
        </div>
    </header>
  )
}

export default Header
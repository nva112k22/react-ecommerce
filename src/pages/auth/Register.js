import React, { useState } from 'react';
import styles from "./auth.module.scss";
import registerIMG from "../../assets/register.png";
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/config";
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const registerUser = (e) => {
        e.preventDefault();
        if(password !== cPassword) {
            toast.error("Passwords do not match.")
        }
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    setIsLoading(false);
    toast.success("Registration Successful...")
    navigate("/login");
  })
  .catch((error) => {
    toast.error(error.message);
    setIsLoading(false)
    navigate("/register");
  });
    }
  return (
    <>
    {isLoading && <Loader/>}
  <section className={`container ${styles.auth}`}>
  <div className={styles.img}>
      <img src={registerIMG} alt="Register" width="400" />
  </div>
      <Card>
  <div className={styles.form}>
      <h2>Register</h2>
      <form onSubmit={registerUser}>
          <input 
          type="text"
          placeholder="Email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <input 
          type="password" 
          placeholder="Password" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <input 
          type="password" 
          placeholder="ConfirmPassword" 
          required
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
          />
          <button className='--btn --btn-primary --btn-block'>Register</button>
      </form>

      <span className={styles.register}>
          <p>Already an account?</p>
          <Link to="/login">Login</Link>
      </span>
  </div>
  </Card>
</section>
</>
  )
}

export default Register
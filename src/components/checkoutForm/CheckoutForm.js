import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.scss";
import CheckoutSummary from '../checkoutSummary/CheckoutSummary';
import spinnerImg from "../../assets/spinner.jpg";
import { toast } from 'react-toastify';
import Card from '../card/Card';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail, selectID } from '../../redux/slice/authSlice';
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { selectShippingAddress } from '../../redux/slice/checkoutSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userID = useSelector(selectID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  useEffect(() => {
    if(!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if(!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date()
    const date = today.toDateString()
    const time = today.toLocaleTimeString()
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createAt: Timestamp.now().toDate()
    }
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order Saved");
      navigate("/checkout-success");
    } catch(error) {
      toast.error(error.message);

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null)
    if(!stripe || !elements) {
      //stripe.js has not yet loaded.
      //Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);

    const confirmPayment = await stripe.confirmPayment({
      elements,
      confirmParams: {
        //Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/checkout-success",
      },
      redirect: "if_required",
    })
    .then((result) => {
      // ok - paymentIntent bad - error
      if (result.error) {
        toast.error(result.error.message)
        setMessage(result.error.message)
        return;
      }
      if (result.paymentIntent) {
        if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false)
            toast.success("Payment successful")
            saveOrder()
        }
      }
    });
    setIsLoading(false);
  }
  return (
    <section>
        <div className={`container ${styles.checkout}`}>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
              <div>
                <Card cardClass={styles.card}>
                    <CheckoutSummary/>
                </Card>
              </div>
              <div>
                <Card cardClass={`${styles.card} ${styles.pay}`}>
                  <h3>Stripe Checkout</h3>
                  <PaymentElement id={styles["payment-element"]}/>
                  <button 
                  disabled={isLoading || !stripe || !elements} 
                  id="submit"
                  className={styles.button}
                  >
                    <span id="button-text">
                      {isLoading ? (<img src={spinnerImg} alt="Loading..." style={{width: "20px"}}/>) : "Pay now"}
                    </span>
                  </button>
                  {message && <div id={styles["payment-message"]}>
                    {message}
                    </div>}
                </Card>
              </div>
          </form>
        </div>
    </section>
  );
}

export default CheckoutForm;
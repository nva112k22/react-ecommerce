import { doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import { CLEAR_CART } from '../../../redux/slice/cartSlice';
import Card from '../../card/Card';
import styles from "./ChangeOrderStatus.module.scss";

const ChangeOrderStatus = ({order, id}) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editOrder = (e, id) => {
    e.preventDefault()
    setIsLoading(true)

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createAt: order.createAt,
      editedAt: Timestamp.now().toDate(),
    }
    try {
      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      dispatch(CLEAR_CART());
      toast.success("Order Saved");
      navigate("/checkout-success");
    } catch(error) {
      toast.error(error.message);

    }
  }

  return (
    <>
      {isLoading && <loader/>}
      <div className={styles.status}>
      <Card cardClass={styles.card}>
        <h4>Update Status</h4>
        <form onSubmit={(e) => editOrder(e, id)}>
            <span>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="" disabled>-- Choose one</option>
                  <option value="Order Placed...">Order Placed...</option>
                  <option value="Processing...">Processing...</option>
                  <option value="Shipped...">Shipped...</option>
                  <option value="Delivered...">Delivered...</option>
                </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
        </form>
      </Card>
      </div>
    </>
  )
}

export default ChangeOrderStatus
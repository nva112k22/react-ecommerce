import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Checkout Succsessful</h2>
        <p>Thank you for your purchase</p>
        <br/>
        <Link to="/order-history">
          <button className='--btn --btn-primary'>
            <Link to="/order-history">View Order Status</Link>
          </button>
        </Link>
      </div>
    </section>
  )
}

export default CheckoutSuccess
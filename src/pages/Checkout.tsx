import { useEffect, useState } from "react";
import CartSummary from "../components/CartSummary";
import { useCartContext } from "../context/CartContext";
import { CartType } from "./Cart";


const Checkout: React.FC = () => {
   const { cartItems, reduceQuantity, increaseQuantity } = useCartContext();
     console.log(cartItems);
     const defaultTotal = cartItems.reduce((acc, item) => acc + item.total, 0);
     const [total, setTotal] = useState(defaultTotal);
     const cart: CartType = {
       quantity: cartItems.length,
       cartItems: cartItems,
     };

     useEffect(() => {
       setTotal(cartItems.reduce((acc, item) => acc + item.total, 0));
     }, [cartItems]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h5>Personal Details</h5>
            <div className="card p-4">
              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Full Name <span className="mandatory">*</span> </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Email Address <span className="mandatory">*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number <span className="mandatory">*</span></label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Shipping Address <span className="mandatory">*</span></label>
                   <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your shipping address"
                  />
                 
                </div>
              </form>
            </div>
          </div>
          <CartSummary subtotal={total} estotal={total} status={'2'} cart={cart} />
        </div>
      </div>
    </>
  );
};

export default Checkout;

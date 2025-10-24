import { useEffect, useState } from "react";
import CartSummary from "../components/CartSummary";
import { useCartContext } from "../context/CartContext";
import { CartType } from "./Cart";


export interface OrderType{
  customer: CustomerType;
  cart: CartType;
}

export interface CustomerType{
  fullname: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
}
const Checkout: React.FC = () => {
   const { cartItems } = useCartContext();
     const defaultTotal = cartItems.reduce((acc, item) => acc + item.total, 0);
     const [total, setTotal] = useState(defaultTotal);
     const cart: CartType = {
       quantity: cartItems.length,
       cartItems: cartItems,
     };

     const [customerInfo, setCustomerInfo] = useState({
      fullname:"",
      email:"",
      phoneNumber:"",
      deliveryAddress:""
     });

     const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      e.preventDefault();
      const {name, value} = e.target;
        setCustomerInfo((prev) => ({
          ...prev, [name]: value,
        }));

     }

     useEffect(() => {
       setTotal(cartItems.reduce((acc, item) => acc + item.total, 0));
        // const order: OrderType = {
        //   customer: customerInfo,
        //   cart: cart
        // }
     }, [cartItems, customerInfo]);
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
                      value={customerInfo.fullname}
                      onChange={handleChange}
                      name="fullname"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Email Address <span className="mandatory">*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number <span className="mandatory">*</span></label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={customerInfo.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Delivery Address <span className="mandatory">*</span></label>
                   <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your shipping address"
                    value={customerInfo.deliveryAddress}
                    onChange={handleChange}
                    name="deliveryAddress"
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

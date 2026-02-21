import { useEffect, useState } from "react";
import CartSummary from "../components/CartSummary";
import { useCartContext } from "../context/CartContext";
import { CartType } from "./Cart";
import { useApiMutation } from "../hooks/useApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";
// import { useNavigate } from "react-router-dom";

export interface OrderType {
  total: number;
  quantity: number;
  customer: CustomerType;
  cart: CartType;
}

export interface CustomerType {
  fullname: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
  region: string;
  city: string;
}
const Checkout: React.FC = () => {
  const { cartItems } = useCartContext();
  const defaultTotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [total, setTotal] = useState(defaultTotal);
  const cart: CartType = {
    quantity: cartItems.length,
    cartItems: cartItems,
  };
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
    region:"",
    city:"",
  });

  // const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //mutation to send post request
  const mutation = useApiMutation<{
    message: string;
    access_code: string;
    status: boolean;
    error?: string;
    reference: string;
  }>("/orders/processOrder", "POST", {
    onSuccess: (data) => {
      //create payment popup
      console.log("response from order");
      console.log(data);
      if (data.status) {

        const popup = new PaystackPop();
        popup.resumeTransaction(data.access_code, {
          onSuccess: () => {
            console.log(`payment successful: reference:${data.reference}`);
            navigate(`/success/${data.reference}`);
            // window.location.href = "/";
          },
          onCancel: () => {
            toast.error("Payment cancelled");
          }
        });

      } else {
        toast.error(data.error);
      }
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const validateCustomerInfo = (customerInfo: CustomerType) => {
    if (!customerInfo.fullname || !customerInfo.email || !customerInfo.phoneNumber || !customerInfo.deliveryAddress) {
      toast.error("Please fill all mandatory fields");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      toast.error("Please enter a valid email address");
      return false;
    } else if (!/^\d{10}$/.test(customerInfo.phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    return true;
  }

  const handlePay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Pay clicked");
    //prepare order data
    //validate customer info
    console.log(customerInfo);
    if (!validateCustomerInfo(customerInfo)) return;


    const order: OrderType = {
      total: total,
      quantity: cartQuantity,
      customer: customerInfo,
      cart: cart,
    };
    console.log(order);
    mutation.mutate(order);
    //send order details to backend

    // get payment gateway link
    //redirect user to payment portal
  };

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
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">
                    Full Name <span className="mandatory">*</span>{" "}
                  </label>
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
                  <label className="form-label">
                    Email Address <span className="mandatory">*</span>
                  </label>
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

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">
                    Phone Number <span className="mandatory">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={customerInfo.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">
                    Delivery Address <span className="mandatory">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your shipping address"
                    value={customerInfo.deliveryAddress}
                    onChange={handleChange}
                    name="deliveryAddress"
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Region</label>
                  <select id="region" className="form-select" name="region" value={customerInfo.region} onChange={handleChange}>
                    <option value="select">Select your region</option>
                    <option value="ahafo">Ahafo</option>
                    <option value="ashanti">Ashanti</option>
                    <option value="bono">Bono</option>
                    <option value="bono_east">Bono East</option>
                    <option value="central">Central</option>
                    <option value="eastern">Eastern</option>
                    <option value="greater_accra">Greater Accra</option>
                    <option value="northeast">North East</option>
                    <option value="northern">Northern</option>
                    <option value="oti">Oti</option>
                    <option value="savannah">Savannah</option>
                    <option value="upper_east">Upper East</option>
                    <option value="upper_west">Upper West</option>
                    <option value="volta">Volta</option>
                    <option value="western">Western</option>
                    <option value="western_north">Western North</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">City</label>
                  <input type="text" name="city" className="form-control" placeholder="City" value={customerInfo.city} onChange={handleChange} />
                </div>
              </div>

              <div className="mb-3">
                <button
                  type="button"
                  onClick={handlePay}
                  className="btn btn-success"
                  disabled={mutation.isPending ? true : false}
                >
                  {mutation.isPending ? (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                  ) : (
                    "Pay"
                  )}
                </button>
              </div>
            </div>
          </div>
          <CartSummary
            subtotal={total}
            estotal={total}
            status={"2"}
            cart={cart}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;

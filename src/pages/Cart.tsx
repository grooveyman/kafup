import { Trash2Icon } from "lucide-react";
import "../assets/css/cart.css";
import { CartItemType, useCartContext } from "../context/CartContext";
import { useState } from "react";
import CartSummary from "../components/CartSummary";

const Cart: React.FC = () => {
  const { cartItems, reduceQuantity, increaseQuantity } = useCartContext();
  console.log(cartItems);
  const defaultTotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const [total, setTotal] = useState(defaultTotal);
  const handleTotal = ({type, item}:{type:string, item:CartItemType}) => {
    if(type === "plus"){
      increaseQuantity(item);
  }else if (type === "minus"){
      reduceQuantity(item);   
  }

  setTotal(total + item.total);
}
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h6>Shopping Cart</h6>
            <div className="card cart-list">
              <div className="table-responsive">
                <table
                  className="table table-borderless table-hover"
                  style={{ background: "none" }}
                >
                  <thead className="">
                    <tr>
                      <th>Product Details</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                    {cartItems.length === 0 ? (
                      <p>Your cart is empty</p>
                    ) : (
                      cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex gap-3">
                              <img
                                src="/assets/images/kaftan.jpg"
                                height={50}
                                width={50}
                              />
                              <div className="prod-det">
                                <p className="prodname">{item.name}</p>
                                <p className="prod-var">{item.variations?.map(v=>v.size).join(",")}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex qty">
                              <button className="btn" onClick={()=>handleTotal({type:"minus",item:item})}>-</button>
                              <input type="number" className="form-control" value={item.quantity} />
                              <button className="btn" onClick={()=>handleTotal({type:"plus", item:item})}>+</button>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <p>{item.price}</p>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <p>{item.total.toFixed(2)}</p>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <p>
                                <Trash2Icon size={15} />
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <CartSummary subtotal={total} estotal={total} />
        </div>
      </div>
    </>
  );
};

export default Cart;

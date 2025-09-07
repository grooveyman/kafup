import React from "react";
import dummycart from "../assets/images/kaftan.jpg";
import "../assets/css/sidebar.css";
import { Trash } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartSidebarProps {
  show: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onDelete: (id: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  show,
  onClose,
  cartItems,
  onDelete,
}) => {
  const {cartItems:cartItems2} = useCartContext();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const navigate = useNavigate();

  console.log(cartItems2);
  return (
    <>
      {/* Backdrop */}
      {show && (
        <div className="offcanvas-backdrop fade show" onClick={onClose}></div>
      )}

      {/* Sidebar */}
      <div
        className={`offcanvas offcanvas-end ${show ? "show" : ""}`}
        tabIndex={-1}
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Shopping Cart</h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={onClose}
          ></button>
        </div>
        <hr />
        <div className="offcanvas-body">
          {cartItems2.length === 0 ? (
            <p>your cart is empty</p>
          ) : (
            <>
              {cartItems2.map((item) => (
                <>
                <div className="row mb-2" key={item.id}>
                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="prodcart-img">
                        <img src={dummycart} />
                      </div>
                      <div className="prodcart-details">
                        <div>{item.name}</div>
                        <div className="prodcart-price">
                          {" "}
                          <span>{item.quantity}x</span> ${item.price}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Trash
                        strokeWidth={1}
                        size={15}
                        onClick={() => onDelete(item.id)}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 prodcart-details"></div>
                </div>
                <hr/>
                </>
                
              ))}
            </>
          )}

          <div className="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>${total}</strong>
          </div>
          <button className="btn btn-info w-100 mt-3" onClick={() => navigate("/cart")}>View Cart</button>
          <button className="btn btn-primary w-100 mt-3">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

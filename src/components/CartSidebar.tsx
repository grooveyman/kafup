import React from "react";
import dummycart from "../assets/images/kaftan.jpg";
import "../assets/css/sidebar.css";

interface CartSidebarProps {
  show: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ show, onClose }) => {
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
          {/* Example cart items */}
          <div className="row mb-2">
            <div className="col-md-12 d-flex">
              <div className="prodcart-img">
                <img src={dummycart} />
              </div>
              <div className="prodcart-details">
                <div>Long-sleeved Men's Kaftan</div>
                <div className="prodcart-price"> <span>2x</span> $15</div>
              </div>
            </div>
            <div className="col-md-8 prodcart-details"></div>
          </div>
          <hr />
          <div className="row mb-2">
            <div className="col-md-12 d-flex">
              <div className="prodcart-img">
                <img src={dummycart} />
              </div>
              <div className="prodcart-details">
                <div>Long-sleeved Men's Kaftan</div>
                <div className="prodcart-price"> <span>2x</span> $15</div>
              </div>
            </div>
            <div className="col-md-8 prodcart-details"></div>
          </div>

          <hr />
          <div className="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>$35</strong>
          </div>
          <button className="btn btn-info w-100 mt-3">View Cart</button>
          <button className="btn btn-primary w-100 mt-3">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

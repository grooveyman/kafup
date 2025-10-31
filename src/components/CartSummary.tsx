import { useNavigate } from "react-router-dom";
import { ClipboardEditIcon } from "lucide-react";
import { CartType } from "../pages/Cart";

interface CartSummaryProps {
  subtotal: number;
  estotal: number;
  status: string;
  cart: CartType;
}
const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  estotal,
  status,
  cart,
}) => {
  const navigate = useNavigate();

  const handlePay = () => {
    const order = {

    }
  }
  return (
    <div className="col-md-4">
      <h6>Order Summary</h6>
      <div className="card order-summary p-4">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <tr>
              <td>Cart Subtotal</td>
              <td>${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <hr />
            </tr>
            <tr>
              <td>
                <span
                  style={{
                    backgroundColor: "transparent",
                    fontWeight: "bold",
                  }}
                >
                  Estimated Total
                </span>
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: "transparent",
                    fontWeight: "bold",
                  }}
                >
                  ${estotal.toFixed(2)}
                </span>
              </td>
            </tr>
            <tr>
              <hr />
            </tr>
          </table>
        </div>
        {status == "1" ? (
          <button
            className="btn btn-success"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        ) : (
          status == "2" ? (
            <>
            {/* <button
              className="btn btn-success"
              onClick={() => {}}
            >
              
              Pay Now
            </button> */}
          </>
          ):(
            cart?.quantity != 0 && 
          <>
            <button
              className="btn btn-success"
              onClick={() => navigate("/checkout")}
            >
              <ClipboardEditIcon size={18} className="mb-1" />
              Proceed
            </button>
          </>
        )
          )
          }
      </div>
    </div>
  );
};

export default CartSummary;

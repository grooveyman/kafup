interface CartSummaryProps{
    subtotal: number;
    estotal: number;
}
const CartSummary:React.FC <CartSummaryProps> = ({subtotal, estotal}) => {
    
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
              <button className="btn btn-success">Checkout</button>
            </div>
          </div>
    );
}

export default CartSummary;
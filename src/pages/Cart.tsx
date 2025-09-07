
import "../assets/css/cart.css";

const Cart:React.FC = () => {
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h6>Shopping Cart</h6>
                    <div className="card cart-list">
                        <div className="table-responsive">
                            <table className="table table-borderless table-hover" style={{"background":"none"}}>
                                <thead className="">
                                    <tr>
                                        <th>Product Details</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                    <tr>
                                        <td>picture</td>
                                        <td>23</td>
                                        <td>400</td>
                                        <td>9200</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                 <div className="col-md-4">
                    <h6>Order Summary</h6>
                    <div className="card order-summary">
                        
                    </div>
                 </div>
            </div>
        </div>
        </>
    );
}

export default Cart;
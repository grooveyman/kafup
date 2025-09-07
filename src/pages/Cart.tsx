
import { Trash2Icon } from "lucide-react";
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
                                        <td>
                                            <div className="d-flex gap-3">
                                                <img src="/assets/images/kaftan.jpg" height={50} width={50}/>
                                                <div className="prod-det">
                                                    <p className="prodname">Kaftan dress</p>
                                                    <p className="prod-var">Variations</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex qty">
                                                <button className="btn">-</button>
                                                <input type="number" className="form-control" />
                                                <button className="btn">+</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <p>300</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <p>6500</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <p><Trash2Icon size={15}/></p>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                 <div className="col-md-4">
                    <h6>Order Summary</h6>
                    <div className="card order-summary p-4">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover"> 
                               
                                <tr>
                                    <td>
                                        Cart Subtotal
                                    </td>
                                    <td>$90</td>
                                </tr>
                                <tr>
                                    <hr/>
                                </tr>
                                <tr>
                                    <td>
                                        <span style={{backgroundColor:"transparent", fontWeight:"bold"}}>Estimated Total</span>
                                    </td>
                                    <td>
                                        <span style={{backgroundColor:"transparent", fontWeight:"bold"}}>$40</span>
                                    </td>
                                </tr>
                                <tr>
                                    <hr/>
                                </tr>
                            </table>
                        </div>
                        <button className="btn btn-success">Checkout</button>
                    </div>
                 </div>
            </div>
        </div>
        </>
    );
}

export default Cart;
import { Eye, Heart, ShoppingCart } from "lucide-react";
import dummyimg from "../assets/images/kaftan.jpg";

const Product: React.FC = () => {
    return (
        <>
            <div className="prodcard card-body">
                <p className="text-end">Brand</p>
                <div className="row prodcontent">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-center">
                            <img src={dummyimg} className="img-fluid align-item-center" />
                        </div>

                        <h6 className="text-center pt-1">Apple MacBook Air 2020</h6>
                        <p>RAM 16.0 GB | Memory 512 GB | Silver Keyboard layout (Eng)</p>
                        <p className="price">$999.9</p>
                        <div className="actions d-flex justify-content-center">
                            <div><ShoppingCart /></div>
                            <div><Heart /></div>
                            <div><Eye /></div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Product;
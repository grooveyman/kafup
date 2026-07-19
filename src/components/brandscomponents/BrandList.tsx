import { HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../pages/Home";


interface ListProps{
    list: Product[]
}

const BrandList: React.FC<ListProps> = ({ list }) => {
    const navigate = useNavigate();

    return (
        <>
        {list?.map((product) => (
            <div
                className="mb-3 col-md-12 col-sm-12 col-lg-6 col-xs-12 col-xxl-4 col-xl-4"

                key={product.id}
            >
                <div className="product" >
                    <img src={product.previewimg} width={"100%"} height={"100%"} onClick={() => navigate("/details/" + product.id)} />
                    <div className="like-btn"><HeartIcon /></div>
                </div>
                <div className="shop-prod-desc mt-2">
                    <h6>{product.name}</h6>
                    <p>
                        <span>GHS</span>
                        {product.price ?? "$40"}
                    </p>
                </div>
                <div className="shop-desc-cat">
                    <p>Category</p>
                    <button className="mt-2 btn btn-primary btn-sm">Add to Cart</button>
                </div>
            </div>
            ))
        }
        </>
    );
};

export default BrandList;
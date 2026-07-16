import { HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../pages/Home";


interface ListItems {
    id: number | string;
    previewimg: string;
    name: string;
    price: string | number;
    categories: string;
}

interface ListProps {
    list: Product[]
}

const ListContainer: React.FC<ListProps> = ({ list }) => {
    const navigate = useNavigate();

    return (
        <>
            {list?.map((product) => (
                <div
                    className="mb-3 col-md-6 col-sm-12 col-lg-4 col-xs-12 col-xxl-3 col-xl-3"

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
                    <p>{product.designer.brand_name}</p>
                        <div>
                            <span className="badge bg-secondary text-decoration-none">
                                {product.categories?.name}
                            </span>
                        </div>

                        
                        <button className="mt-2 btn btn-primary btn-sm">Add to Cart</button>
                    </div>
                </div>
            ))
            }
        </>
    );
};

export default ListContainer;
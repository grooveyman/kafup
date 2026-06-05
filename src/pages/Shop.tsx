import { useNavigate, useParams } from "react-router-dom";
import { Product } from "./Home";
import { useApiQuery } from "../hooks/useApi";
import SkeletonLoader from "../components/SkeletonLoader";
import EmptyPage from "../components/EmptyPage";
import "../assets/css/shop.css";
import Breadcrumb from "../components/Breadcrumb";
import { HeartIcon } from "lucide-react";

export interface Category {
  id: string;
  name: string;
}

const Shop: React.FC = () => {
  const { catalias } = useParams<{ catalias: string }>();
  console.log("Category alias:", catalias);
  const navigate = useNavigate();
  // fetch product

  const enpoint = `/designs/`;
  const { data, isLoading } = useApiQuery<Product[]>(
    ["productscat" + catalias],
    enpoint
  );

  console.log("Fetched data");
  console.log(data);

  return (
    <>
      <div className="container">
        <Breadcrumb crumbs={[{label:"Home", href:"/"}, {label:"Shop", href:""}]}/>
        <div className="row">
          {isLoading ? (
            <SkeletonLoader count={3} />
          ) : (
            !data || data.length === 0 ? (
              <>
                <div className="">
                  <EmptyPage />
                </div>
              </>
            ) : (
              data?.map((product) => (
                <div
                  className="mb-3 col-md-6 col-sm-6 col-lg-4 col-xs-12 col-xl-3"
                  
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
            )

          )}
        </div>
      </div>

    </>
  );
};

export default Shop;

import { useNavigate, useParams } from "react-router-dom";
import { Product } from "./Home";
import { useApiQuery } from "../hooks/useApi";
import SkeletonLoader from "../components/SkeletonLoader";

export interface Category{
    id: string;
    name: string;
}

const Categories: React.FC = () => {
  const { catalias } = useParams<{ catalias: string }>();
  console.log("Category alias:", catalias);
  const navigate = useNavigate();
  // fetch product

  const enpoint = catalias === "shop" ? "/products/": `/designs/catproduct/${catalias}`;
  const { data, isLoading } = useApiQuery<Product[]>(
    ["productscat"+catalias],
    enpoint
  );
  
  console.log("Fetched data");
  console.log(data);

  return (
    <>
    <div className="container">
        <div className="row">
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          data?.map((product) => (
            <div
              className="col-md-3"
              onClick={() => navigate("/details/" + product.id)}
              key={product.id}
            >
              <div className="product">
                <img src={product.previewimg} width={"100%"} height={"100%"} />
              </div>
              <div className="desc mt-2">
                <h6>{product.name}</h6>
                <p>{product.price ?? "$40"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
      
    </>
  );
};

export default Categories;

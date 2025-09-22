import "../assets/css/home.css";
import kaftan_img from "../assets/images/hero3.jpg";
import carousel2 from "../assets/images/hero2.jpg";
import carousel3 from "../assets/images/carousel 10.png";
import { useApiQuery } from "../hooks/useApi";
import SkeletonLoader from "../components/SkeletonLoader";
import { useNavigate } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  previewimg: string;
}

const Home: React.FC = () => {
  const { data, isLoading, isError } = useApiQuery<Product[]>(
    ["products"],
    "/products"
  );
  const navigate = useNavigate();
  if (isLoading) console.log("Loading products");
  if (isError) console.log("Error loading products");
  if (data) {
    console.log(data);
  }

  return (
    <>
      <div className="container">
        <div className="row"></div>

        <div className="row mt-3">
          <div className="col-md-2"></div>
          <div className="col-md-8 home-categories d-flex justify-content-center"></div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          {isLoading ? (
            <SkeletonLoader count={3} />
          ) : (
            data?.map((product) => (
              <div className="col-md-4" onClick={() => navigate("/details/"+product.id)} key={product.id}>
                <div className="product">
                  <img
                    src={product.previewimg}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <div className="desc mt-2">
                  <h6>{product.name}</h6>
                  <p>{product.price ?? "$40"}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mb-5 mt-3 d-flex justify-content-center">
          <button className="btn loadmorebtn">LOAD MORE</button>
        </div>
      </div>
    </>
  );
};

export default Home;

import { useNavigate, useParams } from "react-router-dom";
import { Product } from "./Home";
import { useApiQuery } from "../hooks/useApi";
import SkeletonLoader from "../components/SkeletonLoader";
import EmptyPage from "../components/EmptyPage";
import "../assets/css/shop.css";
import Breadcrumb from "../components/Breadcrumb";
import { HeartIcon } from "lucide-react";
import ListContainer from "../components/shopcomponents/ListContainer";

export interface Category {
  id: string;
  name: string;
}

const Shop: React.FC = () => {
  const { catalias } = useParams<{ catalias: string }>();
  console.log("Category alias:", catalias);
  const navigate = useNavigate();
  // fetch product

  const enpoint = `/designs?limit=20&offset=0`;
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
              <ListContainer list={data}  />
            )

          )}
        </div>
      </div>

    </>
  );
};

export default Shop;

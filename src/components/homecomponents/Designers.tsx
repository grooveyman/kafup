import "../../assets/css/designers.css";
import { useApiQuery } from "../../hooks/useApi";
import { useTruncate } from "../../hooks/useTrancate";
import EmptyPage from "../EmptyPage";
import SkeletonLoader from "../SkeletonLoader";

interface BrandsResponse {
  total: number;
  limit: number;
  results: TopBrandsType[];
}
interface TopBrandsMeta {
  likes: number;
  follows: number;
}
interface TopBrandsType {
  id: string;
  name: string;
  description: string;
  meta: TopBrandsMeta;
  image: string;
}

const Designers: React.FC = () => {

  const endpoint = `/brands`;
  const { isLoading, data } = useApiQuery<BrandsResponse>(['topbrands'], endpoint);
  
  return (
    <>
      <div className="row designers-profile mt-4">
        {isLoading && <SkeletonLoader />}
        {data && data.total !== 0 ? (
          data.results.map((brand) => (
            <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4" key={brand.id}>
              <div className="designers-card">
                <div className="designers-img">
                  <img src={brand.image === '' || brand.image == null ? `${import.meta.env.BASE_URL}assets/images/software%20dev.png` : brand.image} />
                </div>
                <div className="designers-text">
                  <div>
                    <span>{brand.meta.likes} likes {brand.meta.follows} follows</span>
                  </div>
                  <h5>{brand.name}</h5>
                  <p>
                    {useTruncate(brand.description, { words: 20 })}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyPage />
        )}
      </div>
    </>
  );
};

export default Designers;

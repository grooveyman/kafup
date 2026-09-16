
import { useEffect, useState } from "react";
import "../assets/css/designers.css";
import Breadcrumb from "../components/Breadcrumb";
import SearchField from "../components/SearchField";
import { TopThreeCard } from "../components/brandscomponents/TopThreeCard";
import { DataTable } from "../components/DataTable";
import { Pagination } from "@mui/material";
import { Award } from "lucide-react";
import { useApiQuery } from "../hooks/useApi";
import SkeletonLoader from "../components/SkeletonLoader";
import EmptyPage from "../components/EmptyPage";

import { useNavigate } from "react-router-dom";

interface BrandsResponseData {
  id: string;
  name: string;
  image: string;
  meta: { likes: number; follows: number; collections: number; designs: number; views: number; sold: number };
  points: number;
  rank: number;
  badges: { name: string; }[];
  
}

interface BrandsResponse {
  total: number;
  results: BrandsResponseData[];
}

const Brands: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const offset = (currentPage - 1) * itemsPerPage;
  //get brands
  const { isLoading, data: newdata } = useApiQuery<BrandsResponse>(['brands'], `/brands?limit=${itemsPerPage}&offset=${offset}`);
  console.log(!isLoading ? newdata : "");
  
  const rankedData =
    newdata?.results
      ?.filter(
        (item) =>
          item.points !== undefined &&
          item.points >= 1
      )
      ?.sort(
        (a, b) =>
          (a.rank ?? 0) - (b.rank ?? 0)
      ) ?? [];
      
  const topThreeBrands = rankedData.slice(0, 3);

  const totalPages = Math.ceil(
    (newdata?.total ?? 0) / itemsPerPage
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Brands", href: "/brands" }]} />
      </div>
      <div className="container-fluid brands-top">
        <div className="container">
          <div className="row d-flex justify-content-end">
            <div className="col-md-4 d-flex justify-content-end mb-4">
              <SearchField value={searchTerm} onChange={handleSearch} />
            </div>
            <div className="top-desc">
              <h3 className="">Top Designers</h3>
              <p>Designers are ranked based on their hardwork, dedication and resilience on Kafup. They gather points on many different criteria to boost their rank. \n Ranking is done weekly on accumulated points garnered by the designers. <a href="">See more</a> for our ranking criteria</p>
            </div>
          </div>

          {/* 1st 3 designers */}
          <div className="mt-5">
            {isLoading ? (
              <SkeletonLoader count={3} />
            ) : topThreeBrands.length === 0 ? (
              <EmptyPage title="No Top Designers Yet" message="Check back later to see who tops the charts!" />
            ) : (
              <div className="row d-flex justify-content-center flex-md-row flex-column gap-md-0 gap-4">
              {topThreeBrands.map((item, index) => {
                // Order for desktop: Rank 2 (index 1) -> order 1, Rank 1 (index 0) -> order 2, Rank 3 (index 2) -> order 3
                // Order for mobile: Rank 1 -> order 1, Rank 2 -> order 2, Rank 3 -> order 3
                let orderClass = "";
                if (index === 0) orderClass = "order-1 order-md-2";
                else if (index === 1) orderClass = "order-2 order-md-1";
                else if (index === 2) orderClass = "order-3 order-md-3";

                return (
                  <div className={`col-md-4 ${orderClass}`} key={item.id}>
                    <TopThreeCard 
                      name={item.name} 
                      meta={item.meta} 
                      badges={item.badges ? item.badges.map((b: any) => typeof b === 'string' ? b : b.name) : []} 
                      pts={item.points} 
                      rank={item.rank} 
                      image={item.image || `${import.meta.env.BASE_URL}assets/images/software dev.png`} 
                    />
                  </div>
                );
              })}
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Remaining designers */}
      <div className="container">
        <div className="mt-5">
          {rankedData.length === 0 && !isLoading ? (
            <EmptyPage title="No Rankings Available" message="There are currently no designers with ranking points." />
          ) : (
            <DataTable headings={["Rank", "Designer", "Sold", "Designs", "Badge", "Collections", "Points", "Actions"]} data={rankedData} renderRow={(item) => {
              return (
                <tr>
                  <td>{item.rank}</td>
                  <td>
                    <div className="d-flex justify-content-start gap-2 brandslist">
                      <div className="d-flex align-items-center">
                        {item.rank === 1 ? (<Award fill="gold" stroke="white" size={30} />) : (item.rank === 2 ? (<Award fill="silver" stroke="white" size={30} />) : (item.rank === 3 ? (<Award fill="#CD7F32" stroke="white" size={30} />) : ("")))}
                      </div>
                      <img src={`${item.image ?? import.meta.env.BASE_URL + 'assets/images/software dev.png'}`} className="" />
                      <p className="d-flex align-items-center"> {item.name}</p>
                    </div>
                  </td>
                  <td>{item.meta.likes}</td>
                  <td>{item.meta.designs}</td>
                  <td>
                    <div className="badge-container">
                      {item.badges.map((badge, idx) => (<span key={idx} className="brands-badge">{typeof badge === 'string' ? badge : badge.name}</span>))}
                    </div>
                  </td>
                  <td>
                    {item.meta.collections}
                  </td>
                  <td>{item.points}</td>
                  <td>
                    <button className="btn btn-primary-sm" onClick={() => {navigate(`profile/${item.name}/`)}}>View Profile</button>
                  </td>
                </tr>
              );
            }} />
          )}
        </div>

        <div className="row">
          <div className="d-flex justify-content-center">
            <Pagination count={totalPages} page={currentPage} onChange={(_, page) => setCurrentPage(page)} />
          </div>
        </div>
      

      </div>
    </>
  );
};

export default Brands;
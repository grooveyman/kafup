
import { useEffect, useState } from "react";
import "../assets/css/designers.css";
import Breadcrumb from "../components/Breadcrumb";
import SearchField from "../components/SearchField";
import { TopThreeCard } from "../components/brandscomponents/TopThreeCard";
import { DataTable } from "../components/DataTable";
import { Pagination } from "@mui/material";
import { Award } from "lucide-react";
import { useApiQuery } from "../hooks/useApi";

interface BrandsResponseData {
  id: string;
  name: string;
  image: string;
  meta: { likes: number; follows: number; collections: number; designs: number };
  points: number;
  rank: number;
  badges: { name: string; }[];
  
}

interface BrandsResponse {
  total: number;
  results: BrandsResponseData[];
}
const data = [
  {
    id: '3232',
    name: "Artist Design",
    image: `${import.meta.env.BASE_URL}assets/images/software dev.png`,
    rank: 6,
    pts: 2330,
    badges: [
      "Top Designer", "Designer"
    ],
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      sold: 54,
      designs: 41
    },
    categories: [{
      name: "Children"
    }]
  },
  {
    id: '764',
    name: "Artist Design",
    image: `${import.meta.env.BASE_URL}assets/images/software dev.png`,
    rank: 5,
    pts: 2330,
    badges: [
      "Top Designer", "Best Seller"
    ],
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      sold: 54,
      designs: 41
    },
    categories: [{
      name: "Children"
    }]
  },
  {
    id: '765',
    name: "Artist Design",
    image: `${import.meta.env.BASE_URL}assets/images/software dev.png`,
    rank: 4,
    pts: 2330,
    badges: [
      "Top Seller", "Designer"
    ],
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      sold: 54,
      designs: 41
    },
    categories: [{
      name: "Sons"
    }]
  },
  {
    id: '765',
    name: "Artist Design",
    image: `${import.meta.env.BASE_URL}assets/images/software dev.png`,
    rank: 2,
    pts: 2330,
    badges: [
      "Top Designer", "Designer"
    ],
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      sold: 54,
      designs: 41
    },
    categories: [{
      name: "Women"
    }]
  },
  {
    id: '3256',
    name: "Artist Design",
    image: `${import.meta.env.BASE_URL}assets/images/software dev.png`,
    rank: 1,
    pts: 2330,
    badges: [
      "Top Designer", "Designer"
    ],
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      sold: 54,
      designs: 41
    },
    categories: [{
      name: "Men"
    }]
  },
  {
    id: '2131',
    name: "Artist Design",
    image: `${import.meta.env.BASE_URL}assets/images/software dev.png`,
    rank: 3,
    pts: 2330,
    badges: [
      "Top Designer", "Designer"
    ],
    createdAt: '',
    meta: {
      likes: 32,
      views: 12,
      follows: 33,
      collections: 90,
      sold: 54,
      designs: 41
    },
    categories: [{
      name: "Children"
    }]
  }
];

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

  const totalPages = Math.ceil(
    (newdata?.total ?? 0) / itemsPerPage
  );



  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerHeight <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  });

  return (
    <>
      {/* <div className="designers"> */}
      <div className="container">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Brands", href: "/brands" }]} />
      </div>
      <div className="container-fluid brands-top">
        <div className="container">
          <div className="row d-flex justify-content-end">

            <div className="col-md-4 d-flex mb-5">
              <SearchField value={searchTerm} onChange={handleSearch} />
            </div>

            <div className="top-desc">
              <h3 className="">Top Designers</h3>
              <p>Designers are ranked based on their hardwork, dedication and resilience on Kafup. They gather points on many different criteria to boost their rank. \n Ranking is done weekly on accumulated points garnered by the designers. <a href="">See more</a> for our ranking criteria</p>
            </div>
          </div>

          {/* 1st 3 designers */}
          {/* <div className="row mt-3">

            {topthree.map((item) => (
              <div className="col-md-4">
                <TopThreeCard name={item.name} meta={item.meta} badges={item.badges} pts={item.pts} rank={item.rank} image={item.image} />
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Remaining designers */}
      <div className="container">
        <div className="section">
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
                    {item.badges.map((badge) => (<span className="brands-badge">{badge.name}</span>))}
                  </div>
                </td>
                <td>
                  {item.meta.collections}
                </td>
                <td>{item.points}</td>
                <td>
                  <button className="btn btn-primary-sm" onClick={() => {navigation.navigate(`profile/${item.name}/`)}}>View Profile</button>
                </td>
              </tr>
            );
          }} />
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

import { useEffect, useState } from "react";
import "../assets/css/designers.css";
import NavFilter from "../components/explorecomponents/NavFilter";
import EmptyPage from "../components/EmptyPage";
import BrandsCard from "../components/brandscomponents/BrandCard";
import Breadcrumb from "../components/Breadcrumb";
import SearchField from "../components/SearchField";
import { TopThreeCard } from "../components/brandscomponents/TopThreeCard";
import { DataTable } from "../components/DataTable";
import { Pagination } from "@mui/material";


const data = [
  {
    id: '3232',
    name: "Artist Design",
    image: "assets/images/software dev.png",
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
    image: "assets/images/software dev.png",
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
    image: "assets/images/software dev.png",
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
    image: "assets/images/software dev.png",
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
    image: "assets/images/software dev.png",
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
    image: "assets/images/software dev.png",
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

  const filters = [
    { id: "all", name: "All" },
    { id: "popular", name: "Popular" },
    { id: "new", name: "New" },
    { id: "toprated", name: "Top Rated" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 2;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = data.slice(startIndex, startIndex + itemsPerPage);


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
  })
  //get top three ranked
  const order = isMobile? [1,2,3] : [2, 1, 3];
  const topthree = data
    .filter((item) => item.rank !== undefined && item.rank >= 1 && item.rank <= 3)
    .sort((a, b) => order.indexOf(a.rank!) - order.indexOf(b.rank!));

  return (
    <>
      {/* <div className="designers"> */}
      <div className="container">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Brands", href: "/brands" }]} />
      </div>
      <div className="container-fluid brands-top">
        <div className="container">
          <div className="row d-flex justify-content-center">
          
            <div className="col-md-4 d-flex mb-5">
              <SearchField value={searchTerm} onChange={handleSearch} />
            </div>
          </div>

          {/* 1st 3 designers */}
          <div className="row mt-3">

            {topthree.map((item) => (
              <div className="col-md-4">
                <TopThreeCard name={item.name} meta={item.meta} badges={item.badges} pts={item.pts} rank={item.rank} image={item.image} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remaining designers */}
      <div className="container">
        <div className="section">
          <DataTable headings={["Rank", "Designer", "Sold", "Designs", "Badge", "Collections", "Points", "Actions"]} data={paginatedItems} renderRow={(item) => {
            return (
              <tr>
                <td>{item.rank}</td>
                <td>
                  <div className="d-flex justify-content-start gap-2 brandslist">
                    <img src={item.image} className="" />
                    <p className="d-flex align-items-center"> {item.name}</p>
                  </div>
                </td>
                <td>{item.meta.sold}</td>
                <td>{item.meta.designs}</td>
                <td>
                  <div className="badge-container">
                    {item.badges.map((item) => (
                      <span className="brands-badge">{item}</span>
                    ))}
                  </div>

                </td>
                <td>{item.meta.collections}</td>
                <td>{item.pts}</td>
                <td>
                  <button className="btn btn-primary-sm">View Profile</button>
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



      {/* </div> */}
    </>
  );
};

export default Brands;
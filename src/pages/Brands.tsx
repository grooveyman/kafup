
import { useEffect, useState } from "react";
import "../assets/css/designers.css";
import NavFilter from "../components/explorecomponents/NavFilter";
import EmptyPage from "../components/EmptyPage";
import BrandsCard from "../components/brandscomponents/BrandCard";
import Breadcrumb from "../components/Breadcrumb";
import SearchField from "../components/SearchField";
import { TopThreeCard } from "../components/brandscomponents/TopThreeCard";


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
      designs:41
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
      designs:41
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
      designs:41
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
      designs:41
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
      designs:41
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
    meta: {
      likes: 32,
      views: 12,
      follows: 33,
      collections: 90,
      sold: 54,
      designs:41
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
  const [selectedFilter, setSelectedFilter] = useState<string | number>("all");
  const [ items, setItems] = useState<any[]>([]);

  const filteredData = data.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedFilter === "all" || item.categories.some((category) => category.name === selectedFilter);
    return matchCategory && matchSearch;
  });




  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  //fetch on filter change
  useEffect(() => {
    // const data = fetchData(selectedFilter);
    setItems(data);
  }, [selectedFilter]);

  //get top three ranked
  const topthree = data
    .filter((item) => item.rank !== undefined && item.rank >= 1 && item.rank <= 3)
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));

  console.log(topthree);

  return (
    <>
      {/* <div className="designers"> */}
      <div className="container">
        <div className="row">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Brands", href: "/brands" }]} />
        </div>
        <div className="">
          <div className="row">
            {/* <div className="col-md-8">
              <NavFilter filters={filters} selectedFilter={selectedFilter} onChange={(id) => setSelectedFilter(id)} />
            </div> */}
            <div className="col-md-4">
              <SearchField value={searchTerm} onChange={handleSearch} />
            </div>
          </div>

          {/* 1st 3 designers */}
          <div className="row">

            {topthree.map((item) => (
              <div className="col-md-4">
                <TopThreeCard name={item.name} meta={item.meta} badges={item.badges} pts={item.pts} rank={item.rank} image={item.image}  />
              </div>
            ))}



          </div>
          <div className="row designers-profile mt-5">

            {filteredData.length == 0 && <EmptyPage />}
            {filteredData.map((designer) => {
              return (
                <BrandsCard name={designer.name} meta={{ follows: designer.meta.follows, collections: designer.meta.collections, sold: designer.meta.sold }} categories={designer.categories} cover_img={designer.image} brand_id={designer.id} />
              );
            })}
          </div>

        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Brands;
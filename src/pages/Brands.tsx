
import { useEffect, useState } from "react";
import "../assets/css/designers.css";
import NavFilter from "../components/explorecomponents/NavFilter";
import EmptyPage from "../components/EmptyPage";
import BrandsCard from "../components/brandscomponents/BrandCard";
import Breadcrumb from "../components/Breadcrumb";
import SearchField from "../components/SearchField";


const data = [
  {
    id: '3232',
    name: "Artist Design",
    image: "assets/images/software dev.png",
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      deliveries: 54
    },
    categories: [{
      name: "Children"
    }]
  },
  {
    id: '764',
    name: "Artist Design",
    image: "assets/images/software dev.png",
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      deliveries: 54
    },
    categories: [{
      name: "Children"
    }]
  },
  {
    id: '765',
    name: "Artist Design",
    image: "assets/images/software dev.png",
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      deliveries: 54
    },
    categories: [{
      name: "Sons"
    }]
  },
  {
    id: '765',
    name: "Artist Design",
    image: "assets/images/software dev.png",
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      deliveries: 54
    },
    categories: [{
      name: "Women"
    }]
  },
  {
    id: '3256',
    name: "Artist Design",
    image: "assets/images/software dev.png",
    meta: {
      likes: 32,
      views: 33,
      follows: 33,
      collections: 90,
      deliveries: 54
    },
    categories: [{
      name: "Men"
    }]
  },
  {
    id: '2131',
    name: "Artist Design",
    image: "assets/images/software dev.png",
    meta: {
      likes: 32,
      views: 12,
      follows: 33,
      collections: 90,
      deliveries: 54
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
  const [items, setItems] = useState<any[]>([]);

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

  return (
    <>
      {/* <div className="designers"> */}
      <div className="container">
        <div className="row">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Brands", href: "/brands" }]} />
        </div>
        <div className="">
          <div className="row">
            <div className="col-md-8">
              <NavFilter filters={filters} selectedFilter={selectedFilter} onChange={(id) => setSelectedFilter(id)} />
            </div>
            <div className="col-md-4">
              <SearchField value={searchTerm} onChange={handleSearch} />
            </div>
          </div>
          <div className="row designers-profile">

            {filteredData.length == 0 && <EmptyPage />}
            {filteredData.map((designer) => {
              return (
                <BrandsCard name={designer.name} meta={{ follows: designer.meta.follows, collections: designer.meta.collections, deliveries: designer.meta.deliveries }} categories={designer.categories} cover_img={designer.image} brand_id={designer.id} />
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
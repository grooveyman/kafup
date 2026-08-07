import { useParams } from "react-router-dom";
import { Product } from "./Home";
import { useApiQuery } from "../hooks/useApi";
import SkeletonLoader from "../components/SkeletonLoader";
import EmptyPage from "../components/EmptyPage";
import "../assets/css/shop.css";
import Breadcrumb from "../components/Breadcrumb";
import ListContainer from "../components/shopcomponents/ListContainer";
import NavFilter from "../components/explorecomponents/NavFilter";
import SearchField from "../components/SearchField";
import { useEffect, useState } from "react";
import PriceRangeFilter from "../components/shopcomponents/PriceRangeFilter";

export interface Category {
  id: string;
  name: string;
}

const filters = [
  { id: "all", name: "All" },
  { id: "popular", name: "Popular" },
  { id: "new", name: "New" },
  { id: "toprated", name: "Top Rated" }
];

const Shop: React.FC = () => {

  const [selectedFilter, setSelectedFilter] = useState<string | number>("all");
  const [searchKey, setSearchKey] = useState("");

  const { catalias } = useParams<{ catalias: string }>();
  console.log("Category alias:", catalias);
  // fetch product

  const enpoint = `/designs?limit=20&offset=0`;
  const { data, isLoading } = useApiQuery<Product[]>(
    ["productscat" + catalias],
    enpoint
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);


  console.log("Fetched data");
  console.log(data);
  const filteredData = data?.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchKey.toLowerCase());
    const matchFilter = selectedFilter === "all" || item.categories?.name === selectedFilter;
    const matchPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchFilter && matchSearch && matchPrice;
  });


  const handleSearch = (searchTerm: string) => {
    setSearchKey(searchTerm);
  };

  const handleSearchSubmit = () => {

  };

  //price filter



  return (
    <>
      <div className="container">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "" }]} />
        <div className="row">
          <hr />
          <div className="col-md-8">
            <NavFilter filters={filters} selectedFilter={selectedFilter} onChange={(id) => setSelectedFilter(id)} />
          </div>
          <div className="col-md-4">
            <SearchField value={searchKey} onChange={handleSearch} placeholder="Search Collection" onSearchSubmit={handleSearchSubmit} />
          </div>
          <div className="row">
            <div className="d-flex">
              <PriceRangeFilter min={0} max={1000} value={priceRange} onChange={setPriceRange} />
            </div>
          </div>
          <hr />
        </div>
        <div className="row">
          {isLoading ? (
            <SkeletonLoader count={3} />
          ) : (
            !filteredData || filteredData.length === 0 ? (
              <>
                <div className="">
                  <EmptyPage />
                </div>
              </>
            ) : (
              <ListContainer list={filteredData} />
            )

          )}
        </div>
      </div>

    </>
  );
};

export default Shop;

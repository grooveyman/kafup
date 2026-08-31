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
import PrimaryButton from "../components/PrimaryButton";
import { toast } from "react-toastify";

export interface Category {
  id: string;
  name: string;
}

export interface ProductResponse {
  results: Product[];
  total: number;
}
const filters = [
  { id: "all", name: "All" },
  { id: "popular", name: "Popular" },
  { id: "new", name: "New" },
  { id: "toprated", name: "Top Rated" }
];

const Shop: React.FC = () => {

  const [selectedFilters, setSelectedFilters] = useState<(string)[]>(["all"]);
  const [searchKey, setSearchKey] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 2;

  const [products, setProducts] = useState<Product[]>([]);

  const params = new URLSearchParams();

  params.set("limit", limit.toString());
  params.set("offset", offset.toString());

  if (!selectedFilters.includes("all")) {
    selectedFilters.forEach((filter) => {
      params.append("filter[]", filter);
    });
  }
  const endpoint = `/designs?${params.toString()}`;

  const { data, isLoading } = useApiQuery<ProductResponse>(
    ["productscat", selectedFilters.toString(), offset.toString()],
    endpoint
  );


  console.log(!isLoading ? data : "");

  // console.log("selected filters", selectedFilters.toString());
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);


  const filteredData = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchKey.toLowerCase());
    const matchPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchSearch && matchPrice;
  });


  const handleSearch = (searchTerm: string) => {
    setSearchKey(searchTerm);
  };

  const handleSearchSubmit = () => {
    console.log("Search to backend");
  };

  const handleFilterChange = (id: string) => {
    setOffset(0);
    setSelectedFilters((prev) => {

      if (id === "all") {
        return prev.includes("all") ? [] : ["all"];
      }
      //without all
      const withoutAll = prev.filter((filteredId) => filteredId !== "all");

      //remove if already selected
      if (withoutAll.includes(id)) {
        const updated = withoutAll.filter((filterId) => filterId !== id);
        //nothing selected, go back to all
        return updated.length === 0 ? ["all"] : updated;
      }


      return [...withoutAll, id];
    });
  }

  useEffect(() => {
    if (!data?.results) return;
    setProducts((prev) => {
      if (offset === 0) {
        return data.results;
      }
      return [...prev, ...data.results];
    });
  }, [data, offset]);


  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };


  return (
    <>
      <div className="container">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "" }]} />
        <div className="row">
          <hr />
          <div className="col-md-8">
            <NavFilter filters={filters} selectedFilters={selectedFilters} onChange={handleFilterChange} />
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
          {<div className="row">
            
            {filteredData.length === 0 && !isLoading ? (
              <EmptyPage />
            ) : (
              <ListContainer list={filteredData} />
            )}
          </div>}
        </div>

        {data && products.length < data.total && !isLoading && (
          <div className="row mt-5">
            <div className="d-flex justify-content-center">
              <PrimaryButton text="Load More" onClick={handleLoadMore} />
            </div>
          </div>
        )}

      </div>

    </>
  );
};

export default Shop;


import { useEffect, useState } from "react";
import "../assets/css/designers.css";
import NavFilter from "../components/explorecomponents/NavFilter";
import EmptyPage from "../components/EmptyPage";
import BrandsCard from "../components/brandscomponents/BrandCard";
import Breadcrumb from "../components/Breadcrumb";

const Brands: React.FC = () => {

  const filters = [
    { id: "all", name: "All" },
    { id: "popular", name: "Popular" },
    { id: "new", name: "New" },
    { id: "toprated", name: "Top Rated" }
  ];
  const [selectedFilter, setSelectedFilter] = useState<string | number>("all");
  const [items, setItems] = useState<any[]>([]);

  const fetchData = (filterKey: string | number) => {
    const designersData: any = {
      all: [
        {
          id: "3212sd",
          name: "Alice Klottey",
          meta: {
            likes: 5,
            follows: 10,
            collections: 23,
            deliveries: 98

          },
          image: "assets/images/hero3.jpg",
          caption: "First stop for kaftan, unisex. Men and women, materialize your imaginations. Find the most equisite here",
          categories: [
            { c_name: "Shirt" },
            { c_name: "Jorome" }
          ]
        },
        {
          id: "fsdw32fds",
          name: "Mercy Awortwe",
          meta: {
            likes: 5,
            follows: 10,
            collections: 23,
            deliveries: 33
          },

          image: "assets/images/hero2.jpg",
          caption: "A vibrant fashion designer for men's wear. All your men's fashion can be found here in our collections.",
          categories: [
            {
              c_name: "Jalabia"
            },
            { c_name: "Agbada" }
          ]
        },
        {
          id: "dss23ds",
          name: "Kelvin Ansah",
          meta: {
            likes: 5,
            follows: 10,
            deliveries: 32
          },
          image: "assets/images/hero1.jpg",
          caption: "A vibrant fashion designer for men's wear. All your men's fashion can be found here in our collections.",
          categories: [
            {
              c_name: "Jalabia"
            },
            { c_name: "Agbada" }
          ]
        },
        {
          id: "sdc23cs",
          name: "Mercy Awortwe",
          meta: {
            likes: 5,
            follows: 10,
            collections: 23,
            deliveries: 9
          },
          image: "assets/images/hero2.jpg",
          caption: "A vibrant fashion designer for men's wear. All your men's fashion can be found here in our collections.",
          categories: [
            { c_name: "Shirt" },
            { c_name: "Jorome" }
          ]
        }

      ]
    };
    return designersData[filterKey] || [];
  }



  //fetch on filter change
  useEffect(() => {
    const data = fetchData(selectedFilter);
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
            <NavFilter filters={filters} selectedFilter={selectedFilter} onChange={(id) => setSelectedFilter(id)} />
          </div>
          <div className="row designers-profile">

            {items.length == 0 && <EmptyPage />}
            {items.map((designer) => {
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

import { useEffect, useState } from "react";
import "../assets/css/designers.css";
import DesignerCard from "../components/designercomponents/DesignerCard";
import NavFilter from "../components/explorecomponents/NavFilter";
import EmptyPage from "../components/EmptyPage";

const Designers: React.FC = () => {

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
          id:"3212sd",
          name: "Alice Klottey",
          followers: "23K",
          likes: 45,
          products: 100,
          image: "assets/images/hero3.jpg",
          collections: 22,
          caption: "First stop for kaftan, unisex. Men and women, materialize your imaginations. Find the most equisite here",
          categories:[
            {c_name: "Shirt"},
            {c_name:"Jorome"}
          ]
        },
        {
          id: "fsdw32fds",
          name: "Mercy Awortwe",
          followers: "3K",
          likes: 5,
          products: 10,
          image: "assets/images/hero2.jpg",
          collections: 43,
          caption: "A vibrant fashion designer for men's wear. All your men's fashion can be found here in our collections.",
          categories:[
            {
              c_name: "Jalabia"
            },
            {c_name:"Agbada"}
          ]
        },
        {
          id:"dss23ds",
          name: "Kelvin Ansah",
          followers: "3K",
          likes: 52,
          products: 108,
          image: "assets/images/hero1.jpg",
          collections: 87,
          caption: "A vibrant fashion designer for men's wear. All your men's fashion can be found here in our collections.",
          categories:[
            {
              c_name: "Jalabia"
            },
            {c_name:"Agbada"}
          ]
        },
        {
          id:"sdc23cs",
          name: "Mercy Awortwe",
          followers: "3K",
          likes: 5,
          products: 10,
          image: "assets/images/hero2.jpg",
          collections: 43,
          caption: "A vibrant fashion designer for men's wear. All your men's fashion can be found here in our collections.",
          categories:[
            {c_name: "Shirt"},
            {c_name:"Jorome"}
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
          <div className="designers-content">
            <div className="row">
            <NavFilter filters={filters} selectedFilter={selectedFilter} onChange={(id) => setSelectedFilter(id)} />
          </div>
            <div className="row designers-profile">
              
              {items.length == 0 && <EmptyPage />}
              {items.map((designer) => {
                return (
                  <DesignerCard name={designer.name} meta={{ followers: designer.followers, collections: designer.collections, deliveries: designer.deliveries }} categories={designer.categories} profile_id={designer.id} dp_img={designer.image} />
                );
              })}
            </div>
            
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Designers;
import "../assets/css/home.css";

import { useApiQuery } from "../hooks/useApi";
import SkeletonLoader from "../components/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import { Box, Fade, Tab } from "@mui/material";
import { useState } from "react";
import { Variation } from "./admin/products/AddProduct";
import Vision from "../components/homecomponents/Vision";
import Designers from "../components/homecomponents/Designers";
import { Category } from "./Shop";
import HomeCollection from "../components/homecomponents/HomeCollection";
import PrimaryButton from "../components/PrimaryButton";
import EmptyPage from "../components/EmptyPage";
import { HeroSection } from "../components/homecomponents/HeroSection";
import { DesignerSignUp } from "../components/homecomponents/DesignerSignUp";
export interface Product {
  id: number;
  name: string;
  price: number;
  previewimg: string;
  prodimages?: ProdImage[];
  description?: string | undefined;
  variations?: Variation[];
  previewimg_format?: string;
  previewimg_height?: number;
  previewimg_width?: number;
  previewimg_public_id?: string;
  designer: DesignerType;
  categories?: Category;
  collections?: CollectionType;
}
export interface CollectionType {
  id: number;
  name: string;
  description: string;
  designer: DesignerType;
  meta: {
    views: number;
    likes: number;
    items: number;
  };
  collection_id: string;
}
export interface DesignerType {
  code: number;
  brand_name: string;
  profileImg: string;
}

interface ProdImage {
  id: string;
  imgurl: string;
  public_id: string;
}

const Home: React.FC = () => {
  const { data, isLoading, isError } = useApiQuery<Product[]>(
    ["products"],
    "/designs/?limit=8"
  );


  const {
    data: popularData,
    isLoading: isLoadingPopular,
    isError: isErrorPopular,
  } = useApiQuery<Product[]>(["popularproducts"], "/designs/popular?limit=8");
  console.log("Popular products");
  console.log(popularData);
  if (isErrorPopular) {
    console.log(`Error getting popular products`);
    console.log(popularData);
  }
  const [value, setValue] = useState("1");

  const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  if (isLoading) console.log("Loading products");
  if (isError) console.log(`Error loading products`);
  if (data) {
    console.log(data);
  }

  return (
    <>
      <div>
        <HeroSection />
      </div>

      <div className="container">
        <div className="row"></div>

        <div className="row mt-3">
          <div className="col-md-2"></div>
          <div className="col-md-8 home-categories d-flex justify-content-center"></div>
          <div className="col-md-2"></div>
        </div>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Recent Designs" value="1" />
              <Tab label="Popular Designs" value="2" />
            </TabList>
          </Box>
          {/* recent designs */}
          <Fade in={value === "1"} timeout={600} mountOnEnter unmountOnExit>
            <div>
              <TabPanel value="1">
                <div className="row">
                  {isLoading ? (
                    <SkeletonLoader count={3} />
                  ) : (
                    data?.map((product) => (
                      <div
                        className="col-md-3"
                        onClick={() => navigate("/details/" + product.id)}
                        key={product.id}
                      >
                        <div className="product">
                          <img
                            src={product.previewimg}
                            width={"100%"}
                            height={"100%"}
                          />
                        </div>
                        <div className="desc mt-2">
                          <h6>{product.name}</h6>
                          <p>{product.price ?? "$40"}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabPanel>
            </div>
          </Fade>

          {/* popular products */}
          <Fade in={value === "2"} timeout={600} mountOnEnter unmountOnExit>
            <div>
              <TabPanel value="2">
                <div className="row">
                  {isLoadingPopular ? (
                    <SkeletonLoader count={3} />
                  ) : isErrorPopular ? (
                    <>
                      <EmptyPage />
                    </>
                  ) : (
                    popularData?.map((product) => (
                      <div
                        className="col-md-3"
                        onClick={() => navigate("/details/" + product.id)}
                        key={product.id}
                      >
                        <div className="product">
                          <img
                            src={product.previewimg}
                            width={"100%"}
                            height={"100%"}
                          />
                        </div>
                        <div className="desc mt-2">
                          <h6>{product.name}</h6>
                          <p>{product.price ?? "$40"}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabPanel>
            </div>
          </Fade>


        </TabContext>
      </div>

      <div className="mt-5">
        <div className="container section">
          <HomeCollection />
        </div>

      </div>
      <div className="section">
        <div className="container-fluid designers inner-section">
          <div className="container">
            <div className="designers-content">
              <h3>Top Brands</h3>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                    quo, nihil vitae eaque ipsa magni enim repellendus ullam
                    cumque dolores deleniti inventore omnis.
                  </p>
                </div>
              </div>
              <Designers />
              <div className="d-flex justify-content-center mt-4">
                <PrimaryButton text="View All" onClick={() => { }} />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Vision section */}
      <div className="section">
        <Vision />
      </div>

      {/* <div className="">
        <DesignerSignUp />
      </div> */}
    </>
  );
};

export default Home;

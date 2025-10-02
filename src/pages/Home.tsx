import "../assets/css/home.css";

import { useApiQuery } from "../hooks/useApi";
import SkeletonLoader from "../components/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import { Box, Fade, Tab } from "@mui/material";
import { useState } from "react";
import EmptyPage from "../components/EmptyPage";
import { Variation } from "./admin/products/AddProduct";
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
}

interface ProdImage{
  id: string;
  imgurl: string;
  public_id:string;
}

const Home: React.FC = () => {
  const { data, isLoading, isError } = useApiQuery<Product[]>(
    ["products"],
    "/products"
  );

  const { data:popularData, isLoading:isLoadingPopular, isError:isErrorPopular } = useApiQuery<Product[]>(
    ["popularproducts"],
    "/products/popularProducts"
  );
  console.log("Popular products");
  console.log(popularData);
  if(isErrorPopular){
    console.log(`Error getting popular products`);
    console.log(popularData);
  }
  const [value, setValue] = useState("1");

  const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }
  const navigate = useNavigate();
  if (isLoading) console.log("Loading products");
  if (isError) console.log("Error loading products");
  if (data) {
    console.log(data);
  }

  return (
    <>
      <div className="container">
        <div className="row"></div>

        <div className="row mt-3">
          <div className="col-md-2"></div>
          <div className="col-md-8 home-categories d-flex justify-content-center"></div>
          <div className="col-md-2"></div>
        </div>

        <div className="row mb-4">
          <div className="col-md-8">
            <div className="hero-left" style={{ height: "470px" }}>
              <div
                id="carouselExample"
                className="carousel carousel-slide"
                data-bs-ride="carousel"
                style={{ height: "100%" }}
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="assets/images/hero2.jpg"
                      className="hero-img"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="assets/images/hero1.jpg"
                      className="hero-img"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="assets/images/herosec.webp"
                      className="hero-img"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="hero-btns d-block">
                <button className="btn btn-primary">Shop Now</button>
                <button className="btn btn-secondary">Sew Now</button>
              </div>
            </div>
          </div>
          {/* Exclusive Discount Section */}
          <div className="col-md-4">
            <div className="" style={{ height: "470px" }}>
              <div className="hero-right" style={{ height: "370px" }}>
                <img src="assets/images/carousel 8.png"/>
                <span className="ex-discount">Exclusive Discount</span>
              </div>
              <div className="mt-2">
              <h5>Big Lomo Unique Designed Kaftan</h5>
              <span><i><s>GHS 500.00</s></i> GHS 400.69 </span>
              <button className="btn btn-primary">Buy Now</button>
            </div>
            </div>
            
          </div>
        </div>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Recent Designs" value="1" />
              <Tab label="Popular Designs" value="2" />
              <Tab label="Assesories" value="3" />
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
              {(isLoadingPopular && isErrorPopular) ? (
            <SkeletonLoader count={3} />
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
          
          <Fade in={value === "3"} timeout={600} mountOnEnter unmountOnExit>
            <div>
              <TabPanel value="3">
            <div className="row">
              <EmptyPage />
            </div>
          </TabPanel>
            </div>
          </Fade>
          
        </TabContext>
      </div>
    </>
  );
};

export default Home;

import "../assets/css/home.css";
import kaftan_img from "../assets/images/hero3.jpg";
import carousel2 from "../assets/images/hero2.jpg";
import carousel3 from "../assets/images/carousel 10.png";

const Home: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          
        </div>

        <div className="row mt-3">
          <div className="col-md-2"></div>
          <div className="col-md-8 home-categories d-flex justify-content-center">
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
          
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
          
        </div>

        <div className="mb-5 mt-3 d-flex justify-content-center">
          <button className="btn loadmorebtn">LOAD MORE</button>
        </div>
        
      </div>
    </>
  );
};

export default Home;

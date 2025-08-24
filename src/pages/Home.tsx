import "../assets/css/home.css";
import kaftan_img from "../assets/images/hero3.jpg";
import carousel2 from "../assets/images/hero2.jpg";
import carousel3 from "../assets/images/carousel 10.png";

const Home: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="skeleton-back hero">
              <div
                id="carouselExampleSlidesOnly"
                className="carousel slide"
                data-bs-ride="carousel"
                style={{height:"100vh"}}
              >
                <div className="carousel-inner h-100">
                  <div className="carousel-item active h-100">
                    <img src={kaftan_img} className="d-block w-100 h-100 object-fit-cover" alt="..."/>
                  </div>
                  <div className="carousel-item">
                    <img src={carousel2} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={carousel3} className="d-block w-100" alt="..." />
                  </div>
                </div>
              </div>
              <div className="herobtns">
                <button className="placebtn">PLACE YOUR ORDER</button>
                <button className="sewbtn">SEW YOUR KAFTAN</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-2"></div>
          <div className="col-md-8 home-categories d-flex justify-content-center">
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product"></div>
            <div className="desc mt-2">
              <h6>Product Name</h6>
              <p>Price.</p>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6 left-ad"></div>
          <div className="col-md-6 right-ad"></div>
        </div>
        
        
      </div>
      {/* Parallax advert */}
      <div
        className="container-fluid parallax-container"
        style={{ backgroundColor: "rgba(67, 75, 86, 1);" }}
      >
        <div className="row section">
          <div className="col-md-12">
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

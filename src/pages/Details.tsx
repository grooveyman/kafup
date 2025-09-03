import { Star } from "lucide-react";
import Product from "../components/Product";
import dummyimg from "../assets/images/kaftan.jpg";
import dummyimg2 from "../assets/images/hero3.jpg";

const Details: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="row section">
          <div className="col-md-6">
            <div className="prodimage-container">
              <div
                id="carouselExampleSlidesOnly"
                className="carousel slide"
                data-bs-ride="carousel"
                style={{ height: "50vh" }}
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={dummyimg2} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={dummyimg2} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={dummyimg2} className="d-block w-100" alt="..." />
                  </div>

                  <button
                    className="carousel-control-prev custom-control"
                    type="button"
                    data-bs-target="#carouselExampleSlidesOnly"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next custom-control"
                    type="button"
                    data-bs-target="#carouselExampleSlidesOnly"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    >

                    </span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div style={{"margin":"0px 30px"}}>
              <div className="header d-flex">
                <div className="brand">
                  <p>
                    <span style={{ color: "grey" }}>Brand:</span>{" "}
                    <span>Apple</span>
                  </p>
                </div>
                <div style={{ paddingLeft: "50px" }}>
                  <Star fill="sea" strokeWidth={0} size={20} />
                  <Star fill="sea" strokeWidth={0} size={20} />
                  <Star strokeWidth={1} size={20} />
                  <Star strokeWidth={1} size={20} />
                  <Star strokeWidth={1} size={20} />
                </div>
                <p style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                  (1 review)
                </p>
              </div>
              <div className="prodname fs-3">Apple MacBook Pro 2019 | 16"</div>
              <p style={{ maxWidth: "50%", paddingTop: "20px" }}>
                RAM 16.0 GB | Memory 512 GB | Silver Keyboard layout (Eng)
              </p>
              <div className="price">
                <h1 className="fw-bold">$699.99</h1>
              </div>

              <span className="stock-status">In Stock</span>
              <hr style={{ color: "grey" }} />
              <div className="pt-2">
                <select className="select">
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-3">
                <button className="form-control btn btn-primary">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="section">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-12"></div>
            <div className="col-md-6 col-sm-6 col-12">
              <div className="row d-flex justify-content-between">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Related Products
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Write Your Review
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      All Reviews
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12"></div>
          </div>

          <div className="row">
            <div className="tab-content container" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
               
                <div className="row">
                  <div className="col-md-3 col-sm-6 col-12">
                    <Product />
                  </div>
                  <div className="col-md-3 col-sm-6 col-12">
                    <Product />
                  </div>
                  <div className="col-md-3 col-sm-6 col-12">
                    <Product />
                  </div>
                </div>

               
              </div>
              <div
                className="tab-pane fade "
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <div className="">
                      <div>
                        <label>Ratings</label>
                        <div>
                          <Star />
                          <Star />
                          <Star />
                          <Star />
                          <Star />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label>Comments</label>
                        <textarea
                          className="form-control selectform mt-2"
                          style={{ resize: "none" }}
                          rows={5}
                        ></textarea>
                      </div>
                      <button className="form-control btn btn-primary mt-3">
                        Submit
                      </button>
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                All Reviews
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Details;

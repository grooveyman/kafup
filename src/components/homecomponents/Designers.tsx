import "../../assets/css/designers.css";

const Designers: React.FC = () => {
  //get top brands
  const topbrands = {
    data:[
      {
        id:"32323-ds23-32",
        brand_name: "Senior Man's Brand",
        meta:{
          likes:23,
          follows:"6k",
          designs: "100",
          sold: "89"
        },
        pitch: "Lorem ipsum dolot sit amet consectetur adispising elit."
      }
    ]
  }
  return (
    <>


      <div className="row designers-profile">
        <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4">
          <div className="designers-card">
            <div className="designers-img">
              <img src="assets/images/software dev.png" />
            </div>
            <div className="designers-text">
              <div>
                <span>34 likes 1k follows</span>
              </div>
              <h5>Big Logo Dynamic Shirt</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
                natus cum eos provident eveniet facilis voluptate.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4">
          <div className="designers-card">
            <div className="designers-img">
              <img src="assets/images/software dev.png" />
            </div>
            <div className="designers-text">
              <div>
                <span>34 likes 1k follows</span>
              </div>
              <h5>Big Logo Dynamic Shirt</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
                natus cum eos provident eveniet facilis voluptate.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4">
          <div className="designers-card">
            <div className="designers-img">
              <img src="assets/images/software dev.png" />
            </div>
            <div className="designers-text">
              <div>
                <span>34 likes 1k follows</span>
              </div>
              <h5>Big Logo Dynamic Shirt</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
                natus cum eos provident eveniet facilis voluptate.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Designers;

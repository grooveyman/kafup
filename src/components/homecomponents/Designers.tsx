import "../../assets/css/designers.css";
import { useTruncate } from "../../hooks/useTrancate";

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
        pitch: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        id:"32323-ds23-32",
        brand_name: "Senior Man's Brand",
        meta:{
          likes:23,
          follows:"6k",
          designs: "100",
          sold: "89"
        },
        pitch: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.."
      },
      {
        id:"32323-ds23-32",
        brand_name: "Senior Man's Brand",
        meta:{
          likes:23,
          follows:"6k",
          designs: "100",
          sold: "89"
        },
        pitch: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..."
      }
    ]
  }
  return (
    <>


      <div className="row designers-profile">
        {topbrands.data.map((brand) => (
          <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4" key={brand.id}>
            <div className="designers-card">
              <div className="designers-img">
                <img src="assets/images/software dev.png" />
              </div>
            <div className="designers-text">
              <div>
                <span>{brand.meta.likes} likes {brand.meta.follows} follows</span>
              </div>
              <h5>{brand.brand_name}</h5>
              <p>
                {useTruncate(brand.pitch, { words: 20 })}
              </p>
            </div>
          </div>
        </div>
        ))}

      </div>
    </>
  );
};

export default Designers;

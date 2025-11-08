import "../../assets/css/designers.css";
import Designer from "./Designer";

const Designers: React.FC = () => {
  return (
    <>
      <div className="container-fluid designers">
        <div className="container">
          <div className="designers-content">
            <h3>Top Designers</h3>
            <div className="row">
              <div className="col-md-6">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  quo, nihil vitae eaque ipsa magni enim repellendus ullam
                  cumque dolores deleniti inventore omnis.
                </p>
              </div>
            </div>
            <div className="row designers-profile">
              <Designer />
              <Designer />
              <Designer/>
              <Designer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Designers;

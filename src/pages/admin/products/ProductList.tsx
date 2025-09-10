import { EditIcon, EyeIcon, Trash2Icon, View } from "lucide-react";
import Breadcrumb from "../../../components/BreadCrumb";
import { useApiQuery } from "../../../hooks/useApi";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  // const {data, isLoading, isError} = useApiQuery(["products"], "/products");
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="">
            <h5>Product List</h5>
            <div className="d-flex justify-content-between">
              <div>
                <Breadcrumb
                  crumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Product List", href: "/products" },
                  ]}
                />
              </div>
              <div className="">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate("/addproducts")}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card">
            <div className="table-responsive">
              <table
                className="table table-borderless table-hover"
                style={{ background: "none" }}
              >
                <thead className="">
                  <tr>
                    <th>Product Details</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                  <tr className="">
                    <td className="">
                      <div className="d-flex gap-3">
                        <img
                          src="/assets/images/kaftan.jpg"
                          height={50}
                          width={50}
                        />
                        <div className="prod-det">
                          <p className="prodname">Kaftan dress</p>
                          <p className="prod-var">Variations</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="prod-category">
                        <span className="table-card">Kaftan</span>
                        <span className="table-card">Men</span>
                      </p>
                    </td>
                    <td className="">
                      <p>233</p>
                    </td>

                    <td>
                      <div className="d-flex">
                        <p>300</p>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">
                        <p>6500</p>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">
                        <p className="prod-action-btn">
                          <EditIcon
                            className="prod-action-edit"
                            style={{ cursor: "pointer" }}
                            size={18}
                          />
                          <Trash2Icon
                            className="prod-action-del"
                            size={18}
                            style={{ cursor: "pointer" }}
                          />
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td className="">
                      <div className="d-flex gap-3">
                        <img
                          src="/assets/images/kaftan.jpg"
                          height={50}
                          width={50}
                        />
                        <div className="prod-det">
                          <p className="prodname">Kaftan dress</p>
                          <p className="prod-var">Variations</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="prod-category">
                        <span className="table-card">Kaftan</span>
                        <span className="table-card">Men</span>
                      </p>
                    </td>
                    <td className="">
                      <p>233</p>
                    </td>

                    <td>
                      <div className="d-flex">
                        <p>300</p>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">
                        <p>6500</p>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">
                        <p className="prod-action-btn">
                          <EditIcon
                            className="prod-action-edit"
                            style={{ cursor: "pointer" }}
                            size={18}
                          />
                          <Trash2Icon
                            className="prod-action-del"
                            size={18}
                            style={{ cursor: "pointer" }}
                          />
                        </p>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;

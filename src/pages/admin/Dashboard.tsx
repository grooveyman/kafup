import { BarChart } from "@mui/x-charts/BarChart";
import prodimg from "../../assets/images/hero2.jpg";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </nav>

        {/* overview */}
        <div className="row">
          <div className="col-md-3">
            <div className="card stats-card">
              <h5>Purchased products</h5>
              <h6>67</h6>
              <p>last amount: GHS 300</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card stats-card">
              <h5>Total Earnings</h5>
              <h6>GHS 4,320</h6>
              <p>last amount: GHS 300</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card stats-card">
              <h5>Completed Orders</h5>
              <h6>20</h6>
              <p>last amount: GHS 300</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card stats-card">
              <h5>New Orders</h5>
              <h6>67</h6>
              <p>last amount: GHS 300</p>
            </div>
          </div>
        </div>

        {/* graph */}
        <div className="row mt-3">
          <div className="col-md-8">
            <div className="card graph-card">
              <p>Purchases View</p>
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sept",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    label: "Month of the Year (2025)",
                  },
                ]}
                series={[
                  {
                    data: [2, 5, 3, 12, 5, 10, 22, 31, 50, 79, 23, 45],
                    label: "Amount Purchased (GHS)",
                  },
                ]}
                height={300}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <p>Customers</p>
              <div>
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>John</td>
                      <td>Doe</td>
                      <td>@social</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>John</td>
                      <td>Doe</td>
                      <td>@social</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>John</td>
                      <td>Doe</td>
                      <td>@social</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>John</td>
                      <td>Doe</td>
                      <td>@social</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>John</td>
                      <td>Doe</td>
                      <td>@social</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card bottom-card">
              <h5>Last Uploaded Product</h5>
              <img src={prodimg} height={"100%"} width={"100%"} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bottom-card">
              <h5>Recent Sales</h5>
              <div>
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>John</td>
                      <td>Doe</td>
                      <td>@social</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bottom-card">
              <h5>Customers</h5>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

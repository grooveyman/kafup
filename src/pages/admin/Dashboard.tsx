import { BarChart } from "@mui/x-charts/BarChart";

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
                    data: ["Jan", "Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
                    label:'Month of the Year (2025)'
                  },
                ]}
                series={[
                  {
                    data: [2, 5, 3,12, 5, 10, 22, 31, 50, 79, 23, 45],
                    label: 'Amount Purchased (GHS)'
                  },
                ]}
                height={300}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
                <p>Customers</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

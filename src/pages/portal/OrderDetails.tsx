import { Link, useParams } from "react-router-dom";
import { recentOrders } from "./orderData";
import "./Dashboard.css";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const order = recentOrders.find((item) => item.id.slice(1) === orderId);

  if (!order) {
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="alert alert-warning" role="alert">
              This order could not be found.
            </div>
            <Link to="/portal" className="btn btn-outline-dark">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <Link to="/portal" className="portal-order-back-link">
            Back to dashboard
          </Link>
          <section
            className="portal-orders-card portal-order-detail-card mt-3"
            aria-labelledby="order-details-title"
          >
            <header className="portal-order-detail-heading">
              <div>
                <p>Order details</p>
                <h1 id="order-details-title">{order.id}</h1>
              </div>
              <span
                className={`portal-status-badge ${
                  order.status === "Pending" ? "is-pending" : "is-completed"
                }`}
              >
                {order.status}
              </span>
            </header>
            <div className="row g-3 p-3 p-md-4">
              <div className="col-6">
                <div className="portal-order-detail-field">
                  <span>Date</span>
                  <strong>{order.date}</strong>
                </div>
              </div>
              <div className="col-6">
                <div className="portal-order-detail-field">
                  <span>Items</span>
                  <strong>{order.items}</strong>
                </div>
              </div>
              <div className="col-6">
                <div className="portal-order-detail-field">
                  <span>Status</span>
                  <strong>{order.status}</strong>
                </div>
              </div>
              <div className="col-6">
                <div className="portal-order-detail-field">
                  <span>Total</span>
                  <strong>{order.total}</strong>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

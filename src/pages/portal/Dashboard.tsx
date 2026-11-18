import { useState } from "react";
import { CircleCheck, Clock3, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { recentOrders } from "./orderData";
import "./Dashboard.css";

type OrderFilter = "all" | "pending" | "completed";

const pageSize = 8;

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [page, setPage] = useState(1);
  const pendingCount = recentOrders.filter(
    (order) => order.status === "Pending",
  ).length;
  const completedCount = recentOrders.length - pendingCount;
  const filteredOrders = recentOrders.filter((order) => {
    if (filter === "pending") return order.status === "Pending";
    if (filter === "completed") return order.status === "Completed";
    return true;
  });
  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const visibleOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const firstVisibleOrder = filteredOrders.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastVisibleOrder = Math.min(page * pageSize, filteredOrders.length);

  const selectFilter = (nextFilter: OrderFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  return (
    <div className="container">
      <div className="portal-dashboard">
        <section className="portal-order-summary row g-2" aria-label="Order summary">
          <div className="col-md-4">
            <article className="portal-stat-card py-3">
              <span className="portal-stat-icon" aria-hidden="true">
                <CircleCheck size={14} />
              </span>
              <div className="portal-stat-copy">
                <strong>{completedCount}</strong>
                <span>Completed Orders</span>
              </div>
            </article>
          </div>
          <div className="col-md-4">
            <article className="portal-stat-card py-3">
              <span className="portal-stat-icon" aria-hidden="true">
                <Clock3 size={14} />
              </span>
              <div className="portal-stat-copy">
                <strong>{pendingCount}</strong>
                <span>Pending Orders</span>
              </div>
            </article>
          </div>
          <div className="col-md-4">
            <article className="portal-stat-card py-3">
              <span className="portal-stat-icon" aria-hidden="true">
                <UserRound size={14} />
              </span>
              <div className="portal-stat-copy">
                <strong>{pendingCount}</strong>
                <span>Following</span>
              </div>
            </article>
          </div>
        </section>

        <section className="portal-orders-card" aria-labelledby="recent-orders-title">
          <header className="portal-orders-heading">
            <div>
              <div className="portal-orders-title-row">
                <h1 id="recent-orders-title">Recent orders</h1>
                <span className="portal-total-badge">{recentOrders.length} total</span>
              </div>
              <p>A clear view of your latest order activity.</p>
            </div>
            <button
              type="button"
              className="portal-view-all"
              onClick={() => selectFilter("all")}
            >
              View all
            </button>
          </header>

          <div className="portal-orders-controls">
            <div className="portal-order-tabs" role="tablist" aria-label="Filter orders">
              <button
                type="button"
                role="tab"
                aria-selected={filter === "all"}
                className={filter === "all" ? "is-active" : ""}
                onClick={() => selectFilter("all")}
              >
                All orders
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filter === "pending"}
                className={filter === "pending" ? "is-active" : ""}
                onClick={() => selectFilter("pending")}
              >
                Pending <span>{pendingCount}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filter === "completed"}
                className={filter === "completed" ? "is-active" : ""}
                onClick={() => selectFilter("completed")}
              >
                Completed <span>{completedCount}</span>
              </button>
            </div>
            <div className="portal-order-meta">
              <span>Latest first</span>
              <span>Example order data</span>
            </div>
          </div>

          <div className="portal-orders-table-wrap table-responsive">
            <table className="portal-orders-table table table-sm align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Date</th>
                  <th scope="col">Items</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((order) => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td>
                      <span
                        className={`portal-status-badge ${order.status === "Pending" ? "is-pending" : "is-completed"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{order.total}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-outline-dark portal-view-order-button"
                        to={`/portal/orders/${order.id.slice(1)}`}
                        aria-label={`View order ${order.id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className="portal-orders-pagination">
            <span>
              Showing {firstVisibleOrder}&ndash;{lastVisibleOrder} of{" "}
              {filteredOrders.length} orders
            </span>
            <div className="portal-pagination-actions">
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <button
                type="button"
                className="portal-next-page"
                onClick={() => setPage((currentPage) => currentPage + 1)}
                disabled={page === pageCount}
                aria-label="Next page of orders"
              >
                Next
              </button>
            </div>
          </footer>
        </section>

        <footer className="portal-dashboard-footer">
          <span>{pendingCount} orders are awaiting completion.</span>
          <span className="portal-support-label">Get support</span>
        </footer>
      </div>
    </div>

  );
};

export default Dashboard;

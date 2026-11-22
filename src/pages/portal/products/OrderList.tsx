import { useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "../../../components/DataTable";
import { recentOrders, type RecentOrder } from "../orderData";
import "../Dashboard.css";

type OrderFilter = "all" | "pending" | "completed";

const pageSize = 8;

const OrderList: React.FC = () => {
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pendingCount = recentOrders.filter(
    (order) => order.status === "Pending",
  ).length;
  const completedCount = recentOrders.length - pendingCount;
  const searchText = search.trim().toLowerCase();
  const filteredOrders = recentOrders.filter((order) => {
    const matchesStatus =
      filter === "all" ||
      (filter === "pending" && order.status === "Pending") ||
      (filter === "completed" && order.status === "Completed");
    const matchesSearch = [
      order.id,
      order.date,
      String(order.items),
      order.status,
      order.total,
    ].some((value) => value.toLowerCase().includes(searchText));

    return matchesStatus && matchesSearch;
  });
  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const visibleOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const firstVisibleOrder =
    filteredOrders.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastVisibleOrder = Math.min(page * pageSize, filteredOrders.length);

  const selectFilter = (nextFilter: OrderFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  return (
    <div className="container">
      <div className="portal-dashboard">
        <section className="portal-orders-card" aria-labelledby="orders-title">
          <header className="portal-orders-heading">
            <div>
              <div className="portal-orders-title-row">
                <h1 id="orders-title">Orders</h1>
                <span className="portal-total-badge">
                  {recentOrders.length} total
                </span>
              </div>
              <p>Review your order activity and status.</p>
            </div>
          </header>

          <div className="portal-orders-controls">
            <div
              className="portal-order-filter-row"
            >
              <div
                className="portal-order-tabs"
                role="tablist"
                aria-label="Filter orders"
              >
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
              <div>
                <input
                type="search"
                className="form-control"
                aria-label="Search orders"
                placeholder="Search orders"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
              </div>
            </div>
            <div className="portal-order-meta">
              <span>Latest first</span>
              <span>Example order data</span>
            </div>
          </div>

          {filteredOrders.length > 0 ? (
            <DataTable<RecentOrder>
              headings={["Order", "Date", "Items", "Status", "Total", "Action"]}
              data={visibleOrders}
              className="portal-orders-table table-sm mb-0"
              renderRow={(order) => (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>{order.date}</td>
                  <td>{order.items}</td>
                  <td>
                    <span
                      className={`portal-status-badge ${
                        order.status === "Pending"
                          ? "is-pending"
                          : "is-completed"
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
              )}
            />
          ) : (
            <p className="portal-orders-empty" role="status">
              No orders match your filters.
            </p>
          )}

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
      </div>
    </div>
  );
};

export default OrderList;
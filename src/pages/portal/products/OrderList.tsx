import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  CircleCheck,
  Clock3,
  Search,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "../../../components/DataTable";
import { recentOrders, type RecentOrder } from "../orderData";
import "../OrderDetails.css";
import "./OrderList.css";

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
    <main className="container portal-order-page portal-order-list-page py-4 py-lg-5">
      <header className="portal-order-list-page-header">
        <div>
          <span className="portal-detail-eyebrow">ACCOUNT ACTIVITY</span>
          <h1 className="portal-order-page-title">Your orders</h1>
          <p>Review your purchases and keep track of each order.</p>
        </div>
        <span className="portal-order-list-total">
          <ShoppingBag size={16} aria-hidden="true" />
          {recentOrders.length} orders
        </span>
      </header>

      <section className="portal-order-list-summary" aria-label="Order summary">
        <article className="portal-order-list-stat">
          <span className="portal-detail-icon" aria-hidden="true">
            <ShoppingBag size={18} />
          </span>
          <div>
            <strong>{recentOrders.length}</strong>
            <span>Total orders</span>
          </div>
        </article>
        <article className="portal-order-list-stat">
          <span className="portal-detail-icon is-complete" aria-hidden="true">
            <CircleCheck size={18} />
          </span>
          <div>
            <strong>{completedCount}</strong>
            <span>Completed</span>
          </div>
        </article>
        <article className="portal-order-list-stat">
          <span className="portal-detail-icon is-pending" aria-hidden="true">
            <Clock3 size={18} />
          </span>
          <div>
            <strong>{pendingCount}</strong>
            <span>In progress</span>
          </div>
        </article>
      </section>

      <section
        className="portal-detail-panel portal-order-list-panel"
        aria-labelledby="order-history-title"
      >
        <header className="portal-section-heading">
          <div>
            <span className="portal-detail-eyebrow">PURCHASES</span>
            <h2 id="order-history-title">Order history</h2>
            <p>Search your orders or filter them by status.</p>
          </div>
          <span className="portal-order-list-count">
            {filteredOrders.length} shown
          </span>
        </header>

        <div className="portal-order-list-controls">
          <div
            className="portal-order-list-tabs"
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

          <label className="portal-order-list-search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search orders"
              placeholder="Search orders"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </label>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="portal-order-list-table-wrap">
            <DataTable<RecentOrder>
              headings={[
                "Order",
                "Date",
                "Items",
                "Status",
                "Total",
                "Action",
              ]}
              data={visibleOrders}
              className="portal-order-list-table mb-0"
              renderRow={(order) => (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>{order.date}</td>
                  <td>{order.items}</td>
                  <td>
                    <span
                      className={`portal-detail-status ${
                        order.status === "Pending"
                          ? "is-pending"
                          : "is-complete"
                      }`}
                    >
                      {order.status === "Pending" ? (
                        <Clock3 size={14} />
                      ) : (
                        <Check size={14} />
                      )}
                      {order.status}
                    </span>
                  </td>
                  <td className="portal-order-list-price">{order.total}</td>
                  <td className="portal-order-list-action">
                    <Link
                      className="portal-order-list-view"
                      to={`/portal/orders/${order.id.slice(1)}`}
                      aria-label={`View order ${order.id}`}
                    >
                      Details
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              )}
            />
          </div>
        ) : (
          <div className="portal-order-list-empty" role="status">
            <span className="portal-detail-icon" aria-hidden="true">
              <Search size={18} />
            </span>
            <strong>No matching orders</strong>
            <span>Try another search or choose a different status.</span>
          </div>
        )}

        <footer className="portal-order-list-pagination">
          <span>
            Showing {firstVisibleOrder}&ndash;{lastVisibleOrder} of{" "}
            {filteredOrders.length} orders
          </span>
          <div className="portal-order-list-pagination-actions">
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              {page} / {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={page === pageCount}
              aria-label="Next page of orders"
            >
              Next
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default OrderList;

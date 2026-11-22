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
import { useApiQuery } from "../../../hooks/useApi";
import "../OrderDetails.css";
import "./OrderList.css";

type OrderFilter = "all" | "pending" | "completed";

type OrderRecord = Record<string, unknown>;

type OrderRow = {
  id: string;
  date: string;
  items: number | null;
  status: string;
  total: string;
};

type OrdersPage = {
  orders: OrderRow[];
  total: number | null;
};

const pageSize = 8;

const isRecord = (value: unknown): value is OrderRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getValue = (record: OrderRecord, keys: string[]): unknown => {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }
  return undefined;
};

const getText = (value: unknown): string => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }
  return "";
};

const readTotal = (record: OrderRecord): number | null => {
  const total = getValue(record, [
    "totalCount",
    "total_count",
    "totalOrders",
    "total_orders",
    "total",
    "count",
  ]);
  if (typeof total === "number" && Number.isFinite(total) && total >= 0) {
    return total;
  }
  if (typeof total === "string" && total.trim()) {
    const parsedTotal = Number(total);
    if (Number.isFinite(parsedTotal) && parsedTotal >= 0) return parsedTotal;
  }
  return null;
};

const getOrderList = (response: unknown): OrdersPage => {
  let value = response;
  let total: number | null = null;

  for (let depth = 0; depth < 4; depth += 1) {
    if (Array.isArray(value)) {
      return { orders: value.map(toOrderRow), total };
    }
    if (!isRecord(value)) break;

    total ??= readTotal(value);
    const nested = getValue(value, ["orders", "results", "data"]);
    if (nested === undefined) break;
    value = nested;
  }

  throw new Error("The orders response has an unexpected format.");
};

const formatDate = (value: unknown): string => {
  const dateText = getText(value);
  if (!dateText) return "—";

  const date = new Date(dateText);
  return Number.isNaN(date.getTime())
    ? dateText
    : new Intl.DateTimeFormat("en-GH", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
};

const formatTotal = (value: unknown): string => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return `GHS ${value.toLocaleString("en-GH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  const text = getText(value);
  if (!text) return "—";
  const numericTotal = Number(text);
  return text && Number.isFinite(numericTotal)
    ? `GHS ${numericTotal.toLocaleString("en-GH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : text;
};

const toOrderRow = (value: unknown): OrderRow => {
  if (!isRecord(value)) {
    throw new Error("The orders response contains an invalid order.");
  }

  const id = getText(
    getValue(value, [
      "id",
      "_id",
      "orderId",
      "order_id",
      "orderNumber",
      "order_number",
    ]),
  );
  if (!id) {
    throw new Error("The orders response contains an order without an ID.");
  }

  const itemValue = getValue(value, [
    "items",
    "orderItems",
    "order_items",
    "itemCount",
    "item_count",
    "itemsCount",
    "items_count",
    "products",
  ]);
  const items = Array.isArray(itemValue)
    ? itemValue.length
    : typeof itemValue === "number" && Number.isFinite(itemValue)
      ? itemValue
      : null;

  return {
    id: id.startsWith("#") ? id : `#${id}`,
    date: formatDate(
      getValue(value, ["date", "orderDate", "order_date", "createdAt", "created_at"]),
    ),
    items,
    status: getText(getValue(value, ["status", "orderStatus", "order_status"])) || "Unknown",
    total: formatTotal(
      getValue(value, [
        "total",
        "totalAmount",
        "total_amount",
        "totalPrice",
        "total_price",
        "amount",
        "grandTotal",
        "grand_total",
      ]),
    ),
  };
};

const isCompleted = (status: string): boolean =>
  ["complete", "completed", "delivered", "fulfilled"].includes(
    status.trim().toLowerCase(),
  );

const OrderList: React.FC = () => {
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const offset = (page - 1) * pageSize;
  const ordersQuery = useApiQuery<unknown>(
    ["customer-orders", String(pageSize), String(offset)],
    `/orders/get-orders?limit=${pageSize}&offset=${offset}`,
  );

  let ordersPage: OrdersPage | null = null;
  let responseError = "";
  if (ordersQuery.data !== undefined) {
    try {
      ordersPage = getOrderList(ordersQuery.data);
    } catch (error) {
      responseError =
        error instanceof Error
          ? error.message
          : "Unable to read the orders response.";
    }
  }

  const orders = ordersPage?.orders ?? [];
  const pendingCount = orders.filter(
    (order) => order.status.toLowerCase() === "pending",
  ).length;
  const completedCount = orders.filter((order) => isCompleted(order.status)).length;
  const searchText = search.trim().toLowerCase();
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filter === "all" ||
      (filter === "pending" && order.status.toLowerCase() === "pending") ||
      (filter === "completed" && isCompleted(order.status));
    const matchesSearch = [
      order.id,
      order.date,
      String(order.items ?? ""),
      order.status,
      order.total,
    ].some((value) => value.toLowerCase().includes(searchText));

    return matchesStatus && matchesSearch;
  });
  const totalOrders = ordersPage?.total;
  const hasNextPage =
    totalOrders !== null && totalOrders !== undefined
      ? offset + orders.length < totalOrders
      : orders.length === pageSize;
  const pageCount =
    totalOrders === null || totalOrders === undefined
      ? null
      : Math.max(1, Math.ceil(totalOrders / pageSize));
  const displayedOrderCount =
    totalOrders ?? `${offset + orders.length}${hasNextPage ? "+" : ""}`;

  const selectFilter = (nextFilter: OrderFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  const showError = ordersQuery.isError || Boolean(responseError);
  const errorMessage = ordersQuery.isError
    ? ordersQuery.error.message
    : responseError;

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
          {displayedOrderCount} orders
        </span>
      </header>

      <section className="portal-order-list-summary" aria-label="Order summary">
        <article className="portal-order-list-stat">
          <span className="portal-detail-icon" aria-hidden="true">
            <ShoppingBag size={18} />
          </span>
          <div>
            <strong>{totalOrders ?? "—"}</strong>
            <span>Total orders</span>
          </div>
        </article>
        <article className="portal-order-list-stat">
          <span className="portal-detail-icon is-complete" aria-hidden="true">
            <CircleCheck size={18} />
          </span>
          <div>
            <strong>{completedCount}</strong>
            <span>Completed on this page</span>
          </div>
        </article>
        <article className="portal-order-list-stat">
          <span className="portal-detail-icon is-pending" aria-hidden="true">
            <Clock3 size={18} />
          </span>
          <div>
            <strong>{pendingCount}</strong>
            <span>Pending on this page</span>
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
            <p>Search this page or filter loaded orders by status.</p>
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
              aria-label="Search orders on this page"
              placeholder="Search this page"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </label>
        </div>

        {ordersQuery.isLoading ? (
          <div className="portal-order-list-empty" role="status">
            Loading orders...
          </div>
        ) : showError ? (
          <div className="alert alert-danger m-3" role="alert">
            Unable to load your orders: {errorMessage}
          </div>
        ) : orders.length === 0 ? (
          <div className="portal-order-list-empty" role="status">
            <span className="portal-detail-icon" aria-hidden="true">
              <ShoppingBag size={18} />
            </span>
            <strong>No orders yet</strong>
            <span>Your orders will appear here after you make a purchase.</span>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="portal-order-list-table-wrap">
            <DataTable<OrderRow>
              headings={[
                "Order",
                "Date",
                "Items",
                "Status",
                "Total",
                "Action",
              ]}
              data={filteredOrders}
              className="portal-order-list-table mb-0"
              renderRow={(order) => (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>{order.date}</td>
                  <td>{order.items ?? "—"}</td>
                  <td>
                    <span
                      className={`portal-detail-status ${
                        isCompleted(order.status)
                          ? "is-complete"
                          : "is-pending"
                      }`}
                    >
                      {isCompleted(order.status) ? (
                        <Check size={14} />
                      ) : (
                        <Clock3 size={14} />
                      )}
                      {order.status}
                    </span>
                  </td>
                  <td className="portal-order-list-price">{order.total}</td>
                  <td className="portal-order-list-action">
                    <Link
                      className="portal-order-list-view"
                      to={`/portal/orders/${encodeURIComponent(order.id.slice(1))}`}
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

        {!ordersQuery.isLoading && !showError && (
          <footer className="portal-order-list-pagination">
            <span>
              Showing {filteredOrders.length} of {orders.length} orders on this
              page
            </span>
            <div className="portal-order-list-pagination-actions">
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage - 1)}
                disabled={page === 1 || ordersQuery.isFetching}
              >
                Previous
              </button>
              <span>
                {page}
                {pageCount === null ? "" : ` / ${pageCount}`}
              </span>
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage + 1)}
                disabled={!hasNextPage || ordersQuery.isFetching}
                aria-label="Next page of orders"
              >
                Next
              </button>
            </div>
          </footer>
        )}
      </section>
    </main>
  );
};

export default OrderList;

import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Package,
  PackageCheck,
  Printer,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import heroImage from "../../assets/images/hero2.jpg";
import kaftanImage from "../../assets/images/kaftan.jpg";
import { recentOrders } from "./orderData";
import "./OrderDetails.css";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const order = recentOrders.find((item) => item.id.slice(1) === orderId);

  if (!order) {
    return (
      <main className="container portal-order-page py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="alert alert-warning" role="alert">
              This order could not be found.
            </div>
            <Link to="/portal/orders" className="btn btn-outline-dark">
              <ArrowLeft size={16} className="me-2" />
              Back to orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isComplete = order.status === "Completed";
  const items = Array.from({ length: order.items }, (_, index) => index + 1);
  const orderImages = [heroImage, kaftanImage];

  return (
    <main className="container portal-order-page py-4 py-lg-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <Link to="/portal/orders" className="portal-order-back-link d-inline-flex align-items-center mb-3">
            <ArrowLeft size={16} className="me-2" />
            Back to orders
          </Link>
          <h1 className="portal-order-page-title mb-0">Order details</h1>
        </div>
        <button
          type="button"
          className="btn btn-outline-dark portal-order-print"
          onClick={() => window.print()}
        >
          <Printer size={16} className="me-2" />
          Print order
        </button>
      </div>

      <section className="portal-detail-panel mb-4" aria-labelledby="order-id">
        <header className="portal-detail-header d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <span className="portal-detail-eyebrow">Order ID</span>
            <h2 id="order-id" className="portal-detail-order-id mb-0">{order.id}</h2>
          </div>
          <span
            className={`portal-detail-status ${
              isComplete ? "is-complete" : "is-pending"
            }`}
          >
            {isComplete ? <Check size={14} /> : <Clock3 size={14} />}
            {isComplete ? "Completed" : "Pending"}
          </span>
        </header>

        <div className="row g-3 p-3 p-md-4">
          <div className="col-12 col-lg-6">
            <article className={`portal-fulfillment-card ${isComplete ? "is-complete" : ""}`}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="portal-detail-icon">
                  {isComplete ? <PackageCheck size={18} /> : <Package size={18} />}
                </span>
                <span className="portal-detail-eyebrow">
                  {isComplete ? "Order complete" : "Seller fulfillment"}
                </span>
              </div>
              <h3>{isComplete ? "Your order is complete" : "Your order is being prepared"}</h3>
              <p>
                {isComplete
                  ? "This order has been marked as completed."
                  : "The seller is preparing your items. Delivery updates will appear after dispatch."}
              </p>
              <div className="portal-fulfillment-progress" aria-label={isComplete ? "Order complete" : "Order preparation in progress"}>
                <span className={isComplete ? "is-complete" : ""} />
              </div>
            </article>
          </div>

          <div className="col-6 col-lg-3">
            <article className="portal-order-fact-card h-100">
              <span className="portal-detail-icon"><Truck size={18} /></span>
              <span className="portal-detail-eyebrow">Delivery</span>
              <strong>{isComplete ? "Order complete" : "Awaiting dispatch"}</strong>
              <small>{isComplete ? "Fulfillment finished" : "Delivery estimate not yet available"}</small>
            </article>
          </div>

          <div className="col-6 col-lg-3">
            <article className="portal-order-fact-card h-100">
              <span className="portal-detail-icon"><CalendarDays size={18} /></span>
              <span className="portal-detail-eyebrow">Order date</span>
              <strong>{order.date}</strong>
              <small>{order.items} {order.items === 1 ? "item" : "items"} in this order</small>
            </article>
          </div>
        </div>
      </section>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <section className="portal-detail-panel h-100" aria-labelledby="timeline-heading">
            <header className="portal-section-heading">
              <div>
                <span className="portal-detail-eyebrow">Order progress</span>
                <h2 id="timeline-heading">Timeline</h2>
              </div>
            </header>
            <ol className="portal-order-timeline">
              <li className="is-done">
                <span className="portal-timeline-marker"><Check size={12} /></span>
                <div>
                  <strong>Order placed</strong>
                  <span>{order.date}</span>
                </div>
              </li>
              <li className={isComplete ? "is-done" : "is-current"}>
                <span className="portal-timeline-marker">
                  {isComplete ? <Check size={12} /> : <Package size={12} />}
                </span>
                <div>
                  <strong>{isComplete ? "Seller fulfillment complete" : "Preparing your order"}</strong>
                  <span>{isComplete ? "Completed" : "In progress"}</span>
                </div>
              </li>
              <li className={isComplete ? "is-done" : ""}>
                <span className="portal-timeline-marker">
                  {isComplete ? <Check size={12} /> : <Truck size={12} />}
                </span>
                <div>
                  <strong>{isComplete ? "Order completed" : "Delivery update"}</strong>
                  <span>{isComplete ? "Completed" : "Available after dispatch"}</span>
                </div>
              </li>
            </ol>
          </section>
        </div>

        <div className="col-12 col-lg-6">
          <section className="portal-detail-panel h-100" aria-labelledby="shipment-heading">
            <header className="portal-section-heading">
              <div>
                <span className="portal-detail-eyebrow">Fulfillment information</span>
                <h2 id="shipment-heading">Shipment</h2>
              </div>
              <span className="portal-detail-icon"><MapPin size={18} /></span>
            </header>
            <div className="portal-shipment-info">
              <div>
                <span>Fulfilled by</span>
                <strong>Order seller</strong>
              </div>
              <div>
                <span>Delivery address</span>
                <strong>Address details are not available here</strong>
              </div>
              <div>
                <span>Tracking</span>
                <strong>
                  {isComplete
                    ? "Tracking details were not provided"
                    : "Tracking will be available after dispatch"}
                </strong>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="portal-detail-panel mb-4" aria-labelledby="items-heading">
        <header className="portal-section-heading">
          <div>
            <span className="portal-detail-eyebrow">In this order</span>
            <h2 id="items-heading">Items <span className="portal-item-count">{order.items}</span></h2>
          </div>
        </header>
        <div className="row g-3 p-3 pt-0 p-md-4">
          {items.map((itemNumber) => (
            <div className="col-12 col-md-6" key={itemNumber}>
              <article className="portal-order-item h-100">
                <div className="portal-order-item-image">
                  <img
                    src={orderImages[(itemNumber - 1) % orderImages.length]}
                    alt=""
                  />
                </div>
                <div className="portal-order-item-copy">
                  <span className="portal-detail-eyebrow">Item {String(itemNumber).padStart(2, "0")}</span>
                  <strong>Fashion item</strong>
                  <span>Quantity: 1</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="portal-detail-panel portal-order-summary-card" aria-labelledby="summary-heading">
        <header className="portal-section-heading">
          <div>
            <h2 id="summary-heading">Order summary</h2>
            <p>Summary of your purchase.</p>
          </div>
          <span className={`portal-payment-status ${isComplete ? "is-complete" : "is-pending"}`}>
            {isComplete ? "Completed" : "Pending"}
          </span>
        </header>
        <div className="portal-summary-lines">
          <div>
            <span>Items ({order.items})</span>
            <strong>{order.total}</strong>
          </div>
          <div className="portal-summary-total">
            <span>Total</span>
            <strong>{order.total}</strong>
          </div>
        </div>
        <footer className="portal-summary-footer d-flex flex-wrap align-items-center justify-content-between gap-3">
          <span>{order.total} <small>({order.items} {order.items === 1 ? "item" : "items"})</small></span>
          <Link to="/portal/orders" className="btn btn-dark">Back to orders</Link>
        </footer>
      </section>
    </main>
  );
};

export default OrderDetails;

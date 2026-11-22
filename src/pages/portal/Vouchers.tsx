import { ArrowLeft, ArrowRight, TicketPercent } from "lucide-react";
import { Link } from "react-router-dom";
import "./OrderDetails.css";
import "./Vouchers.css";

const Vouchers: React.FC = () => (
  <main className="container portal-order-page portal-vouchers-page py-4 py-lg-5">
    <div className="mb-4">
      <Link
        to="/portal/profile"
        className="portal-order-back-link d-inline-flex align-items-center mb-3"
      >
        <ArrowLeft size={16} className="me-2" />
        Back to profile
      </Link>
      <h1 className="portal-order-page-title mb-2">Your vouchers</h1>
      <p className="portal-vouchers-intro mb-0">
        Keep track of offers and rewards for your next favorite find.
      </p>
    </div>

    <section className="portal-vouchers-hero mb-4">
      <div className="portal-vouchers-hero-copy">
        <span className="portal-vouchers-eyebrow">KAFUP REWARDS</span>
        <h2>A little something for your next favorite find.</h2>
        <p>
          When a voucher is available for your account, you’ll find its details
          here.
        </p>
      </div>
      <div className="portal-voucher-stamp" aria-hidden="true">
        <TicketPercent size={32} strokeWidth={1.5} />
        <span>Made for you</span>
      </div>
    </section>

    <section
      className="portal-detail-panel"
      aria-labelledby="available-vouchers-title"
    >
      <header className="portal-section-heading">
        <div>
          <span className="portal-detail-eyebrow">YOUR OFFERS</span>
          <h2 id="available-vouchers-title">Available vouchers</h2>
        </div>
        <span className="portal-voucher-count">0 available</span>
      </header>

      <div className="portal-vouchers-empty" role="status">
        <span className="portal-vouchers-empty-icon" aria-hidden="true">
          <TicketPercent size={25} />
        </span>
        <h3>No vouchers just yet</h3>
        <p>
          Any offers added to your account will appear here. In the meantime,
          explore the latest designs.
        </p>
        <Link to="/shop" className="btn btn-dark d-inline-flex align-items-center gap-2">
          Explore designs
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </main>
);

export default Vouchers;

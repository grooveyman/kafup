import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import { useLoginModal } from "../context/LoginModalContext";
import { Search, ShoppingBagIcon, User } from "lucide-react";
import CartSidebar from "../components/CartSidebar";
import { useCartContext } from "../context/CartContext";

const GuestNavBar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { openLogin, isLoginOpen } = useLoginModal();
  const [showCart, setShowCart] = useState(false);
  const { cartItems, removeCart } = useCartContext();
  const navigate = useNavigate();


  const handleScroll = () => setScrolled(window.scrollY > 50);

  useEffect(() => {
    document.body.classList.toggle("modal-open", isLoginOpen);
    return () => document.body.classList.remove("modal-open");
  }, [isLoginOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`${
          scrolled ? "scrolled" : "not-scrolled"
        } navbar fixed-top navbar-expand-lg`}
      >
        <div className="container">
          <a className="navbar-brand" href="" onClick={() => navigate("/")}>
            Kafup
            {/* <img src={logo} width="80" height="40" /> */}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <div className="d-flex w-100 justify-content-between align-items-center">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  {/* <Link to="/" className="nav-link active">Home</Link> */}
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => navigate("/categories/shop")}>
                    Shop
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => navigate("/categories/kaftan")}>
                    Explore
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => navigate("/categories/agbada")}>
                    Agbada
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => navigate("/categories/weddings")}>
                    Weddings
                  </a>
                </li>
              </ul>

              <ul className="navbar-nav mb-lg-0 align-items-center">
                <li className="nav-item me-3">
                  <form className="d-flex">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control navsearch"
                        placeholder="Search for products"
                        aria-label="Search products"
                      />
                      
                    </div>
                    <span
                        className="input-group-text"
                        style={{ background: "none", border: "none" }}
                        id="basic-addon1"
                      >
                        <Search />
                      </span>
                  </form>
                </li>

                <li className="nav-item me-2">
                  <button
                    type="button"
                    className="nav-link btn btn-link p-0"
                    onClick={openLogin}
                    aria-label="Open account"
                  >
                    <User />
                  </button>
                </li>

                {/* Cart with badge */}
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link btn btn-link p-0 position-relative"
                    onClick={() => setShowCart(true)}
                    aria-label="Open cart"
                  >
                    <ShoppingBagIcon />
                    {cartItems.length > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {showCart && (
        <CartSidebar
          show={showCart}
          cartItems={cartItems}
          onDelete={removeCart}
          onClose={() => setShowCart(false)}
        />
      )}
    </>
  );
};

export default GuestNavBar;

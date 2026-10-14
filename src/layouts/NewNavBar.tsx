import { ShoppingBagIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/newnav.css";
import CartSidebar from "../components/CartSidebar";
import { useCartContext } from "../context/CartContext";
import { useLoginModal } from "../context/LoginModalContext";

const NewNavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { openLogin } = useLoginModal();
  const [showCart, setShowCart] = useState(false);
  const { cartItems, removeCart } = useCartContext();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);

  const closeMobileNav = () => {
    if (isMobile) {
      setIsNavExpanded(false);
    }
  };

  const handleScroll = () => setScrolled(window.scrollY > 50);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 992);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav
        className={`${scrolled ? "scrolled" : "not-scrolled"
          } navbar fixed-top navbar-expand-lg ${isMobile ? "bg-light" : ""}`}
      >
        <div className="container pt-2">
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""} navbar-brand round-nav-brand`
            }
            to="/"
            onClick={() => navigate("/")}
          >
            Kafup
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarText"
            aria-expanded={isNavExpanded}
            aria-label="Toggle navigation"
            onClick={() => setIsNavExpanded((expanded) => !expanded)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`}
            id="navbarText"
          >
            <div
              className={`d-flex w-100 justify-content-between ${
                isMobile ? "flex-column align-items-start" : ""
              }`}
            >
              <ul
                className={`navbar-nav mb-2 mb-lg-0 mx-auto round-nav ${
                  isMobile ? "flex-column align-items-start" : ""
                }`}
              >
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/"
                    end
                    onClick={closeMobileNav}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/shop"
                    onClick={closeMobileNav}
                  >
                    Shop
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/explore"
                    onClick={closeMobileNav}
                  >
                    Explore
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/brands"
                    onClick={closeMobileNav}
                  >
                    Brands
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/collections"
                    onClick={closeMobileNav}
                  >
                    Collections
                  </NavLink>
                </li>
              </ul>

              <ul
                className={`navbar-nav mb-lg-0 round-nav p-2 ${
                  isMobile ? "flex-column align-items-start" : ""
                }`}
              >
                <li className="nav-item me-2">
                  <button
                    type="button"
                    className="nav-link btn btn-link p-0"
                    onClick={() => {}}
                    aria-label="Open account"
                  >
                  </button>
                </li>

                <li className="nav-item me-2">
                  <button
                    type="button"
                    className="nav-link btn btn-link p-0"
                    onClick={() => {
                      closeMobileNav();
                      openLogin();
                    }}
                    aria-label="Open account"
                  >
                    <div className="d-flex justify-content-between gap-2">
                      <User />
                      {isMobile && (
                        <span className="d-block mt-2">Account</span>
                      )}
                    </div>
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link btn btn-link p-0 position-relative"
                    onClick={() => {
                      closeMobileNav();
                      setShowCart(true);
                    }}
                    aria-label="Open cart"
                  >
                    <div className="d-flex justify-content-between gap-2">
                      <ShoppingBagIcon />

                      {cartItems.length > 0 && (
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {cartItems.length}
                        </span>
                      )}

                      {isMobile && (
                        <span className="d-block mt-2">Cart</span>
                      )}
                    </div>

                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.7rem" }}
                    ></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {isMobile && isNavExpanded && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close navigation menu"
          onClick={closeMobileNav}
        />
      )}

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

export default NewNavBar;
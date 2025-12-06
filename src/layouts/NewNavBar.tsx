import { SearchIcon, ShoppingBagIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleScroll = () => setScrolled(window.scrollY > 50);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 992);  
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => 
      {window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      }

  }, []);
  return (
    <>
      <nav
        className={`${
          scrolled ? "scrolled" : "not-scrolled"
        } navbar fixed-top navbar-expand-lg ${isMobile ? 'bg-light': ''}`}
      >
        <div className="container pt-2">
          <a
            className="navbar-brand round-nav-brand"
            href=""
            onClick={() => navigate("/")}
          >
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
            <div className={`d-flex w-100 justify-content-between ${isMobile ? 'flex-column align-items-start':''}`}>
              <ul className={`navbar-nav mb-2 mb-lg-0 mx-auto round-nav ${isMobile ? 'flex-column align-items-start': ''}`}>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => navigate("/categories/shop")}
                  >
                    Shop
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => navigate("/explore")}
                  >
                    Explore
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => navigate("/designers")}
                  >
                    Designers
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => navigate("/collections")}
                  >
                    Collections
                  </a>
                </li>
              </ul>

              <ul className={`navbar-nav mb-lg-0 round-nav p-2 ${isMobile ? 'flex-column align-items-start':''}`}>
                <li className="nav-item me-2">
                  <button
                    type="button"
                    className="nav-link btn btn-link p-0"
                    onClick={() => {}}
                    aria-label="Open account"
                  >
                    <div className="d-flex justify-content-between gap-2">
                      <SearchIcon />
                      {isMobile && <span className="d-block mt-2">Search</span>}
                    </div>
                    
                  </button>
                </li>

                <li className="nav-item me-2">
                  <button
                    type="button"
                    className="nav-link btn btn-link p-0"
                    onClick={openLogin}
                    aria-label="Open account"
                  >
                    <div className="d-flex justify-content-between gap-2">
                      <User />
                    {isMobile && <span className="d-block mt-2">Account</span>}
                    </div>
                    
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link btn btn-link p-0 position-relative"
                    onClick={() => setShowCart(true)}
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
                    {isMobile && <span className="d-block mt-2">Cart</span>}
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

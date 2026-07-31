const Footer: React.FC = () => {
  return (
    <footer className="footer bg-light py-3 mt-auto">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="copyright d-flex justify-content-center">
            &copy; Kafup 2025. All Rights Reserved
          </div>
          <div>
            <nav>
              <ul className="d-flex flex-row gap-2 navbar-nav mb-2 mb-lg-0">
                <li className="nav-item footer-nav-item">
                  <a href="#" className="">Home</a>
                </li>
                <li className="nav-item footer-nav-item">
                  <a href="#"> About Us</a>
                </li>
                <li className="nav-item footer-nav-item">
                  <a href="#"> Contact</a>
                </li>
                <li className="nav-item footer-nav-item">
                <a href="#"> Privacy Policy</a>
              </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

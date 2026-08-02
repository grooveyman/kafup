

export const HeroSection: React.FC = () => {
    return (
        <div
            id="carouselExample"
            className="carousel carousel-fade"
            data-bs-ride="carousel"
            style={{ height: "70%", padding: "10px", backgroundColor: "white" }}
        >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="assets/images/closet.webp"
                        className="hero-img"
                        alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block text-start">
                        <h2>Setup Your brand to Sell and exhibit Your Beautiful Designs</h2>
                        <button className="btn btn-primary">Get Started</button>
                    </div>

                </div>
                <div className="carousel-item">
                    <img
                        src="assets/images/sew.webp"
                        className="hero-img"
                        alt="..."
                    />
                   <div className="carousel-caption d-none d-md-block text-start">
                        <h2>Find Design Inspirations for Your Next Appearance or Project</h2>
                        <button className="btn btn-primary">Explore</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img
                        src="assets/images/herosec.webp"
                        className="hero-img"
                        alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block text-start">
                        <h2>Choose from our Elegant Designs from Our Best Designers</h2>
                        <button className="btn btn-primary">Shop Now</button>
                    </div>
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};
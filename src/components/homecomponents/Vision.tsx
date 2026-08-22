
import "../../assets/css/vision.css";

const Vision: React.FC = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-5">
                        <div className="ad-text-head">
                            <h6>Kafup</h6>
                            <p className="ad-text-vision pt-3">Dress to Influence, Not to Impress!</p>
                            <p>The ultimate place for your African apparel</p>
                            <button className="btn btn-primary">Shop Now</button>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-12 col-sm-12 col-xl-5">
                        <div className="d-flex align-items-center" style={{ height: "100%" }}>
                            <div className="ad-card">
                                <img src={`${import.meta.env.BASE_URL}assets/images/software%20dev.png`} className="img-rounded" />
                                <div className="ad-content">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum autem officia, quae debitis.</p>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6>GHS 400.33</h6>
                                        <button className="btn btn-primary">Shop Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Vision;
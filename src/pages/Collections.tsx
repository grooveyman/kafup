import "../assets/css/collections.css";

const Collections:React.FC = () => {
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="collection-container">
                        <img src="assets/images/sew.webp" className="img-fluid collection-img"/>
                        <div className="collection-head">
                            <h6>Collection Name <span>2K</span> <span className="suffix">Designs</span></h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="collection-container">
                        <img src="assets/images/sew.webp" className="img-fluid collection-img"/>
                        <div className="collection-head">
                            <h6>Collection Name <span>2K</span> <span className="suffix">Designs</span></h6>
                        </div>
                    </div>
                </div>
            </div>
             <div className="row mt-3">
                <div className="col-md-6">
                    <div className="collection-container">
                        <img src="assets/images/sew.webp" className="img-fluid collection-img"/>
                        <div className="collection-head">
                            <h6>Collection Name <span>2K</span> <span className="suffix">Designs</span></h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="collection-container">
                        <img src="assets/images/sew.webp" className="img-fluid collection-img"/>
                        <div className="collection-head">
                            <h6>Collection Name <span>2K</span> <span className="suffix">Designs</span></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Collections;
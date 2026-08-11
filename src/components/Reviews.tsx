import { Star } from "lucide-react";


const Reviews: React.FC = () => {

    return (
        <>
            <div className="row reviews">
                <h1>Reviews</h1>
                <div className="col-md-5">
                    <div className="">
                        <div className="d-flex align-items-center gap-2">
                            <h2 className="mb-0">4.8</h2>
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                        </div>
                        <p>Based on 90 reviews</p>
                    </div>

                    <div className="rate-overview mt-4">
                        <h4>Rating Overview</h4>

                        <div>
                            <div className="review-breakdown">

                                <div className="review-row">
                                    <span className="review-number">5</span>
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: "80%" }}></div>
                                    </div>
                                </div>

                                <div className="review-row">
                                    <span className="review-number">4</span>
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: "60%" }}></div>
                                    </div>
                                </div>

                                <div className="review-row">
                                    <span className="review-number">3</span>
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: "35%" }}></div>
                                    </div>
                                </div>

                                <div className="review-row">
                                    <span className="review-number">2</span>
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: "15%" }}></div>
                                    </div>
                                </div>

                                <div className="review-row">
                                    <span className="review-number">1</span>
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: "5%" }}></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">

                </div>
            </div>
        </>
    );
};

export default Reviews;
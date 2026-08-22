import EmptyPage from "./EmptyPage";
import { StarsComponent } from "./StarsComponent";
import { DesignerCard } from "./DesignerCard";


const data = {
    total: 3,
    offset: 1,
    limit: 3,
    results: [
        {
            name: 'Kelvin Osei',
            rate: 4.5,
            title: 'Great outfit',
            message: 'Lorem ipsum dolor sit immer amer. Cupiditate dicta debitis quae inventore in, architecto fugiat maiores voluptatibus? Repellendus. Quidem quia consequuntur, ullam reprehenderit odit, id sunt est accusamus consectetur,',
            created_at: '2026-09-23 03:02:23:22241'
        },
        {
            name: 'Kelvin Osei',
            rate: 4.5,
            title: 'Great outfit',
            message: 'Lorem ipsum dolor sit immer amer. Cupiditate dicta debitis quae inventore in, architecto fugiat maiores voluptatibus? Repellendus. Quidem quia consequuntur, ullam reprehenderit odit, id sunt est accusamus consectetur,',
            created_at: '2026-09-23 03:02:23:22241'
        }
    ]
};

const Reviews: React.FC = () => {

    return (
        <>
            <div className="row reviews">
                <h1>Reviews</h1>
                <div className="col-md-5">
                    <div className="">
                        <div className="d-flex justify-content-start gap-2">
                            <h2 className="mb-0">4.8</h2>
                            <StarsComponent size={20} rate={4.5} />
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

                    <div className="rate-designer row mt-4">
                        <DesignerCard />
                    </div>
                </div>
                <div className="col-md-7 mt-4">
                    <div>
                        {data.total === 0 && <EmptyPage />}
                        {data.results.map((item) => {
                            return (
                                <>
                                    <div className="comment-head">
                                        <div className="d-flex justify-content-start gap-2 reviewer">
                                            <h6>{item.name}</h6>
                                            <p> | 5 days ago</p>
                                        </div>
                                        <div className="stars d-flex justify-content-start">
                                            <StarsComponent size={15} rate={4.5} />
                                        </div>
                                    </div>

                                    <div className="comment-body mt-4">
                                        <h6>{item.title}</h6>
                                        <p>{item.message}</p>
                                    </div>
                                    <hr />
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reviews;
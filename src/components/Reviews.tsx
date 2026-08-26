import EmptyPage from "./EmptyPage";
import { StarsComponent } from "./StarsComponent";
import { DesignerCard } from "./DesignerCard";
import { ReviewModal } from "./ReviewModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useApiMutation, useApiQuery } from "../hooks/useApi";
import { Designer } from "../pages/Details";


interface ReviewProps{
    designer: Designer;
    design_id: string;
}
interface Response{
    total: number;
    results: ResponseType[];
}
interface ResponseType{
    reviewer_name: string;
    review_time: string;
    review_rate: number;
    title: string;
    comment: string;
}
const Reviews: React.FC<ReviewProps> = ({designer, design_id}) => {
    const [showModal, setShowModal] = useState(false);
    const [reviewData, setReviewData] = useState({
        title: "",
        comment: "",
        rating: 0
    });
    const [postLoading, setPostLoading] = useState(false);

    console.log("designers")
    console.log(designer);

    const mutate = useApiMutation<{ message: string }>(`/reviews/`, "POST", {
        onSuccess: (data) => {
            console.log(data);
            setPostLoading(false);
            setShowModal(false);
            toast.success(`Review successfully submitted. Thank You`)
        },
        onError: (error) => {
            console.log(error.message);
            setPostLoading(false);
        }
    });

    //find reviews
    const {data:newdata, isLoading} = useApiQuery<Response>(['reviews', design_id], `/reviews/${design_id}/?limit=3&offset=0`);
    console.log(!isLoading?newdata:"");

    const handleSubmitReview = () => {
        try {

            if (reviewData.title === "") {
                toast.error(`Title cannot be empty`);
            } else if (reviewData.comment === "") {
                toast.error(`Comment cannot be empty`);
            } else {
                setPostLoading(true);
                mutate.mutate({title: reviewData.title, comment:reviewData.comment, rating:reviewData.rating, designer_id:designer.id, design_id:design_id});
                // setShowModal(false);

                setReviewData({
                    title: "",
                    comment: "",
                    rating: 0
                });
            }

        } catch (error) {
            console.log("Failed to submit review: ", error);
        }
    };
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
                        
                        <DesignerCard designer={designer} />
                    </div>
                </div>
                <div className="col-md-7 mt-4">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-complement" onClick={() => setShowModal(true)}> Add Review</button>
                    </div>
                    <div>
                        {(newdata && newdata.total === 0) && <EmptyPage />}
                        {newdata?.results.map((item) => {
                            return (
                                <>
                                    <div className="comment-head">
                                        <div className="d-flex justify-content-start gap-2 reviewer">
                                            <h6>Name of customer</h6>
                                            <p> | 5 days ago</p>
                                        </div>
                                        <div className="stars d-flex justify-content-start">
                                            <StarsComponent size={15} rate={4.5} />
                                        </div>
                                    </div>

                                    <div className="comment-body mt-4">
                                        <h6>{item.title}</h6>
                                        <p>{item.comment}</p>
                                    </div>
                                    <hr />
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
            <ReviewModal show={showModal} loadingBtn={postLoading} setReviewData={setReviewData} reviewData={reviewData} onSubmit={handleSubmitReview} onClose={() => setShowModal(false)} />
        </>
    );
};

export default Reviews;
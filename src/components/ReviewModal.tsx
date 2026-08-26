import { Star } from "lucide-react";
import React, { useState } from "react";
import Loading from "./Loading";

interface ReviewModalProps {
    show: boolean;
    reviewData: ReviewData;
    setReviewData: React.Dispatch<React.SetStateAction<ReviewData>>;
    onSubmit: () => void;
    onClose: () => void;
    loadingBtn: boolean;
}
interface ReviewData {
    title: string;
    comment: string;
    rating: number;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ show, reviewData, setReviewData, onSubmit, onClose, loadingBtn }) => {
    const [hover, setHover] = useState(0);

    const handleRatingChange = (rating: number) => {
        setReviewData((prev) => ({
            ...prev,
            rating
        }));
    };

    const handleOnChnage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReviewData((prev) => ({
            ...prev,
            [name]: value
        }));
    }


    return (
        <>
            <div
                className={`modal fade ${show ? "show d-block" : ""}`}
                style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : undefined }}
                id="reviewModal"
                tabIndex={-1}
                aria-labelledby="sizeGuideModalLabel"
                aria-hidden="true"

            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content size-guide-modal">

                        {/* Header */}
                        <div className="modal-header border-0 px-4 pt-4">
                            <div>
                                <h1
                                    className="modal-title fw-semibold"
                                    id="sizeGuideModalLabel"
                                >
                                    Add Review
                                </h1>

                                <p className="text-muted mb-0 mt-1">
                                    Add your review by selecting a star and your comments.
                                </p>
                            </div>


                        </div>

                        <div className="modal-body px-4 pb-4">
                            <div className="row">
                                <div className="d-flex justify-content-start">
                                    {Array.from({ length: 5 }, (_, index) => {
                                        const startNumber = index + 1;

                                        return (
                                            <Star key={startNumber} size={35} stroke="#ccc" fill={startNumber <= (hover || reviewData.rating) ? "gold" : "none"} onMouseEnter={() => setHover(startNumber)} onMouseLeave={() => setHover(0)} onClick={() => handleRatingChange(startNumber)} style={{ cursor: "pointer" }} />
                                        );
                                    })}
                                </div>
                            </div>


                            {/* Size System */}
                            <div className="size-guide-section mt-4">
                                <label className="size-guide-label">
                                    Title
                                </label>

                                <div className="">
                                    <input type="text" name="title" value={reviewData.title} onChange={handleOnChnage} className="form-control" />
                                </div>

                                <div className="mt-3">
                                    <label className="size-guide-label">
                                        Comment
                                    </label>

                                    <div className="">
                                        <textarea rows={5} style={{resize:"none"}} name="comment" className="form-control" onChange={handleOnChnage} value={reviewData.comment} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer border-0 px-4 pb-4">
                            <button
                                type="button"
                                className="btn btn-danger px-4y"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            {loadingBtn ? (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-dark px-4"
                                    data-bs-dismiss="modal"
                                    disabled
                                >
                                   <Loading size="md" />
                                </button>
                                
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-dark px-4"
                                    data-bs-dismiss="modal"
                                    onClick={onSubmit}
                                >
                                    Submit
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};
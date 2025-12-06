import { ArrowBigLeftDash } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";


const Collection: React.FC = () => {
    const { collection } = useParams();
    const navigate = useNavigate();

    // Lightbox state
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [slides, setSlides] = useState<{ src: string }[]>([]);

    console.log(collection);
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-start align-items-center">
                    <span className="m-3"><button className="btn btn-sm btn-primary" onClick={() => navigate(-1)}><ArrowBigLeftDash /></button></span>
                    <span className=""><h5>Name of Collection</h5></span>
                </div>

                <div className="row">

                    <div className="col-md-4">
                        <div className="collection-item">
                            <img className="img-fluid" src="https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="collection-item">
                            <img className="img-fluid" src="https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg"
                            onClick={() => {
                                    setSlides([{src:"https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg"}]);
                                    setIndex(0);
                                    setOpen(true);
                                }} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="collection-item">
                            <img className="img-fluid" src="https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="collection-item">
                            <img className="img-fluid" src="https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    index={index}
                    slides={slides}
                />
        </>
    );
};
export default Collection;
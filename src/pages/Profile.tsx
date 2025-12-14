import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/profile.css";
import { ArrowBigLeftDashIcon} from "lucide-react";
import Person from "../components/profilecomponents/Person";
import Lightbox from "yet-another-react-lightbox";
import { useState } from "react";


const Profile: React.FC = () => {
    const { username } = useParams();
    console.log("username: " + username);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [slides, setSlides] = useState<{ src: string; alt: string }[]>([]);

    const handleImageClick = (imageSrc: string, imageIndex: number) => {
        setSlides([{ src: imageSrc, alt: `Design ${imageIndex}` }]);
        setIndex(imageIndex);
        setOpen(true);
    };

    const portfolioImages = [
        {
            src: "https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg",
            alt: "Design 1"
        },
        {
            src: "https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg",
            alt: "Design 2"
        },
        {
            src: "https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg",
            alt: "Design 3"
        }
    ];

    return (
        <>
            <div className="container">
                <button className="btn btn-sm btn-primary p-2 m-2" onClick={() => navigate(-1)}><ArrowBigLeftDashIcon/></button>
                <div className="row">
                    <div className="col-md-3 profile-person">
                        <Person />
                    </div>
                    <div className="col-md-9 profile-content">
                        <div className="row feat-section">
                            <div className="row">
                                <div className="">
                                    <h5>Featured Designs</h5>
                                </div>
                                <div className="col-md-3 featured-designs">
                                    <img
                                        className="img-fluid"
                                        src="https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg"
                                        alt="Featured Design"
                                        onClick={() => handleImageClick(
                                            "https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg",
                                            0
                                        )}
                                    />
                                    <p>Title of design</p>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <h5>Portfolio</h5>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex justify-content-start filters">
                                    <div className="filter-collections">
                                        <select className="form-select">
                                            <option>Filter by collection</option>
                                            <option>All</option>
                                        </select>
                                    </div>
                                    <div className="filter-category">
                                        <select className="form-select">
                                            <option>Filter by category</option>
                                            <option>All</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="">
                                    <button className="btn btn-primary">Shop</button>
                                </div>
                            </div>

                            <div className="row mt-4">
                                {portfolioImages.map((image, index) => (
                                    <div key={index} className="col-md-4 portfolio">
                                        <div className="portfolio-item">
                                            <img
                                                className="img-fluid"
                                                src={image.src}
                                                alt={image.alt}
                                                onClick={() => handleImageClick(image.src, index)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
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

export default Profile;

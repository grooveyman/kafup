import { useParams } from "react-router-dom";
import "../assets/css/profile.css";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Person from "../components/profilecomponents/Person";


const Profile: React.FC = () => {
    const { username } = useParams();
    console.log("username: " + username);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Person />
                    </div>
                    <div className="col-md-9">
                        <div className="row ms-5">
                            <div className="row">
                                <div className="">
                                    <h5>Featured Designs</h5>
                                </div>
                                <div className="col-md-3 featured-designs">
                                    <img className="img-fluid" src="https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg" />
                                    <p>Title of design</p>
                                </div>
                                

                            </div>
                        </div>

                        <div className="row ms-5 mt-5">
                            <h5>Portfolio</h5>
                            <div className="filters">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
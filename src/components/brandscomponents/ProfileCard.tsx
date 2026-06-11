import { FacebookIcon, Heart, InstagramIcon, Share, Star, TwitterIcon, YoutubeIcon } from "lucide-react";

const ProfileCard: React.FC = () => {
    return (
        <>
            <div className="card">
                <div className="row">
                    <div className="brand-cover">
                        <img className="object-cover rounded" src="https://res.cloudinary.com/dm104hogb/image/upload/v1757794303/kreationz/products/kbbgdq9ffyufsoedz8as.jpg" />
                    </div>
                </div>
                <div className="px-2">
                    <div className="row mt-3">
                        <div className="head">
                            <h4 className="head-name">Katy Simpson</h4>
                        </div>
                        <div className="brand-meta">
                            <span className="col-md-3">23 Designs</span>
                            <span className="col-md-3">9 Collections</span>
                            <span className="col-md-3">7 Sold</span>
                            <span className="col-md-3">5 Followers</span>
                        </div>
                    </div>
                    <div className="brand-pitch mt-2">
                        <div className="desc">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste exercitationem commodi dolores voluptatem, est iure itaque optio dolorum reiciendis nam quisquam reprehenderit consequatur cumque perferendis.
                        </div>

                    </div>
                    <div className="row mt-4">
                        <div className="brand-actions flex space-x-2">
                            <span className="p-2 bg-black"><Heart size={20} /></span>
                            <span className="p-2 bg-black"><Share size={20} /></span>
                            <span className="p-2 bg-black"><Star size={20} /></span>

                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="socials">
                            <h6 className="mb-3">Socials</h6>
                            <div className="brand-actions flex space-x-2">
                                <span className="p-2 bg-black"><FacebookIcon size={20} /></span>
                                <span className="p-2 bg-black"><InstagramIcon size={20} /></span>
                                <span className="p-2 bg-black"><TwitterIcon size={20} /></span>
                                <span className="p-2 bg-black"><YoutubeIcon size={20} /></span>
                            </div>

                        </div>

                    </div>
                    <div className="row mt-4 mb-4">
                        <div className="locations">
                            <h6 className="mb-2">Locations</h6>
                            <span>Ashaiman, Accra</span>
                        </div>
                    </div>

                    <div className="row">

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileCard;
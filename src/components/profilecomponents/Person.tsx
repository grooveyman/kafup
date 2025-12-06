import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";


const Person: React.FC = () => {
    return (
        <>
            <div className="row">
                <div className="profile-dp">
                    <img className="img-fluid" src="assets/images/sew.webp" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="head">
                    <h4 className="head-name">Katy Simpson</h4>
                </div>
                <div className="meta d-flex justify-content-between">
                    <div>23 Designs</div>
                    <div>9 Collections</div>
                    <div>7 Sold</div>
                    <div>5 Followers</div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="desc">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste exercitationem commodi dolores voluptatem, est iure itaque optio dolorum reiciendis nam quisquam reprehenderit consequatur cumque perferendis.
                </div>

            </div>
            <div className="row mt-3">
                <div className="categories">
                    <h6>Categories</h6>
                    <span>Men</span>
                    <span>Female</span>
                    <span>Shirts</span>
                </div>
            </div>
            <div className="row mt-3">
                <div className="loc">
                    <h6>Locations</h6>
                    <p>Ashaiman, Accra</p>
                </div>
            </div>

            <div className="row">
                <div className="socials">
                    <span><FacebookIcon size={15} /></span>
                    <span><InstagramIcon size={15} /></span>
                    <span><TwitterIcon size={15} /></span>
                    <span><YoutubeIcon size={15} /></span>
                </div>
            </div>
        </>
    );
};

export default Person;
import { ArrowBigLeftDash, FacebookIcon, Heart, InstagramIcon, Search, Share, Star, TwitterIcon, YoutubeIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "../assets/css/brandprofile.css";
import Breadcrumb from "../components/Breadcrumb";
import ProfileCard from "../components/brandscomponents/ProfileCard";
import ListContainer from "../components/shopcomponents/ListContainer";
import { useApiQuery } from "../hooks/useApi";
import { Product } from "./Home";
import EmptyPage from "../components/EmptyPage";
import BrandList from "../components/brandscomponents/BrandList";

const DesignerProfile: React.FC = () => {
    const { collection } = useParams();
    const navigate = useNavigate();

    // Lightbox state
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [slides, setSlides] = useState<{ src: string }[]>([]);

    console.log(collection);

    const enpoint = `/designs/`;
    const { data, isLoading } = useApiQuery<Product[]>(
        ["productscat"],
        enpoint
    );

    return (
        <>
            <div className="container">
                <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Brands", href: '/kafup/brands' }, { label: "Profile" }]} />
            </div>

            <div className="row">
                <div className="brand-cover">
                    <img src="https://amcconsult.com/wp-content/uploads/2023/09/Article_Fast-Fashion-1.jpg" />
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="mb-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6">
                        <ProfileCard />
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6 col-lg-8">
                        {/* filters */}
                        <div className="d-flex justify-content-start flex-row flex-wrap brand-filters gap-2">
                            <div>
                                <select className="form-select">
                                    <option selected>Collections</option>
                                </select>
                            </div>
                            <div>
                                <select className="form-select">
                                    <option selected>Categories</option>
                                </select>
                            </div>
                            <div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                    />
                                    <span className="input-group-text" style={{ borderRadius: "10px" }}>
                                        <Search size={16} />
                                    </span>
                                </div>

                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="row">
                                {!data || data.length === 0 ? (
                                    <EmptyPage />
                                ) : (
                                    <BrandList list={data} />
                                )}
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
export default DesignerProfile;
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useApiQuery } from "../../hooks/useApi";
import PrimaryButton from "../PrimaryButton";

interface Collection {
    id: string;
    name: string;
    views: number;
    likes: number;
    designer: {
        name: string;
    };
    thumbnail: string;
}

interface CollectionResponse {
    results: Collection[];
}

const HomeCollection: React.FC = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useApiQuery<CollectionResponse>(
        ["home-collections"],
        "/collections?limit=3&offset=0"
    );
    const topCollections = data?.results ?? [];

    return (
        <>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12 col-xl-12 mb-4">
                    <div className="d-flex justify-content-between flex-row flex-wrap">
                        <div>
                            <h2 className="section-heading">Our Best Collections Today</h2>
                            <p className="section-description">Browse ideas from the best designers, shop from them, and get inspiration for your next appearance.</p>
                        </div>
                        <div>
                            <PrimaryButton onClick={() => {navigate("/collections")}} className="btn btn-new-primary" text="View All" />
                        </div>
                    </div>
                </div>

                <div className="row best-col">
                    {isLoading ? (
                        <>
                            <div className="col-md-12 col-lg-8 mb-3">
                                <Skeleton variant="rounded" width="100%" height={360} />
                                <Skeleton width="45%" height={20} sx={{ mt: 1 }} />
                                <Skeleton width="65%" height={20} />
                                <Skeleton width="35%" height={16} />
                            </div>
                            <div className="col-md-12 col-lg-4">
                                {[1, 2].map((item) => (
                                    <div className="mb-3" key={item}>
                                        <Skeleton variant="rounded" width="100%" height={160} />
                                        <Skeleton width="45%" height={20} sx={{ mt: 1 }} />
                                        <Skeleton width="65%" height={20} />
                                        <Skeleton width="35%" height={16} />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : topCollections.length > 0 ? (
                        <>
                            <div className="col-md-12 col-lg-8 mb-3">
                                <div className="best-col-large">
                                    <Link style={{ textDecoration: "none" }} to={`/profile/${topCollections[0].designer.name}`}>
                                        <img src={topCollections[0].thumbnail} alt={topCollections[0].name} />
                                        <div className="best-col-text mt-2">
                                            <p>{topCollections[0].designer.name}</p>
                                            <p>{topCollections[0].name}</p>
                                            <span>{topCollections[0].likes} likes {topCollections[0].views} views</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                {topCollections.slice(1).map((collection) => (
                                    <Link style={{ textDecoration: "none" }} to={`/profile/${collection.designer.name}`} key={collection.id}>
                                        <div className="best-col-small">
                                            <img src={collection.thumbnail} alt={collection.name} />
                                            <div className="best-col-text mt-2">
                                                <p>{collection.designer.name}</p>
                                                <p>{collection.name}</p>
                                                <span>{collection.likes} likes {collection.views} views</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>

            </div>

        </>
    );

};

export default HomeCollection;
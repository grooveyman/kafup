import { useNavigate } from "react-router-dom";
import { DesignerType } from "../../pages/Home";
import { useTruncate } from "../../hooks/useTrancate";

interface MetaItem {
    views: number;
    likes: number;
    items: number;
}

interface CollectinsProps {
    name: string;
    meta: MetaItem;
    description: string;
    designer: DesignerType;
    collection_id: string;
    collection_img: string;
}

const CollectionsCard: React.FC<CollectinsProps> = ({ name, description, designer, collection_id, collection_img }) => {
    const navigate = useNavigate();
    const fallbackImage = `${import.meta.env.BASE_URL}assets/images/software%20dev.png`;

    return (
        <>
            <div className="w-100" key={collection_id} onClick={() => navigate(`/profile/${designer.brand_name}?collection=${collection_id}`)}>
                <div className="">
                    <div className="designers-card">
                        <div className="designers-img" style={{ overflow: "hidden" }}>
                            <img
                                src={collection_img?.trim() || fallbackImage}
                                alt={name}
                                onError={(event) => {
                                    event.currentTarget.onerror = null;
                                    event.currentTarget.src = fallbackImage;
                                }}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "30vh",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <div className="designers-text">
                            <div>
                                <p className="small-text">{designer.brand_name}</p>
                            </div>
                            <h5>{name}</h5>
                            <p>
                                {useTruncate(description, { words: 20 })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CollectionsCard;
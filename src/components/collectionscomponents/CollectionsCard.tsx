import { useNavigate } from "react-router-dom";
import { DesignerCardMin } from "../DesignerCardMin";
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
    // const 
    return (
        <>
            <div className="" key={collection_id} onClick={() => navigate(`/collections/${designer.name}/${collection_id}`)}>
                <div className="d-flex align-items-center" style={{ height: "100%" }}>
                    <div className="ad-card">
                        <img src={collection_img ? `${collection_img}`:`${import.meta.env.BASE_URL}assets/images/software dev.png`} className="img-rounded" />
                        <div className="ad-content">
                             <h6>{name}</h6>
                             <p>{useTruncate(description, {words:15})}</p>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <DesignerCardMin name={designer.name} image={designer.image} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CollectionsCard;
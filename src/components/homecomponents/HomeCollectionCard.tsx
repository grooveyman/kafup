import { ArrowBigRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MetaItem {
    views: number;
    likes: number;
    items: number;
}
interface Designer {
    name: string;
    dp_img: string;
}
interface CollectinsProps {
    name: string;
    meta: MetaItem;
    description: string;
    designer: Designer;
    collection_id: string;
}



const HomeCollectionCard: React.FC<CollectinsProps> = ({ name, meta, description, designer, collection_id }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="">
                <div className="mb-4 d-flex align-items-center">
                    <div className="collection-cards">
                        <div className="row p-3">
                            <div className="d-flex justify-content-start gap-3">
                                <div className="homecollection-item">
                                    <img src="assets/images/software dev.png" />
                                </div>
                                <div className="homecollection-item">
                                    <h6>{name}</h6>
                                    <span>{meta.views} Views</span><span> {meta.likes} Likes</span>
                                    <p>{description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCollectionCard;
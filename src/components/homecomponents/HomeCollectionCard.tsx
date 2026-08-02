import { useNavigate } from "react-router-dom";
import { useTruncate } from "../../hooks/useTrancate";


interface MetaItem {
    views: number;
    likes: number;
    designs: number;
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



const HomeCollectionCard: React.FC<CollectinsProps> = ({ name, meta, description, collection_id }) => {
    const navigate = useNavigate();
    const words = window.innerWidth < 768 ? 10 : 25; // Adjust the number of words based on screen size
    return (
        <>
            <div className="">
                <div className="mb-4 d-flex align-items-center">
                    <div className="collection-cards">
                        <div className="row p-3">
                            <div className="d-flex justify-content-start gap-3">
                                <div className="homecollection-item">
                                    <img src="assets/images/software dev.png" onClick={() => navigate(`/collections/${collection_id}`)} />
                                </div>
                                <div className="homecollection-item">
                                    <h6>{name}</h6>
                                    <span>{meta.views} Views</span><span> {meta.likes} Likes</span><span> {meta.designs} Designs</span>
                                    <p>{useTruncate(description, { words: words })}</p>
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
import { LucideEye } from "lucide-react";

interface MetaItem{
    views: number;
    likes: number;
    items: number;
}
interface Designer{
    name: string;
    dp_img: string;
}
interface CollectinsProps{
    name: string;
    meta: MetaItem;
    description: string;
    designer: Designer;
    collection_id: string;
}

const CollectionsCard:React.FC<CollectinsProps> = ({name, meta, description, designer, collection_id}) => {
    return (
        <>
            <div className="col-md-3">
                        <div className="ad-card">
                        <img src="assets/images/software dev.png" className="img-rounded" />
                        <div className="ad-content">
                            <div className="cls-head mb-3">
                                <h6>{name}</h6>
                                <span>{meta.views} Views</span><span> {meta.likes} Likes</span>
                                <span> {meta.items} Items</span>
                            </div>
                            <p>{description}</p>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="cls-profile">
                                    <div className="cls-dp d-flex align-items-center justify-content-between">
                                        <img className="" src={designer.dp_img}/>
                                        <p className="">{designer.name}</p>
                                    </div>
                                
                                </div>
                                <LucideEye />
                              
                            </div>
                        </div>
                    </div>
                    </div>
        </>
    );
}

export default CollectionsCard;
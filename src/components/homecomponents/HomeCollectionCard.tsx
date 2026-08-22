
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



const HomeCollectionCard: React.FC<CollectinsProps> = ({ name, meta, designer, collection_id }) => {
    return (
        <>
            <div className="collections-card">
                <div className="mb-4 d-flex align-items-center">
                    <div className="" key={collection_id}>
                        <div className="">
                            <div className="">
                                <img src="/assets/images/software%20dev.png" />
                            </div>
                            <div className="collections-card-text">
                                <div>
                                    <span>{meta.likes} likes {meta.views} follows</span>
                                </div>
                                <h5>{name}</h5>
                                <p>{designer.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCollectionCard;
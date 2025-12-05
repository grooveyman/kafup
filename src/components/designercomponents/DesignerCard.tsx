

interface MetaItem{
    followers: number;
    collections: number;
    deliveries?: number;
}
interface CategoryItem{
    c_name:string;
}
interface DesignerCardProps{
    name:string;
    meta: MetaItem;
    categories:CategoryItem[];
    profile_id: string;
    dp_img: string;
}

const DesignerCard: React.FC<DesignerCardProps> = ({name, meta, categories, profile_id, dp_img}) => {
   
    const handleProfileClick = (id:string) => {
        console.log("Profile clicked for: "+id);
    }

    return (
        <div className="col-md-4 designers-card mt-3">
            <div className="designers-img">
                <img src={dp_img} />
            </div>
            <div className="designers-text">

                <h5>{name}</h5>
                <span>{meta.followers} Followers</span>
                <span> {meta.collections} Collections</span>
                <span> {meta.deliveries} Deliveries</span>

                <div className="designers-category mt-1">
                    <p>Category</p>
                    {categories.map((cat)=>(<span>{cat.c_name}</span>))}     
                </div>

               <hr/>
                <div className="">
                    <button className="btn btn-sm btn-primary" onClick={() => handleProfileClick(profile_id)}>View Profile</button>
                </div>
            </div>
        </div>
    );
};

export default DesignerCard;
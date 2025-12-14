import { useNavigate } from "react-router-dom";


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
    username: string;
    meta: MetaItem;
    categories:CategoryItem[];
    dp_img: string;
}

const DesignerCard: React.FC<DesignerCardProps> = ({name, meta, categories, dp_img, username}) => {
   const navigate = useNavigate();
    const handleProfileClick = (id:string) => {
        console.log("Profile clicked for: "+id);
        navigate(`/designers/${username}`)

    }

    return (
        <div className="col-md-3 designers-card mt-3">
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

               {/* <hr/> */}
                <div className="mt-3">
                    <button className="btn btn-sm btn-primary btn-view-profile" onClick={() => handleProfileClick(username)}>View Profile</button>
                </div>
            </div>
        </div>
    );
};

export default DesignerCard;
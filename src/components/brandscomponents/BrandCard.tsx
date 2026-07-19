import { useNavigate } from "react-router-dom";

interface MetaItem {
    follows: number;
    collections: number;
    deliveries: number;
}

interface CategoryType {
    c_name: string;
}

interface BrandsProps {
    name: string;
    meta: MetaItem;
    brand_id: string;
    // collection_id: string;
    categories: CategoryType[],
    cover_img: string;
}

const BrandsCard: React.FC<BrandsProps> = ({ name, meta, categories, brand_id }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="col-md-6 col-sm-12 col-lg-4 col-xl-3 mb-4">
                <div className="ad-card">
                    <img onClick={() => navigate(`/collections/${brand_id}`)} src="assets/images/software dev.png" className="img-rounded" />
                    <div className="ad-content">
                        <div className="cls-head mb-3">
                            <h6>{name}</h6>
                            <span>{meta.follows} Follows</span><span> {meta.deliveries} Deliveries</span>
                            <span> {meta.collections} Collections</span>
                        </div>
                        <div className="brands-category">
                            <div className="mb-2">
                                <span>Category</span>
                            </div>
                            {categories.map((cat) => (<span>{cat.c_name}</span>))}
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BrandsCard;
import { Designer } from "../pages/Details";

interface DesignerCardProp{
    designer: Designer;
}

export const DesignerCard: React.FC<DesignerCardProp> = ({designer}) => {
    return (
        <>
            <div className="small-title">
                Designer
                <hr />
            </div>
            <div className="d-flex justify-content-start gap-2">
                <div>
                    <img
                        src={`${import.meta.env.BASE_URL}assets/images/software dev.png`}
                        alt=""
                        className="designer-dp"
                    />

                </div>


                <div className="designer-card-meta">
                    <h6>{designer.brand_name}</h6>
                    <div className="d-flex justify-content-start flex-wrap flex-row flex-grow gap-1">
                        <span>{designer.meta.likes} likes</span>
                        <span>{designer.meta.follows} follows</span>
                        <span>{designer.meta.designs} designs</span>
                        <span>{designer.meta.collections} collections</span>
                    </div>
                </div>
            </div>
        </>
    );
};
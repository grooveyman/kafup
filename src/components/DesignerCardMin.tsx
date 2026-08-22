import { DesignerType } from "../pages/Home";


export const DesignerCardMin: React.FC<DesignerType> = ({name, image}) => {
    return (
        <>
            
            <div className="d-flex justify-content-start gap-2 designer-card-min">
                <div>
                    <img
                        src={image? image:`${import.meta.env.BASE_URL}assets/images/software dev.png`}
                        alt=""
                        className="designer-dp"
                    />
                </div>
                <div className="d-flex align-items-center">
                    <h6>{name}</h6>
                </div>
            </div>
        </>
    );
};
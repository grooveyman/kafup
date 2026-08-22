


export const DesignerCard: React.FC = () => {
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
                    <h6>Selorm Closet</h6>
                    <div className="d-flex justify-content-start flex-wrap flex-row flex-grow gap-1">
                        <span>41 likes</span>
                        <span>9 follows</span>
                        <span>23 designs</span>
                        <span>18 collections</span>
                    </div>
                </div>
            </div>
        </>
    );
};
import "../assets/css/collections.css";

const Collections:React.FC = () => {
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="collection-container">
                        <img src="assets/images/sew.webp" className="img-fluid collection-img"/>
                        <div className="collection-head">
                            <h6>Collection Name</h6>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis asperiores ullam rerum necessitatibus adipisci iusto aut, praesentium, inventore eius ab autem id ipsa veniam, dolore debitis quaerat libero aspernatur quibusdam?</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="collection-container">
                        <img src="assets/images/sew.webp" className="img-fluid collection-img"/>
                        <div className="collection-head">
                            <h6>Collection Name</h6>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis asperiores ullam rerum necessitatibus adipisci iusto aut, praesentium, inventore eius ab autem id ipsa veniam, dolore debitis quaerat libero aspernatur quibusdam?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Collections;
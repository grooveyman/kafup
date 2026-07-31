import { ArrowBigRightIcon } from "lucide-react";

const HomeCollectionCard: React.FC = () => {
    return (
        <>
            <div className="">
                <div className="homecollection-item">
                    <img src="assets/images/brandcover.jpg" className="img-fluid" />
                    <div className="homecollection-overlay">
                        <h5>Collection Name</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam aliquid quod et consectetur, culpa voluptatum ex odio at optio alias. Esse aliquam consectetur officiis nihil suscipit corrupti dolores optio saepe.</p>
                        <button className="btn btn-dark rounded-circle icon-btn">
                            <ArrowBigRightIcon/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCollectionCard;
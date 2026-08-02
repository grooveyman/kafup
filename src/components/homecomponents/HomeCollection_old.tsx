import CollectionsCard from "../collectionscomponents/CollectionsCard";
import Designers from "./Designers";
import HomeCollectionCard from "./HomeCollectionCard";


const HomeCollection: React.FC = () => {

    return (
        <>
            <div className="collection-hero px-5 d-flex align-items-center">
                <h2 className="">Our Best Collections Today</h2>
            </div>
            <div className="collection-cards">
                <div className="row px-5">
                    <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4">
                        <Designers />
                    </div>
                    <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4">
                        <Designers />
                    </div>
                    <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4">
                        <Designers />
                    </div>
                </div>

            </div>
        </>
    );

};

export default HomeCollection;
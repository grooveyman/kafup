import CollectionsCard from "../collectionscomponents/CollectionsCard";
import HomeCollectionCard from "./HomeCollectionCard";


const HomeCollection: React.FC = () => {

    return (
        <>
            <div className="collection-hero">
                <h2>Our Best Collections Today</h2>
            </div>
            <div className="collection-cards">
                <div className="row px-5">
                    <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4">
                        <CollectionsCard name={"collection.name"} meta={{ views: 43, likes: 32, items: 2 }} designer={{ name: "home", dp_img: "dpimg" }} collection_id={"id"} description={"desc"} />
                    </div>
                    <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4">
                        <CollectionsCard name={"collection.name"} meta={{ views: 43, likes: 32, items: 2 }} designer={{ name: "home", dp_img: "dpimg" }} collection_id={"id"} description={"desc"} />
                    </div>
                    <div className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4">
                        <CollectionsCard name={"collection.name"} meta={{ views: 43, likes: 32, items: 2 }} designer={{ name: "home", dp_img: "dpimg" }} collection_id={"id"} description={"desc"} />
                    </div>
                </div>

            </div>
        </>
    );

};

export default HomeCollection;
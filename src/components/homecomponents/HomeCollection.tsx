
import HomeCollectionCard from "./HomeCollectionCard";


const HomeCollection: React.FC = () => {

    return (
        <>
            <div className="row">
                <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6 mb-4">
                    <div className="collection-hero d-flex align-items-center px-5">
                        <h2 className="">Our Best Collections Today</h2>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6 mb-4 d-flex align-items-center">
                    <div>
                        <HomeCollectionCard name="Collection Name" meta={{ views: 100, likes: 50, items: 10 }} description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit" designer={{ name: "Designer Name", dp_img: "assets/images/designer.jpg" }} collection_id="1" />
                        <HomeCollectionCard name="Collection Name" meta={{ views: 100, likes: 50, items: 10 }} description="Lorem ipsum dolor sit amet consectetur adipisicing elit." designer={{ name: "Designer Name", dp_img: "assets/images/designer.jpg" }} collection_id="1" />
                        <HomeCollectionCard name="Collection Name" meta={{ views: 100, likes: 50, items: 10 }} description="Lorem ipsum dolor sit amet consectetur adipisicing elit." designer={{ name: "Designer Name", dp_img: "assets/images/designer.jpg" }} collection_id="1" />
                    </div>

                </div>


            </div>

        </>
    );

};

export default HomeCollection;
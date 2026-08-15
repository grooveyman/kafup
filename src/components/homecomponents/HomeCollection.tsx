
import HomeCollectionCard from "./HomeCollectionCard";


const HomeCollection: React.FC = () => {

    const topCollections = [
        {
            name: "Collection Name",
            meta: { views: 100, likes: 50, items: 10, designs: 45 },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit",
            designer: { name: "Designer Name", dp_img: "assets/images/designer.jpg" },
            collection_id: "1",

        },
        {
            name: "Collection Name",
            meta: { views: 100, likes: 50, items: 10, designs: 4 },
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..",
            designer: { name: "Designer Name", dp_img: "assets/images/designer.jpg" },
            collection_id: "2"
        },
        {
            name: "Collection Name",
            meta: { views: 100, likes: 50, items: 10, designs: 90 },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            designer: { name: "Designer Name", dp_img: "assets/images/designer.jpg" },
            collection_id: "3"
        }
    ];

    return (
        <>
            <div className="row">
                <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6 mb-4">
                    <h2 className="">Our Best Collections Today</h2>

                </div>


                <div className="row">
                    {topCollections.map((collection) => (
                        <div className="col-md-6 col-sm-12 col-lg-4">
                            <HomeCollectionCard name={collection.name} meta={collection.meta} description={collection.description} designer={collection.designer} collection_id={collection.collection_id} />
                        </div>
                    ))}
                </div>
            </div>

        </>
    );

};

export default HomeCollection;
import PrimaryButton from "../PrimaryButton";


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
                <div className="col-md-12 col-sm-12 col-lg-12 col-xl-12 mb-4">
                    <div className="d-flex justify-content-between flex-row flex-wrap">
                        <div>
                            <h2 className="section-heading">Our Best Collections Today</h2>
                            <p className="section-description">Browse ideas from the best designers, shop from them, and get inspiration for your next appearance.</p>
                        </div>
                        <div>
                            <PrimaryButton onClick={() => { }} className="btn btn-new-primary" text="View All" />
                        </div>
                    </div>
                </div>

                <div className="row best-col">
                    <div className="col-md-12 col-lg-8 mb-3">
                        <div className="best-col-large">
                            <img src="assets/images/carousel 11.png" />
                            <div className="best-col-text mt-2">
                                <p>{topCollections[0].designer.name}</p>
                                <p>{topCollections[0].name}</p>
                                <span>{topCollections[0].meta.likes} likes {topCollections[0].meta.views} views</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        {topCollections.slice(1).map((collection) => (
                            <div className="best-col-small">
                                <img src="assets/images/carousel 10.png" alt="" className="" />
                                <div className="best-col-text mt-2">
                                    <p>{collection.designer.name}</p>
                                    <p>{collection.name}</p>
                                    <span>{collection.meta.likes} likes {collection.meta.views} views</span>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>

        </>
    );

};

export default HomeCollection;
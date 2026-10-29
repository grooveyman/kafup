import { useApiQuery } from "../../hooks/useApi";
import { CollectionType } from "../../pages/Home";
import EmptyPage from "../EmptyPage";


const HomeCollection: React.FC = () => {

    const topCollections = [
        {
            name: "Collection Name",
            meta: { views: 100, likes: 50, items: 10, designs: 45 },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit",
            designer: { name: "Designer Name", dp_img: "assets/images/carousel 10.png" },
            collection_id: "1",
            thumbnail: "assets/images/carousel 7.png"

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

    const { data, isLoading } = useApiQuery<CollectionType[]>(["top-collections"], "/collections/top");
    console.log("Collection log");
    console.log(isLoading ? "" : data);
    return (
        <>
            <div className="row">
                <div className="col-md-6 col-sm-12 col-lg-6 col-xl-6 mb-4">
                    <h2 className="">Our Best Collections Today</h2>
                </div>

                {!isLoading && data?.length == 0 || data === undefined ? (<EmptyPage />) : (
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="best-col-large">
                                <img src={data?.[0]?.thumbnail} alt="Top Collection" className="img-fluid" />
                                <div className="best-col-text mt-2">
                                    <p>{data?.[0]?.designer.brand_name}</p>
                                    <p>{data?.[0]?.name}</p>
                                    <span>{data?.[0]?.clicks} view(s)</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            {data?.slice(1).map((collection) => (
                                <div className="best-col-small">
                                    <img src={collection.thumbnail} alt="" className="" />
                                    <div className="best-col-text mt-2">
                                        <p>{collection.designer.brand_name}</p>
                                        <p>{collection.name}</p>
                                        <span>{collection.clicks} view(s)</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                )}



            </div>

        </>
    );

};

export default HomeCollection;
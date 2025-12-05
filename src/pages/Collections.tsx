import "../assets/css/collections.css";
import CollectionsCard from "../components/collectionscomponents/CollectionsCard";
import { useEffect, useState } from "react";
import NavFilter from "../components/explorecomponents/NavFilter";
import EmptyPage from "../components/EmptyPage";

const Collections: React.FC = () => {
    const filters = [
        { id: "all", name: "All" },
        { id: "popular", name: "Popular" },
        { id: "new", name: "New" },
        { id: "toprated", name: "Top Rated" }
    ];
    const [selectedFilter, setSelectedFilter] = useState<string | number>("all");
    const [items, setItems] = useState<any[]>([]);


    const fetchData = (filterKey: string | number) => {
        const collections: any = {
            all: [
            {
                id: "4232eads",
                name: "Kaftan Collection",
                views: 23,
                likes: 34,
                items: 2,
                description: "Lorem ipsum something big is coming soon on your screens.",
                designer: {
                    name: "Ampadu Theophilus",
                    img: "assets/images/software dev.png"
                }
            },
            {
                id: "23eww",
                name: "Batakari Suit",
                views: 3,
                likes: 89,
                items: 90,
                description: "Lorem ipsum something big is coming soon on your screens.",
                designer: {
                    name: "Selinam Aku",
                    img: "assets/images/software dev.png"
                }
            }

        ]};
        return collections[filterKey] || [];
    }

    //fetch on filter change
    useEffect(() => {
        const data = fetchData(selectedFilter);
        setItems(data);
    }, [selectedFilter]);
    return (
        <>
            <div className="container">
                <div className="row">
                    <NavFilter filters={filters} selectedFilter={selectedFilter} onChange={(id) => setSelectedFilter(id)} />
                </div>
                <div className="row mt-3">
                    {items.length == 0 && <EmptyPage />}
                    {items.map((collection) => {
                        return (<CollectionsCard name={collection.name} meta={{ views: collection.views, likes: collection.likes, items: collection.items }} designer={{ name: collection.designer.name, dp_img: collection.designer.img }} collection_id={collection.id} description={collection.description} />
                        )
                    })}

                </div>
            </div>
        </>
    );
};

export default Collections;
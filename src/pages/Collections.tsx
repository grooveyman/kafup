import "../assets/css/collections.css";
import CollectionsCard from "../components/collectionscomponents/CollectionsCard";
import { useEffect, useState } from "react";
import NavFilter from "../components/explorecomponents/NavFilter";
import EmptyPage from "../components/EmptyPage";
import Breadcrumb from "../components/Breadcrumb";
import SearchField from "../components/SearchField";
import { toast } from "react-toastify";
import PrimaryButton from "../components/PrimaryButton";
import { useApiQuery } from "../hooks/useApi";


const data = [
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
        description: "Lorem ipsum something big is coming soon on your screens. Lorem ipsum something big is coming soon on your screens.",
        designer: {
            name: "Selinam Aku",
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
];

export interface Collection {
    id: string;
    name: string;
    views: number;
    likes: number;
    items: number;
    description: string;
    designer: {
        name: string;
        img: string;
    };
}


const Collections: React.FC = () => {

    const filters = [
        { id: "all", name: "All" },
        { id: "popular", name: "Popular" },
        { id: "new", name: "New" },
        { id: "toprated", name: "Top Rated" }
    ];

    const [selectedFilters, setSelectedFilters] =
        useState<string[]>(["all"]);

    const params = new URLSearchParams();
    params.set("limit", "20");
    params.set("offset", "0");
    selectedFilters.forEach((filter) => {
        if (filter !== "all") {
            params.append("filter[]", filter);
        }
    });

    const endpoint = `/collections?${params.toString()}`;

    const { data, isLoading } = useApiQuery<Collection[]>(["collections"], endpoint);



    const [searchKey, setSearchKey] = useState("");

        // Filter collections
    const filteredItems = (data ?? []).filter((item) => item.name.toLowerCase().includes(searchKey.toLowerCase()));

    
    // Toggle filters
    const handleFilterChange = (id: string) => {
        setSelectedFilters((prev) => {

            // All clears all filters
            if (id === "all") {
                return prev.includes("all") ? [] : ["all"];
            }

            const withoutAll = prev.filter((filterId) => filterId !== "all");

            // Remove if already selected
            if (withoutAll.includes(id)) {
                const updated = withoutAll.filter((filteredId) => filteredId !== id);
                return updated.length === 0 ? ["all"] : updated;
            }

            // Add filter
            return [...withoutAll, id];
        });
    };


    const handleSearch = (searchTerm: string) => {
        setSearchKey(searchTerm);
    };

    const handleSearchSubmit = (value: string) => {
        toast.success("You'll be searching soon...");
    };

    const handleLoadMore = () => {
        toast.success("More will be loaded");
    };

    return (
        <div className="container">

            <Breadcrumb
                crumbs={[
                    { label: "Home", href: "/" },
                    { label: "Collections", href: "" }
                ]}
            />

            <div className="row">

                <div className="col-md-8">
                    <NavFilter
                        filters={filters}
                        selectedFilters={selectedFilters}
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="col-md-4">
                    <SearchField
                        value={searchKey}
                        onChange={handleSearch}
                        placeholder="Search Collection"
                        onSearchSubmit={handleSearchSubmit}
                    />
                </div>

            </div>

            <div className="row mt-3">

                {filteredItems.length === 0 && (
                    <EmptyPage />
                )}

                {filteredItems.map((collection) => (
                    <div
                        key={collection.id}
                        className="col-md-6 col-sm-12 col-lg-4 col-xl-3 mb-4 hover-effect"
                    >
                        <CollectionsCard
                            name={collection.name}
                            meta={{
                                views: collection.views,
                                likes: collection.likes,
                                items: collection.items
                            }}
                            designer={{
                                name: collection.designer.name,
                                dp_img: collection.designer.img
                            }}
                            collection_id={collection.id}
                            description={collection.description}
                        />
                    </div>
                ))}

            </div>

            <div className="row mt-4">
                <div className="d-flex justify-content-center">
                    <PrimaryButton text="Load More" onClick={handleLoadMore} />
                </div>
            </div>
        </div>
    );
};

export default Collections;
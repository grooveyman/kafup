import "../assets/css/collections.css";
import CollectionsCard from "../components/collectionscomponents/CollectionsCard";
import { useState } from "react";
import NavFilter from "../components/explorecomponents/NavFilter";
import EmptyPage from "../components/EmptyPage";
import Breadcrumb from "../components/Breadcrumb";
import SearchField from "../components/SearchField";
import { toast } from "react-toastify";

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
        description: "Lorem ipsum something big is coming soon on your screens.",
        designer: {
            name: "Selinam Aku",
            img: "assets/images/software dev.png"
        }
    }
];

const Collections: React.FC = () => {

    const filters = [
        { id: "all", name: "All" },
        { id: "popular", name: "Popular" },
        { id: "new", name: "New" },
        { id: "toprated", name: "Top Rated" }
    ];

    const [selectedFilters, setSelectedFilters] =
        useState<(string | number)[]>(["all"]);

    const [searchKey, setSearchKey] = useState("");

    // Toggle filters
    const handleFilterChange = (id: string | number) => {
        setSelectedFilters((prev) => {

            // All clears all filters
            if (id === "all") {
                return [];
            }

            // Remove if already selected
            if (prev.includes(id)) {
                return prev.filter((filterId) => filterId !== id);
            }

            // Add filter
            return [...prev, id];
        });
    };

    // Filter collections
    const filteredItems = data
        .filter((item) => {

            // No filters = show everything
            if (selectedFilters.length === 0) {
                return true;
            }

            // Popular
            if (selectedFilters.includes("popular")) {
                // Example condition
                if (item.likes < 50) {
                    return false;
                }
            }

            return true;
        })
        .filter((item) =>
            item.name
                .toLowerCase()
                .includes(searchKey.toLowerCase())
        );

    const handleSearch = (searchTerm: string) => {
        setSearchKey(searchTerm);
    };

    const handleSearchSubmit = (value: string) => {
        toast.success("You'll be searching soon...");
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
                        className="col-md-6 col-sm-12 col-lg-4 col-xl-3 mb-4"
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

        </div>
    );
};

export default Collections;
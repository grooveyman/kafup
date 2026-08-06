import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";

import "../assets/css/brandprofile.css";

import Breadcrumb from "../components/Breadcrumb";
import EmptyPage from "../components/EmptyPage";
import ProfileCard from "../components/brandscomponents/ProfileCard";
import BrandList from "../components/brandscomponents/BrandList";

import { useApiQuery } from "../hooks/useApi";
import { Product } from "./Home";

const DesignerProfile: React.FC = () => {
    const { username, collection_id } = useParams();

    // --------------------------------------------------
    // State
    // --------------------------------------------------

    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCollection, setSelectedCollection] = useState("");
    const [search, setSearch] = useState("");

    // --------------------------------------------------
    // Fetch designs
    // --------------------------------------------------

    const endpoint = "/designs/";

    const { data, isLoading } = useApiQuery<Product[]>(
        ["designs", username ?? "", collection_id ?? ""],
        endpoint
    );

    console.log(data);

    // --------------------------------------------------
    // Collections
    // --------------------------------------------------

    const collections = useMemo(() => {
        return [
            ...new Set(
                data
                    ?.map((item) => item.collections?.name)
                    .filter(
                        (collection): collection is string =>
                            Boolean(collection)
                    ) ?? []
            ),
        ];
    }, [data]);

    // --------------------------------------------------
    // Categories
    // --------------------------------------------------

    const categories = useMemo(() => {
        return [
            ...new Set(
                data
                    ?.map((item) => item.categories?.name)
                    .filter(
                        (category): category is string =>
                            Boolean(category)
                    ) ?? []
            ),
        ];
    }, [data]);

    // --------------------------------------------------
    // Filter designs
    // --------------------------------------------------

    const filteredData = useMemo(() => {
        if (!data) return [];

        const searchTerm = search.trim().toLowerCase();

        return data.filter((item) => {
            // Route collection filter
            // const matchesRouteCollection = collection_id
            //     ? item.collections?.name === collection_id
            //     : true;

            // Dropdown collection filter
            const matchesCollection = selectedCollection
                ? item.collections?.name === selectedCollection
                : true;

            // Dropdown category filter
            const matchesCategory = selectedCategory
                ? item.categories?.name === selectedCategory
                : true;

            // Search filter
            const matchesSearch = searchTerm
                ? [
                      item.name,
                      item.categories?.name,
                      item.collections?.name,
                  ]
                      .filter(Boolean)
                      .some((value) =>
                          String(value)
                              .toLowerCase()
                              .includes(searchTerm)
                      )
                : true;

            return (
                matchesCollection &&
                matchesCategory &&
                matchesSearch
            );
        });
    }, [
        data,
        collection_id,
        selectedCollection,
        selectedCategory,
        search,
    ]);

    // --------------------------------------------------
    // Reset filters
    // --------------------------------------------------

    const resetFilters = () => {
        setSelectedCollection("");
        setSelectedCategory("");
        setSearch("");
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="container">
                <Breadcrumb
                    crumbs={[
                        {
                            label: "Home",
                            href: "/",
                        },
                        {
                            label: "Brands",
                            href: "/kafup/brands",
                        },
                        {
                            label: "Profile",
                        },
                    ]}
                />
            </div>

            {/* Cover */}
            <div className="row">
                <div className="brand-cover">
                    <img
                        src="https://amcconsult.com/wp-content/uploads/2023/09/Article_Fast-Fashion-1.jpg"
                        alt="Designer cover"
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="container mt-5 mb-5">
                <div className="row">

                    {/* Profile */}
                    <div className="mb-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6">
                        <ProfileCard />
                    </div>

                    {/* Designs */}
                    <div className="col-md-6 col-sm-6 col-xs-6 col-lg-8">

                        {/* Filters */}
                        <div className="d-flex justify-content-start flex-row flex-wrap brand-filters gap-2">

                            {/* Collections */}
                            <div>
                                <select
                                    className="form-select"
                                    value={selectedCollection}
                                    onChange={(e) =>
                                        setSelectedCollection(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Collections
                                    </option>

                                    {collections.map((collection) => (
                                        <option
                                            key={collection}
                                            value={collection}
                                        >
                                            {collection}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Categories */}
                            <div>
                                <select
                                    className="form-select"
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Categories
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Search */}
                            <div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />

                                    <span
                                        className="input-group-text"
                                        style={{
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <Search size={16} />
                                    </span>
                                </div>
                            </div>

                            {/* Reset */}
                            {(selectedCollection ||
                                selectedCategory ||
                                search) && (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={resetFilters}
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Designs */}
                        <div className="mt-4">
                            <div className="row">
                                {isLoading ? (
                                    <div className="text-center py-5">
                                        Loading designs...
                                    </div>
                                ) : filteredData.length === 0 ? (
                                    <EmptyPage />
                                ) : (
                                    <BrandList
                                        list={filteredData}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[]}
            />
        </>
    );
};

export default DesignerProfile;
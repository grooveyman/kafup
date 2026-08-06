import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface FilterProps<T> {
    data: T[];
    onFilter: (filteredData: T[]) => void;

    getSearchText?: (item: T) => string;
    getCategory?: (item: T) => string;
    getCollection?: (item: T) => string;
}

const BrandFilter = <T,>({
    data,
    onFilter,
    getSearchText,
    getCategory,
    getCollection,
}: FilterProps<T>) => {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedCollection, setSelectedCollection] = useState("all");

    const categories = useMemo(() => {
        if (!getCategory) return [];

        return [
            ...new Set(
                data
                    .map(getCategory)
                    .filter(Boolean)
            ),
        ];
    }, [data, getCategory]);

    const collections = useMemo(() => {
        if (!getCollection) return [];

        return [
            ...new Set(
                data
                    .map(getCollection)
                    .filter(Boolean)
            ),
        ];
    }, [data, getCollection]);

    const filteredData = useMemo(() => {
        const term = searchText.trim().toLowerCase();

        return data.filter((item) => {
            const text =
                getSearchText?.(item)?.toLowerCase() ?? "";

            const category =
                getCategory?.(item) ?? "";

            const collection =
                getCollection?.(item) ?? "";

            const matchesSearch =
                !term || text.includes(term);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const matchesCollection =
                selectedCollection === "all" ||
                collection === selectedCollection;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesCollection
            );
        });
    }, [
        data,
        searchText,
        selectedCategory,
        selectedCollection,
        getSearchText,
        getCategory,
        getCollection,
    ]);

    /**
     * Send filtered results to parent.
     *
     * This only runs when the actual filtered result changes.
     */
    useEffect(() => {
        onFilter(filteredData);
    }, [filteredData, onFilter]);

    const handleReset = () => {
        setSearchText("");
        setSelectedCategory("all");
        setSelectedCollection("all");
    };

    return (
        <div className="brand-filters">

            <div className="d-flex justify-content-start flex-row flex-wrap gap-2">

                {/* Collection */}
                {collections.length > 0 && (
                    <div>
                        <select
                            className="form-select"
                            value={selectedCollection}
                            onChange={(e) =>
                                setSelectedCollection(e.target.value)
                            }
                        >
                            <option value="all">
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
                )}

                {/* Category */}
                {categories.length > 0 && (
                    <div>
                        <select
                            className="form-select"
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            <option value="all">
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
                )}

                {/* Search */}
                <div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={searchText}
                            onChange={(e) =>
                                setSearchText(e.target.value)
                            }
                            placeholder="Search..."
                            aria-label="Search designs"
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
                {(searchText ||
                    selectedCategory !== "all" ||
                    selectedCollection !== "all") && (
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className="mt-2">
                <small className="text-muted">
                    {filteredData.length} result
                    {filteredData.length !== 1 ? "s" : ""}
                </small>
            </div>
        </div>
    );
};

export default BrandFilter;
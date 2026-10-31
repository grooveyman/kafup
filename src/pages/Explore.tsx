import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import "../assets/css/explore.css";
import NavFilter from "../components/explorecomponents/NavFilter";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Breadcrumb from "../components/Breadcrumb";
import { EyeIcon } from "lucide-react";
import SearchField from "../components/SearchField";
import { useApiMutation, useApiQuery } from "../hooks/useApi";
import { useDebounce } from "../hooks/useDebounce";
import EmptyPage from "../components/EmptyPage";
import ExploreSkeletonLoader from "../components/explorecomponents/ExploreSkeletonLoader";
import LikeButton from "../components/LikeButton";

interface ExploreProduct {
    id: string;
    name: string;
    image: string;
    designImages?: DesignImage[];
    prodimages?: DesignImage[];
    designer: string;
    meta: {
        likes: number,
        views: number
    },
    categories: { name: string }
}
interface ExploreResponse {
    total: number;
    results: ExploreProduct[];
}
interface DesignImage {
    imgurl: string;
}



const Explore: React.FC = () => {
    const filters = [
        { id: "all", name: "All" },
        { id: "popular", name: "Popular" },
        { id: "new", name: "New" },
        { id: "toprated", name: "Top Rated" }
    ];

    const [selectedFilters, setSelectedFilters] = useState<(string)[]>(["all"]);
    const [lastScroll, setLastScroll] = useState(0);
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState<ExploreProduct[]>([]);
    const limit = 9;

    const { isLoading, data } = useApiQuery<ExploreResponse>(['explore', offset.toString()], `/designs/explore?limit=${limit}&offset=${offset}`);
    console.log(isLoading ? "" : data);

    // Lightbox state
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [slides, setSlides] = useState<{ src: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const queryClient = useQueryClient();
    const clickMutation = useApiMutation<{ message: string }>("/designs/click", "PATCH", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["explore"] });
        },
    });


    const handleFilterChange = (id: string) => {
        setOffset(0);
        setSelectedFilters((prev) => {
            if (id === "all") {
                return [];
            }

            if (prev.includes(id)) {
                return prev.filter((filterId) => filterId !== id);
            }

            return [...prev, id];
        });
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredItems = products.filter((item) => {
        if (selectedFilters.length === 0) {
            return true;
        }

        if (selectedFilters.includes("popular")) {
            if (item.meta.likes < 50) {
                return false;
            }
        }
        return true;
    }).filter((item) => item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));



    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };


    // Hide/show navbar on scroll
    useEffect(() => {
        const navWrapper = document.getElementById("global-nav-wrapper");

        const handleScroll = () => {
            const current = window.scrollY;

            if (current > lastScroll && current > 0) {
                navWrapper?.classList.add("nav-hidden");
            } else {
                navWrapper?.classList.remove("nav-hidden");
            }

            setLastScroll(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScroll]);

    useEffect(() => {
        if (!data?.results) return;
        setProducts((prev) => {
            if (offset === 0) {
                return data.results;
            }
            return [...prev, ...data.results];
        });
    }, [data, offset]);


    const handleSearchSubmit = () => {
    };

    const getDesignSlides = (primaryImage: string, designImages: DesignImage[] = []) => [
        { src: primaryImage },
        ...designImages
            .filter((image) => image.imgurl !== primaryImage)
            .map((image) => ({ src: image.imgurl })),
    ];

    const handleLoadMore = () => {
        setOffset((prev) => prev + limit);
    }

    return (
        <div className="container explore-wrapper">
            <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Explore" }]} />

            {/* Filter navigation */}
            <div className="row">
                <div className="col-md-8">
                    <NavFilter
                        filters={filters}
                        selectedFilters={selectedFilters}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="col-md-4">
                    <SearchField value={searchTerm} onChange={handleSearch} placeholder="Search in explore..." onSearchSubmit={handleSearchSubmit} />

                </div>

            </div>

            {/* Image grid */}
            {isLoading && products.length === 0 ? (
                <ExploreSkeletonLoader count={6} />
            ) : filteredItems?.length === 0 ? (
                <EmptyPage message="No items found in explore."/>
            ) : (
                <>
                    <div className="row">
                        {filteredItems?.map((item) => (
                            <div key={item.id} className="explore-container col-md-4 col-xl-4 col-xs-6 col-lg-4 col-sm-6">
                                <div
                                    className="img-container"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="clickable-image"
                                        onClick={() => {
                                            clickMutation.mutate({ id: item.id });
                                            setSlides(getDesignSlides(
                                                item.image,
                                                item.designImages || item.prodimages
                                            ));
                                            setIndex(0);
                                            setOpen(true);
                                        }}
                                    />

                                    {/* <div className="image-title pt-2">{item.name}</div> */}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>{item.name}</div>
                                    <div>
                                        <div className="d-flex justify-content-start gap-1 align-items-center">
                                            <LikeButton
                                                designId={item.id}
                                                likes={item.meta.likes}
                                                queryKeys={[["explore"]]}
                                            />
                                            <EyeIcon size={14} fill="gray" />
                                            <p style={{ margin: 0, fontSize: "small" }}>{item.meta.views}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="mt-5">
                        <div className="d-flex justify-content-center">
                            {data && products.length < data.total && !isLoading && (
                                <button className="btn btn-primary" onClick={handleLoadMore}>Load More</button>
                            )}
                        </div>
                    </div>
                </>
            )}



            {/* Lightbox viewer */}

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={slides}
            />
        </div>
    );
};

export default Explore;

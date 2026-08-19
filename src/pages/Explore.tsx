import { useEffect, useState } from "react";
import "../assets/css/explore.css";
import NavFilter from "../components/explorecomponents/NavFilter";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Breadcrumb from "../components/Breadcrumb";
import { EyeIcon, Heart } from "lucide-react";
import SearchField from "../components/SearchField";

const data = [
    {
        id: '3232',
        name: "Artist Design",
        image: "assets/images/software dev.png",
        meta: {
            likes: 32,
            views: 33
        },
        categories: {
            name: "Children"
        }
    },
    {
        id: '764',
        name: "Artist Design",
        image: "assets/images/software dev.png",
        meta: {
            likes: 32,
            views: 33
        },
        categories: {
            name: "Children"
        }
    },
    {
        id: '765',
        name: "Artist Design",
        image: "assets/images/software dev.png",
        meta: {
            likes: 32,
            views: 33
        },
        categories: {
            name: "Sons"
        }
    },
    {
        id: '765',
        name: "Artist Design",
        image: "assets/images/software dev.png",
        meta: {
            likes: 32,
            views: 33
        },
        categories: {
            name: "Women"
        }
    },
    {
        id: '3256',
        name: "Artist Design",
        image: "assets/images/software dev.png",
        meta: {
            likes: 32,
            views: 33
        },
        categories: {
            name: "Men"
        }
    },
    {
        id: '2131',
        name: "Artist Design",
        image: "assets/images/software dev.png",
        meta: {
            likes: 32,
            views: 12
        },
        categories: {
            name: "Children"
        }
    }
];

const Explore: React.FC = () => {
    const filters = [
        { id: "all", name: "All" },
        { id: "popular", name: "Popular" },
        { id: "new", name: "New" },
        { id: "toprated", name: "Top Rated" }
    ];

    const [selectedFilters, setSelectedFilters] = useState<(string)[]>(["all"]);
    const [items, setItems] = useState<any[]>([]);
    const [lastScroll, setLastScroll] = useState(0);



    // Lightbox state
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [slides, setSlides] = useState<{ src: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState("");


    const handleFilterChange = (id: string) => {
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

    const filteredItems = data.filter((item) => {
        if (selectedFilters.length === 0) {
            return true;
        }

        if (selectedFilters.includes("popular")) {
            if (item.meta.likes < 50) {
                return false;
            }
        }
        return true;
    }).filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    

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



    const handleSearchSubmit = () => {
    };

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
            <div className="row">
                {filteredItems.map((item, i) => (
                    <div className="explore-container col-md-4 col-xl-4 col-xs-6 col-lg-4 col-sm-6">
                        <div
                            className="img-container"
                            key={i}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="clickable-image"
                                onClick={() => {
                                    setSlides(filteredItems.map(img => ({ src: img.image })));
                                    setIndex(i);
                                    setOpen(true);
                                }}
                            />

                            {/* <div className="image-title pt-2">{item.name}</div> */}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>{item.name}</div>
                            <div>
                                <div className="d-flex justify-content-start gap-1 align-items-center">
                                    <Heart size={14} />
                                    <p style={{ margin: 0, fontSize: "small" }}>{item.meta.likes}</p>
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
                    <button className="btn btn-primary">Load More</button>
                </div>
            </div>


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

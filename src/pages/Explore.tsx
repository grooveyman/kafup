    import { useEffect, useState } from "react";
    import "../assets/css/explore.css";
    import NavFilter from "../components/explorecomponents/NavFilter";

    import Lightbox from "yet-another-react-lightbox";
    import "yet-another-react-lightbox/styles.css";

    const Explore: React.FC = () => {
        const filters = [
            { id: "all", name: "All" },
            { id: "popular", name: "Popular" },
            { id: "new", name: "New" },
            { id: "toprated", name: "Top Rated" }
        ];

        const [selectedFilter, setSelectedFilter] = useState<string | number>("all");
        const [items, setItems] = useState<any[]>([]);
        const [lastScroll, setLastScroll] = useState(0);

        // Lightbox state
        const [open, setOpen] = useState(false);
        const [index, setIndex] = useState(0);
        const [slides, setSlides] = useState<{ src: string }[]>([]);

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

        // Fake data fetch
        const fetchData = (filterKey: string | number) => {
            const dummyData: any = {
                all: [
                    { image: "assets/images/software dev.png", name: "Something exquisite" },
                    { image: "assets/images/hero3.jpg", name: "New Sturling" },
                    { image: "assets/images/software dev.png", name: "New Sturling" },
                    { image: "assets/images/sew.webp", name: "New Sturling" },
                    { image: "assets/images/hero1.jpg", name: "New Sturling" },
                    { image: "assets/images/sew.webp", name: "New Sturling" },
                ],
                popular: [
                    { image: "assets/images/hero1.jpg", name: "New Sturling" },
                    { image: "assets/images/sew.webp", name: "New Sturling" },
                ],
                new: [
                    { image: "assets/images/hero3.jpg", name: "New Sturling" }
                ],
                toprated: [
                    { image: "assets/images/hero2.jpg", name: "Something exquisite" },
                    { image: "assets/images/hero1.jpg", name: "New Sturling" },
                    { image: "assets/images/hero3.jpg", name: "New Sturling" }
                ]
            };
            return dummyData[filterKey] || [];
        };

        useEffect(() => {
            setItems(fetchData(selectedFilter));
        }, [selectedFilter]);

        return (
            <div className="container ps-5 explore-wrapper">

                {/* Filter navigation */}
                <div className="row">
                    <NavFilter
                        filters={filters}
                        selectedFilter={selectedFilter}
                        onChange={(id) => setSelectedFilter(id)}
                    />
                </div>

                {/* Image grid */}
                <div className="row">
                    {items.map((item, i) => (
                        <div 
                            className="col-xl-3 col-xs-6 col-lg-3 col-sm-6 img-container" 
                            key={i}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="clickable-image"
                                onClick={() => {
                                    setSlides(items.map(img => ({ src: img.image })));
                                    setIndex(i);
                                    setOpen(true);
                                }}
                            />
                            {/* <div className="image-title pt-2">{item.name}</div> */}
                        </div>
                    ))}
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

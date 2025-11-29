import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FilterItem {
    id: string | number;
    name: string;
}

interface NavFilterProps {
    filters: FilterItem[];
    selectedFilter: string | number;
    onChange: (filterId: string | number) => void;
}

const NavFilter: React.FC<NavFilterProps> = ({ filters, selectedFilter, onChange }) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            {/* category navigation */}
            <div className="navfilter sticky-filter mb-3">
                <nav
                    className={`${scrolled ? "scrolled-filter" : "not-scrolled"} navbar navbar-expand-lg`}
                >
                    <div className="container">
                        <div className="row w-100">
                            <div className="col-12">
                                <div className="d-flex w-100 align-items-center gap-2">

                                    {filters.map((f) => (
                                        <div
                                            key={f.id}
                                            className={`filter-item ${selectedFilter === f.id
                                                ? "btn-dark"
                                                : "btn-outline-dark"
                                                }`}
                                            onClick={() => onChange(f.id)}
                                        >
                                            {f.name}
                                        </div>
                                    ))}

                                    {/* Push to far right */}
                                    <div className="ms-auto">
                                        <button
                                            type="button"
                                            className="nav-link btn btn-link p-0"
                                            onClick={() => { }}
                                            aria-label="Open account"
                                        >
                                            <SearchIcon />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    );
};

export default NavFilter;
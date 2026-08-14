import { useEffect, useState } from "react";

interface FilterItem {
    id: string | number;
    name: string;
}

interface NavFilterProps {
    filters: FilterItem[];
    selectedFilters: (string | number)[];
    onChange: (filterId: string | number) => void;
}

const NavFilter: React.FC<NavFilterProps> = ({
    filters,
    selectedFilters,
    onChange
}) => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="navfilter mb-3">
            <nav
                className={`${scrolled ? "scrolled" : "not-scrolled"
                    } navbar navbar-expand-lg`}
            >
                <div className="container">
                    <div className="row w-100">
                        <div className="col-12">
                            <div className="d-flex w-100 align-items-center gap-2">

                                <span>Categories:</span>

                                {filters.map((f) => {
                                    const isSelected = selectedFilters.includes(f.id);
                                    return (
                                        <div
                                            key={f.id}
                                            className={`filter-item ${isSelected
                                                ? "filter-active"
                                                : ""
                                                }`}
                                            onClick={() => onChange(f.id)}
                                        >
                                            {f.name}
                                        </div>
                                    );

                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavFilter;
import React, { useState } from "react";
import "./SizeGuideModal.css";

type SizeSystem = "UK" | "US" | "EU";
type Category = "clothing" | "shoes";

interface ClothingSize {
    size: string;
    uk: string;
    us: string;
    eu: string;
}

const clothingSizes: ClothingSize[] = [
    { size: "XS", uk: "4–6", us: "2–4", eu: "32–34" },
    { size: "S", uk: "8–10", us: "6–8", eu: "36–38" },
    { size: "M", uk: "12–14", us: "10–12", eu: "40–42" },
    { size: "L", uk: "16–18", us: "14–16", eu: "44–46" },
    { size: "XL", uk: "20–22", us: "18–20", eu: "48–50" },
];

// const shoeSizes: ShoeSize[] = [
//     { uk: "3", us: "5", eu: "36", footLength: "22.5 cm" },
//     { uk: "4", us: "6", eu: "37", footLength: "23.5 cm" },
//     { uk: "5", us: "7", eu: "38", footLength: "24.5 cm" },
//     { uk: "6", us: "8", eu: "39", footLength: "25.5 cm" },
//     { uk: "7", us: "9", eu: "40", footLength: "26.0 cm" },
//     { uk: "8", us: "10", eu: "41", footLength: "27.0 cm" },
// ];

export const SizeGuideModal: React.FC = () => {
    const [category, setCategory] = useState<Category>("clothing");
    const [sizeSystem, setSizeSystem] = useState<SizeSystem>("UK");

    return (
        <div
            className="modal fade"
            id="sizeGuideModal"
            tabIndex={-1}
            aria-labelledby="sizeGuideModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content size-guide-modal">

                    {/* Header */}
                    <div className="modal-header border-0 px-4 pt-4">
                        <div>
                            <h1
                                className="modal-title fw-semibold"
                                id="sizeGuideModalLabel"
                            >
                                Size Guide
                            </h1>

                            <p className="text-muted mb-0 mt-1">
                                Find your perfect fit with our size
                                conversion guide.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>

                    <div className="modal-body px-4 pb-4">

                        {/* Category */}
                        <div className="size-guide-section">
                            <label className="size-guide-label">
                                What are you shopping for?
                            </label>

                            <div className="size-category-buttons">
                                <button
                                    type="button"
                                    className={`size-category-btn ${category === "clothing"
                                            ? "active"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        setCategory("clothing")
                                    }
                                >
                                    Clothing
                                </button>
                            </div>
                        </div>

                        {/* Size System */}
                        <div className="size-guide-section mt-4">
                            <label className="size-guide-label">
                                Size system
                            </label>

                            <div className="size-system-tabs">
                                {(["UK", "US", "EU"] as SizeSystem[]).map(
                                    (system) => (
                                        <button
                                            key={system}
                                            type="button"
                                            className={`size-system-tab ${sizeSystem === system
                                                    ? "active"
                                                    : ""
                                                }`}
                                            onClick={() =>
                                                setSizeSystem(system)
                                            }
                                        >
                                            {system}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="table-responsive mt-4">
                            {category === "clothing" && (
                                <table className="table size-guide-table align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Size</th>
                                            <th>{sizeSystem}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {clothingSizes.map((row) => (
                                            <tr key={row.size}>
                                                <td className="fw-semibold">
                                                    {row.size}
                                                </td>

                                                <td>
                                                    {row[sizeSystem.toLowerCase() as "uk" | "us" | "eu"]}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Measurement Guide */}
                        <div className="measurement-guide mt-4">
                            <div className="measurement-guide-icon">
                                
                            </div>

                            <div>
                                <h6 className="mb-1 fw-semibold">
                                    How to measure
                                </h6>

                                <p className="text-muted small mb-0">
                                    For the most accurate fit, measure
                                    yourself using a flexible measuring tape
                                    and compare your measurements with the
                                    product's size chart.
                                </p>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <p className="size-guide-note text-muted small mt-3 mb-0">
                            Sizes may vary slightly between brands and
                            product styles. When in doubt, check the
                            individual product measurements.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer border-0 px-4 pb-4">
                        <button
                            type="button"
                            className="btn btn-dark px-4"
                            data-bs-dismiss="modal"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
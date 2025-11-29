import React, { useEffect, useState } from "react";

interface Item {
    image: string;
    name: string;
}

interface PackedRow {
    items: Item[];
    height: number;
}

interface Props {
    images: Item[];
    targetRowHeight?: number;
    gap?: number;
}

const PackedGallery: React.FC<Props> = ({
    images,
    targetRowHeight = 220,
    gap = 10
}) => {
    const [rows, setRows] = useState<PackedRow[]>([]);

    const calculateRows = () => {
        const containerWidth = document.body.clientWidth - 120; 
        let currentRow: Item[] = [];
        let ratioSum = 0;
        const result: PackedRow[] = [];

        images.forEach((img) => {
            // Assume standard ratio (or option to pre-scan image size)
            const aspect = 1.5;
            currentRow.push(img);
            ratioSum += aspect;

            const rowWidth = ratioSum * targetRowHeight;

            if (rowWidth >= containerWidth) {
                const height = containerWidth / ratioSum;
                result.push({ items: currentRow, height });
                currentRow = [];
                ratioSum = 0;
            }
        });

        if (currentRow.length > 0) {
            result.push({ items: currentRow, height: targetRowHeight });
        }

        setRows(result);
    };

    useEffect(() => {
        calculateRows();
        window.addEventListener("resize", calculateRows);
        return () => window.removeEventListener("resize", calculateRows);
    }, [images]);

    return (
        <div style={{ width: "100%", marginTop: "30px" }}>
            {rows.map((row, i) => (
                <div
                    key={i}
                    style={{
                        display: "flex",
                        gap: `${gap}px`,
                        marginBottom: `${gap}px`,
                        height: row.height
                    }}
                >
                    {row.items.map((img, idx) => (
                        <div
                            key={idx}
                            className="packed-card"
                            style={{
                                flexGrow: 1,
                                overflow: "hidden",
                                borderRadius: "12px",
                                position: "relative",
                                background: "#eee"
                            }}
                        >
                            <img
                                src={img.image}
                                alt={img.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />

                            <div className="packed-title">{img.name}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PackedGallery;

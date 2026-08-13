import { Star } from "lucide-react";

interface StarsProps {
    rate: number;
    size: number;
}
export const StarsComponent: React.FC<StarsProps> = ({ rate, size }) => {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="d-flex align-items-center">
            {/* Full stars */}
            {Array.from({ length: fullStars }).map((_, index) => (
                <Star
                    key={`full-${index}`}
                    size={size}
                    fill="gold"
                    stroke="gold"
                />
            ))}

            {/* Half star */}
            {hasHalfStar && (
                <div className="half-star">
                    <Star size={size} fill="url(#halfGradient)" stroke="gold" />
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="halfGradient">
                                <stop offset="50%" stopColor="gold" />
                                <stop offset="50%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            )}

            {/* Empty stars */}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <Star
                    key={`empty-${index}`}
                    size={15}
                    stroke="#ccc"
                    fill="none"
                />
            ))}
        </div>
    );
}
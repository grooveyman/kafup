

interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    text?: string;
}

const Loading: React.FC<SpinnerProps> = ({size = "md", text}) => {
    const sizeClass = size === "sm"
        ? "spinner-border-sm"
        : "";
    return (
        <div className="d-flex justify-content-center align-items-center gap-2">
            <div
                className={`spinner-border ${sizeClass}`}
                role="status"
            >
                <span className="visually-hidden">
                    Loading data...
                </span>
            </div>

            {text && <span>{text}</span>}
        </div>
    );
};

export default Loading;
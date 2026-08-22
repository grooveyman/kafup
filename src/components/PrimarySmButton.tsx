

interface PrimaryButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}
const PrimarySmButton:React.FC<PrimaryButtonProps> = ({ text, onClick, className }) => {
    return (
        <button className={`btn btn-sm btn-primary ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default PrimarySmButton;
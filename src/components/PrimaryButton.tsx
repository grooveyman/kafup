

interface PrimaryButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}
const PrimaryButton:React.FC<PrimaryButtonProps> = ({ text, onClick, className }) => {
    return (
        <button className={`btn btn-primary ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default PrimaryButton;
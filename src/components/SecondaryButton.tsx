

interface SecondaryButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}
const SecondaryButton:React.FC<SecondaryButtonProps> = ({ text, onClick, className }) => {
    return (
        <button className={`btn btn-complement ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default SecondaryButton;
import { Search } from "lucide-react";


interface SearchFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onSearchSubmit?: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ value, onChange, placeholder = "Search...", onSearchSubmit }) => {
    return (
        <div className="input-group">
            <input type="text" value={value} className="form-control searchfield" placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
            <button className="btn btn-primary  ms-2" onClick={() => onSearchSubmit?.(value)}><Search /></button>
        </div>
    );
}

export default SearchField;
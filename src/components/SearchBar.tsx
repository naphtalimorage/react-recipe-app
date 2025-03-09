import {useState} from "react";
import {Search} from "lucide-react";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState<string>("");
    const navigate = useNavigate();

    const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim() !== "") {
            navigate(`/search?query=${query}`);
        } else {
            console.warn("Search query cannot be empty");
        }
    };

    return (
        <>
            <form onSubmit={handleNavigation} className="flex  justify-center  ">
                <div className="relative w-full ">
                    <input
                        placeholder="Search for food recipe in minutes..."
                        value={query}
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    <button
                        type="submit"
                        className="  absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
                    >
                        <Search className="size-5"/>
                    </button>
                    </div>
            </form>
        </>
    );
};

export default SearchBar;

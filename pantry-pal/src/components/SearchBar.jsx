import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function SearchBar() {
    return (
        <div className="relative flex items-center max-w-3xl">
            {/* Magnifying Glass Icon */}
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 text-gray-500"
            />

            {/* Search Input */}
            <input
                className="w-full border rounded-2xl p-2 pl-10" // pl-10 for icon spacing
                type="text"
                placeholder="Search categories"
            />
        </div>
    )
}

export default SearchBar;
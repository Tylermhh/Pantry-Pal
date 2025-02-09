import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Navbar() {
    return (
        <header className="flex justify-self-end bg-amber-800 min-h-10 items-center justify-center">
            <nav className="flex gap-10">
                <a><FontAwesomeIcon icon={faHouse}/></a>
                <a><FontAwesomeIcon icon={faUser}/></a>
            </nav>
        </header>
    )
}

export default Navbar;
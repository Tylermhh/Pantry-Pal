import {Link} from "react-router-dom";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Navbar() {
    return (
        <header className="flex bg-amber-800 min-h-10 items-center px-4">
            <nav className="flex gap-10 justify-between w-full">
                <Link to="/"><p className="font-bold">Pantry Pal</p></Link>
                <Link to="profile"><FontAwesomeIcon icon={faUser}/></Link>
            </nav>
        </header>
    )
}

export default Navbar;
import {Link} from "react-router-dom";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";

function Navbar() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    function handleToggle() {
        setDarkMode(prevMode => !prevMode);
    }
    return (
        <header className="flex bgSecondary textHeader min-h-10 items-center px-4">
            <nav className="flex gap-10 justify-between w-full">
                <Link to="/"><p className="font-bold">Pantry Pal</p></Link>
                <div className="flex gap-3">
                    <label>
                        Dark Mode <input onChange={handleToggle} type="checkbox" />
                    </label>
                    <Link to="profile"><FontAwesomeIcon icon={faUser}/></Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
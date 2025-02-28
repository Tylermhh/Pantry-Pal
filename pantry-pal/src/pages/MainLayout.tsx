import Navbar from "../components/Navbar.tsx";
import {Outlet} from "react-router-dom";

export function MainLayout() {
    return (
        <div>
            <div className="sticky top-0 z-1">
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
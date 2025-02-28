import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import {MainLayout} from "./pages/MainLayout.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App

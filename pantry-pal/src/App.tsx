import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import {MainLayout} from "./pages/MainLayout.js";
import RegisterPage from "./auth/RegisterPage.tsx";
import LoginPage from "./auth/LoginPage.tsx";
import {ProtectedRoute} from "./auth/ProtectedRoute.tsx";
import {useState} from "react";
import {useDataFetching} from "./pages/useDataFetching";

const defaultPantryGroups  = [
    {
        id: "group-0",
        category: "Fridge",
        items: [
            { id: "milk", name: "Milk", count: 1 },
            { id: "eggs", name: "Eggs", count: 12 },
            { id: "cheese", name: "Cheese", count: 2 },
            { id: "butter", name: "Butter", count: 1 },
            { id: "mayo", name: "Mayo", count: 1 },
        ],
        imageURL: "/fridge_image.webp",
    },
    {
        id: "group-1",
        category: "Pantry",
        items: [
            { id: "rice", name: "Rice", count: 5 },
            { id: "pasta", name: "Pasta", count: 3 },
            { id: "beans", name: "Canned Beans", count: 4 },
            { id: "flour", name: "Flour", count: 2 },
        ],
        imageURL: "/pantry_image.jpg",
    },
    {
        id: "group-2",
        category: "Freezer",
        items: [
            { id: "pizza", name: "Frozen Pizza", count: 2 },
            { id: "icecream", name: "Ice Cream", count: 1 },
            { id: "veges", name: "Vegetables", count: 3 },
        ],
        imageURL: "/freezer_image.jpg",
    },
    {
        id: "group-3",
        category: "Tools",
        items: [
            { id: "knife", name: "Knife", count: 1 },
            { id: "spat", name: "Spatula", count: 1 },
        ],
        imageURL: "/tools_image.webp",
    },
]

function App() {
    const [ authToken, setAuthToken ] = useState("");
    const [ userId , setUserId ] = useState("tyler@example.com");
    const{ isLoading, pantryData, userName } = useDataFetching(userId, authToken);
    const [pantryGroups, setPantryGroups] = useState(defaultPantryGroups);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={
                        <ProtectedRoute authToken={authToken} >
                            <Home userId={userId} authToken={authToken} isLoading={isLoading} pantryGroups={pantryGroups} setPantryGroups={setPantryGroups}/>
                        </ProtectedRoute>}
                    />
                    <Route path="/profile" element={
                        <ProtectedRoute authToken={authToken} >
                            <Profile userName={userName} email={userId}/>
                        </ProtectedRoute>}
                    />

                    <Route path="register" element={<RegisterPage setAuthToken={setAuthToken}/>} />
                    <Route path="login" element={<LoginPage setAuthToken={setAuthToken}/>} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App

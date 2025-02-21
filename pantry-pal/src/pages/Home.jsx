import PantryGroup from "../components/PantryGroup.jsx";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {useState} from "react";
import { nanoid } from "nanoid";

function Home() {
    const [pantryGroups, setPantryGroups] = useState([
        {id: "group-0", category: "Fridge", numItems: 20, imageURL: "/fridge_image.webp"},
        {id: "group-1", category: "Pantry", numItems: 10, imageURL: "/pantry_image.jpg"},
        {id: "group-2", category: "Freezer", numItems: 5, imageURL: "/freezer_image.jpg"},
        {id: "group-3", category: "Tools", numItems: 7, imageURL: "/tools_image.webp"},
    ]);

    const pantryItems = pantryGroups.map((item) =>
        <PantryGroup
            key={item.id}
            name={item.category}
            numItems={item.numItems}
            imageURL={item.imageURL} />
    )

    function addCategory(pantryGroupName) {
        console.log(`adding ${pantryGroupName}`);
        const newPantryGroup = { id: `todo-${nanoid()}`, category: pantryGroupName, numItems: 0, imageURL: "/default_pantry.jpg" };
        setPantryGroups([...pantryGroups, newPantryGroup]);
    }

    return (
        <>
            <body className="flex flex-col border-3 bg-amber-100 min-h-screen">
                <div className="sticky top-0 z-1">
                    <Navbar/>
                </div>

                {/*list of saved categories*/}
                <div className="flex flex-col justify-center p-2 gap-2">
                    <SearchBar />
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:flex md:flex-wrap gap-6">
                        {pantryItems}
                        {/*<li className="flex items-center justify-center min-h-24 md:min-w-[120px]">*/}
                        {/*    <button*/}
                        {/*        className="text-3xl min-w-28 flex items-center justify-center cursor-pointer"*/}
                        {/*        onClick={() => addCategory("Default Cow")}*/}
                        {/*    >*/}
                        {/*        +*/}
                        {/*    </button>*/}
                        {/*</li>*/}

                        <li
                            className="flex items-center justify-center min-h-24 md:min-w-[120px] cursor-pointer"
                            onClick={() => addCategory("Default Cow")}
                        >
                            +
                        </li>
                    </ul>

                </div>
            </body>
        </>
    )
}

export default Home;
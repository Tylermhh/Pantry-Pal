import PantryGroup from "../components/PantryGroup.jsx";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {useState} from "react";
import { nanoid } from "nanoid";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const [pantryGroups, setPantryGroups] = useState([
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
    ]);

    function handleDeleteGroup(groupId) {
        setPantryGroups((prevGroups) => prevGroups.filter(group => group.id !== groupId));
    }

    function handleDeleteItem(groupId, itemId) {
        setPantryGroups((prevGroups) =>
            prevGroups.map((group) =>
                group.id === groupId
                    ? { ...group, items: group.items.filter((item) => item.id !== itemId) }
                    : group
            )
        );
    }

    function handleModifyItem(groupId, itemId, operation) {
        setPantryGroups((prevGroups) =>
            prevGroups.map((group) =>
                group.id === groupId
                    ? {...group,
                        items: group.items.map((item) =>
                            item.id === itemId
                                ? {...item,
                                    count: operation === "add" ? item.count + 1 : Math.max(item.count - 1, 1),
                                } : item
                        ),
                    } : group
            )
        );
    }

    function handleNewItem(groupId, itemName, itemCount) {
        console.log(`Adding new item ${itemName} with count ${itemCount} to group ${groupId}`);
        const newItem = {
            id: nanoid(),
            name: itemName,
            count: itemCount,
        }
        setPantryGroups((prevGroups) =>
            prevGroups.map((group) =>
                group.id === groupId
                    ? {...group,
                        items:  [...group.items, newItem]
                    } : group
            )
        );
    }


    const filteredPantryGroups = pantryGroups.filter(group =>
        group.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pantryItems = filteredPantryGroups.map((item) =>
        <PantryGroup
            key={item.id}
            groupId={item.id}
            name={item.category}
            items={item.items}
            imageURL={item.imageURL}
            handleDeleteGroup={handleDeleteGroup}
            handleDeleteItem={handleDeleteItem}
            handleModifyItem={handleModifyItem}
            handleNewItem={handleNewItem}
        />
    )

    function addCategory(pantryGroupName) {
        const newPantryGroup = {
            id: `group-${nanoid()}`,
            category: pantryGroupName,
            items: [], // Start with an empty items list
            imageURL: "/default_pantry.jpg",
        };
        setPantryGroups([...pantryGroups, newPantryGroup]);
    }


    return (
        <>
            <div className="flex flex-col border-3 bg-amber-100 min-h-screen">
                <div className="sticky top-0 z-1">
                    <Navbar/>
                </div>

                {/*list of saved categories*/}
                <div className="flex flex-col justify-center p-2 gap-2">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:flex md:flex-wrap gap-6">
                        {pantryItems}
                        <li
                            className="flex items-center justify-center rounded-sm min-h-42 md:min-w-[240px] p-2 text-[#3b1105] cursor-pointer text-4xl"
                            onClick={() => addCategory("Default Category")}
                        >
                            +
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default Home;
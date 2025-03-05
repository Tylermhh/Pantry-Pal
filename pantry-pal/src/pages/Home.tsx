import PantryGroup from "../components/PantryGroup.js";
import Navbar from "../components/Navbar.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {useState} from "react";
import { nanoid } from "nanoid";

export interface Item {
    id: string;
    name: string;
    count: number;
}

// Define the interface for each pantry group
export interface PantryGroup {
    id: string;
    category: string;
    items: Item[];  // Use the Item interface here
    imageURL: string;
}

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

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleDeleteGroup(groupId: string) {
        setPantryGroups((prevGroups) => prevGroups.filter(group => group.id !== groupId));
    }

    function handleDeleteItem(groupId: string, itemId: string) {
        setPantryGroups((prevGroups) =>
            prevGroups.map((group) =>
                group.id === groupId
                    ? { ...group, items: group.items.filter((item) => item.id !== itemId) }
                    : group
            )
        );
    }

    function handleModifyItem(groupId: string, itemId: string, operation: string) {
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

    function handleNewItem(groupId: string, itemName: string, itemCount: number) {
        console.log(`Adding new item ${itemName} with count ${itemCount} to group ${groupId}`);

        const newItem = {
            id: nanoid(),
            name: capitalizeFirstLetter(itemName),
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
            imageUrl={item.imageURL}
            handleDeleteGroup={handleDeleteGroup}
            handleDeleteItem={handleDeleteItem}
            handleModifyItem={handleModifyItem}
            handleNewItem={handleNewItem}
        />
    )

    function addCategory(pantryGroupName: string) {
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
            <div className="flex flex-col bgPrimary textPrimary min-h-screen">

                {/*list of saved categories*/}
                <div className="flex flex-col justify-center p-2 gap-2">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:flex md:flex-wrap gap-6">
                        {pantryItems}
                        <li
                            className="flex items-center justify-center rounded-sm min-h-42 md:min-w-[240px] p-2 cursor-pointer textInverse text-4xl"
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
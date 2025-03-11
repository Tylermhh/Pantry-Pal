import PantryGroup from "../components/PantryGroup.js";
import Navbar from "../components/Navbar.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {useEffect, useState} from "react";
import { nanoid } from "nanoid";
import {useDataFetching} from "./useDataFetching";

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

interface HomeProps {
    userId: string;
    authToken: string;
    isLoading: boolean;
    pantryGroups: PantryGroup[];
    setPantryGroups: (pantryGroups: PantryGroup[]) => void;
}




function Home(props: HomeProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const pantryGroups = props.pantryGroups;

    async function updatePantryGroups(userId: String, authToken: String, newPantryGroups: PantryGroup[]) {
        const response = await fetch(`/api/data/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                "newPantryGroups": newPantryGroups,
            })
        })

        if (!response.ok) {
            throw new Error(`Failed to update user's pantry groups in db. Status: ${response.status}`);
        }
        return response.json;
    }

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleDeleteGroup(groupId: string) {
        const newGroups = pantryGroups.filter(group => group.id !== groupId);
        props.setPantryGroups(newGroups);
        updatePantryGroups(props.userId, props.authToken, newGroups)
        .then((response) => {
            console.log(response);
        })
    }

    function handleDeleteItem(groupId: string, itemId: string) {
        const newGroups = pantryGroups.map((group) =>
            group.id === groupId
                ? { ...group, items: group.items.filter((item) => item.id !== itemId) }
                : group
        )
        props.setPantryGroups(newGroups);
        updatePantryGroups(props.userId, props.authToken, newGroups)
            .then((response) => {
                console.log(response);
            })
    }

    function handleModifyItem(groupId: string, itemId: string, operation: string) {
        const newGroups = pantryGroups.map((group) =>
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
        props.setPantryGroups(newGroups);
        updatePantryGroups(props.userId, props.authToken, newGroups)
            .then((response) => {
                console.log(response);
            })
    }

    function handleNewItem(groupId: string, itemName: string, itemCount: number) {
        console.log(`Adding new item ${itemName} with count ${itemCount} to group ${groupId}`);

        const newItem = {
            id: nanoid(),
            name: capitalizeFirstLetter(itemName),
            count: itemCount,
        }
        const newGroups = pantryGroups.map((group) =>
            group.id === groupId
                ? {...group,
                    items:  [...group.items, newItem]
                } : group
        )
        props.setPantryGroups(newGroups);
        updatePantryGroups(props.userId, props.authToken, newGroups)
            .then((response) => {
                console.log(response);
            })
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
        const newGroups = [...pantryGroups, newPantryGroup]
        props.setPantryGroups(newGroups);
        updatePantryGroups(props.userId, props.authToken, newGroups)
            .then((response) => {
                console.log(response);
            })
    }


    return (
        <>
            <div className="flex flex-col bgPrimary textPrimary min-h-screen">
                {props.isLoading && "Loading..."}

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
import PropTypes from "prop-types";
import ItemRow from "./ItemRow.tsx";
import {useState} from "react";
import {Spinner} from "./Spinner.tsx";
import {Item} from "../pages/Home.tsx";

interface PantryGroupDetailsProps {
    name: string;
    groupId: string;
    items: Item[];
    imageUrl: string;
    handleDeleteGroup: (groupId: string) => void;
    handleDeleteItem: (groupId: string, itemId: string) => void;
    handleModifyItem: (groupId: string, itemId: string, operation: string) => void;
    handleNewItem: (groupId: string, itemName: string, itemCount: number) => void;
}

// PantryGroupDetails.propTypes = {
//     name: PropTypes.string.isRequired,
//     groupId: PropTypes.string.isRequired,
//     items: PropTypes.number.isRequired,
//     imageURL: PropTypes.string.isRequired,
//     handleDeleteGroup: PropTypes.func.isRequired,
//     handleDeleteItem: PropTypes.func.isRequired,
//     handleModifyItem: PropTypes.func.isRequired,
//     handleNewItem: PropTypes.func.isRequired,
// };

function PantryGroupDetails(props: PantryGroupDetailsProps) {
    const [newItemName, setNewItemName] = useState("");
    const [newItemCount, setNewItemCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const ItemRows = props.items.map((item) =>
        <ItemRow
            key={item.id}
            groupId={props.groupId}
            itemId={item.id}
            name={item.name}
            count={item.count}
            handleDeleteItem={props.handleDeleteItem}
            handleModifyItem={props.handleModifyItem}
        />)

    function handleAddItem() {
        setIsLoading(true); // Show spinner

        async function addItemWithDelay() {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
            props.handleNewItem(props.groupId, newItemName, newItemCount);
            setIsLoading(false); // Hide spinner after delay
            setNewItemName(""); // Clear input fields
            setNewItemCount(0);
        }

        addItemWithDelay();
    }

    return (
        <div className="flex flex-col gap-4 bgPrimary">
            <img src={props.imageUrl}
                 alt={props.name}
                 className="min-w-80 h-32 object-cover rounded-sm" />
            <p className=""> Items Stored:</p>
            {ItemRows}

            <div className="flex gap-3 justify-between"> {/* Unfortunately comments in JSX have to be done like this */}
                <input
                    id="addItem-name"
                    className="border rounded-sm pl-1.5"
                    placeholder="Item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                />
                <input
                    id="addItem-count"
                    className="border rounded-sm pl-1.5"
                    placeholder="Item Count"
                    value={newItemCount}
                    onChange={(e) => setNewItemCount(parseInt(e.target.value))}
                />
                <button
                    id="addItem-button"
                    onClick={handleAddItem}
                    className="bgSecondary textSecondary rounded-sm px-1.5 py-1"
                >
                    Add
                </button>
            </div>

            <button
                id="removeGroup-button"
                onClick={() => {props.handleDeleteGroup(props.groupId)}}
                className="bgSecondary textSecondary rounded-sm px-1.5 py-1"
            >
                Delete Whole Group
            </button>
            {isLoading ? <Spinner/> : null}
        </div>
    )
}


export default PantryGroupDetails;





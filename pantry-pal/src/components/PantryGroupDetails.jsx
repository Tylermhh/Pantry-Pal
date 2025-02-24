import PropTypes from "prop-types";
import ItemRow from "./ItemRow.jsx";
import {useState} from "react";

function PantryGroupDetails(props) {
    const [newItemName, setNewItemName] = useState("");
    const [newItemCount, setNewItemCount] = useState("");
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
    return (
        <div className="flex flex-col gap-4 bgPrimary">
            <img src={props.imageURL}
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
                    id="addTask-button"
                    onClick={() => {props.handleNewItem(props.groupId, newItemName, newItemCount)}}
                    className="bgSecondary textSecondary rounded-sm px-1.5 py-1"
                >
                    Add
                </button>
            </div>

            <button
                id="addTask-button"
                onClick={() => {props.handleDeleteGroup(props.groupId)}}
                className="bgSecondary textSecondary rounded-sm px-1.5 py-1"
            >
                Delete Whole Group
            </button>
        </div>
    )
}

PantryGroupDetails.propTypes = {
    name: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    items: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
    handleDeleteGroup: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleModifyItem: PropTypes.func.isRequired,
    handleNewItem: PropTypes.func.isRequired,
};

export default PantryGroupDetails;
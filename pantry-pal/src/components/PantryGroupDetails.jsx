import PropTypes from "prop-types";
import ItemRow from "./ItemRow.jsx";

function PantryGroupDetails(props) {
    const ItemRows = props.items.map((item) =>
        <ItemRow
            key={item.id}
            groupId={props.groupId}
            itemId={item.id}
            name={item.name}
            count={item.count}
            handleDeleteItem={props.handleDeleteItem}
        />)
    return (
        <div className="flex flex-col gap-4 bg-amber-100  ">
            <img src={props.imageURL}
                 alt={props.name}
                 className="min-w-80 h-32 object-cover rounded-sm" />
            <p className=""> Items Stored:</p>
            {ItemRows}

            <button
                id="addTask-button"
                onClick={() => {props.handleDeleteGroup(props.groupId)}}
                className="bg-blue-600 text-white rounded-sm px-1.5 py-1"
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
};

export default PantryGroupDetails;
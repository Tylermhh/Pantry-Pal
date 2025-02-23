import {faTrashCan, faPlus, faSubtract} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function ItemRow(props) {
    return (
        <li className="flex justify-between items-center">
            <label className="flex gap-2 items-center leading-none" htmlFor={props.itemId}>
                {props.name}:  {props.count}
            </label>
            <div className="flex gap-3 items-center leading-none">
                <button onClick={() => props.handleModifyItem(props.groupId, props.itemId, "subtract")}><FontAwesomeIcon icon={faSubtract}/></button>
                <button onClick={() => props.handleDeleteItem(props.groupId, props.itemId)}><FontAwesomeIcon icon={faTrashCan}/></button>
                <button onClick={() => props.handleModifyItem(props.groupId, props.itemId, "add")}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
        </li>
    )
}

ItemRow.propTypes = {
    key: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleModifyItem: PropTypes.func.isRequired,
}

export default ItemRow;
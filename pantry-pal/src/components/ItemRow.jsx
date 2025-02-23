import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ItemRow(props) {
    return (
        <li className="flex gap-10 items-center">
            <label className="flex items-center leading-none" htmlFor={props.itemId}>
                {props.name}
            </label>
            <button onClick={() => props.handleDeleteItem(props.groupId, props.itemId)}><FontAwesomeIcon icon={faTrashCan}/></button>
        </li>
    )
}

ItemRow.propTypes = {
    key: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
}

export default ItemRow;
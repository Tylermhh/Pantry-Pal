import PropTypes from 'prop-types';
import Modal from "./Modal.jsx";
import React from "react";
import PantryGroupDetails from "./PantryGroupDetails.jsx";

function PantryGroup(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <Modal headerLabel={`Your ${props.name}`} isOpen={isOpen} onCloseRequested={() => setIsOpen(false)}>
                <PantryGroupDetails
                    name={props.name}
                    groupId={props.groupId}
                    imageURL={props.imageURL}
                    number={props.items}
                    items={props.items}
                    handleDeleteGroup={props.handleDeleteGroup}
                    handleDeleteItem={props.handleDeleteItem}
                    handleModifyItem={props.handleModifyItem}
                    handleNewItem={props.handleNewItem}
                />
            </Modal>
            <li className="bg-[#ebad6a] rounded-sm min-h-42 md:min-w-[240px] p-2 text-[#3b1105] cursor-pointer"
                onClick={() => {
                    setIsOpen(true)
                }}>

                <img src={props.imageURL}
                     alt={props.name}
                     className="w-full h-32 object-cover rounded-sm" />
                <p className="font-bold">{props.name}</p>
                <p>Number of Unique Items: {props.items.length}</p>
            </li>
        </>
    );
}

// Define expected prop types
PantryGroup.propTypes = {
    name: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    items: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
    handleDeleteGroup: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleModifyItem: PropTypes.func.isRequired,
    handleNewItem: PropTypes.func.isRequired,
};

export default PantryGroup;


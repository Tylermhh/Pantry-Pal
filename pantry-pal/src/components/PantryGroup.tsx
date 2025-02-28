import Modal from "./Modal.tsx";
import React from "react";
import PantryGroupDetails from "./PantryGroupDetails.tsx";
import {Item} from "../pages/Home.tsx";

interface PantryGroupProps {
    name: string;
    groupId: string;
    items: Item[];
    imageUrl: string;
    handleDeleteGroup: (groupId: string) => void;
    handleDeleteItem: (groupId: string, itemId: string) => void;
    handleModifyItem: (groupId: string, itemId: string, operation: string) => void;
    handleNewItem: (groupId: string, itemName: string, itemCount: number) => void;
}

// // Define expected prop types
// PantryGroup.propTypes = {
//     name: PropTypes.string.isRequired,
//     groupId: PropTypes.string.isRequired,
//     items: PropTypes.number.isRequired,
//     imageURL: PropTypes.string.isRequired,
//     handleDeleteGroup: PropTypes.func.isRequired,
//     handleDeleteItem: PropTypes.func.isRequired,
//     handleModifyItem: PropTypes.func.isRequired,
//     handleNewItem: PropTypes.func.isRequired,
// };

function PantryGroup(props: PantryGroupProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <Modal headerLabel={`Your ${props.name}`} isOpen={isOpen} onCloseRequested={() => setIsOpen(false)}>
                <PantryGroupDetails
                    name={props.name}
                    groupId={props.groupId}
                    imageUrl={props.imageUrl}
                    items={props.items}
                    handleDeleteGroup={props.handleDeleteGroup}
                    handleDeleteItem={props.handleDeleteItem}
                    handleModifyItem={props.handleModifyItem}
                    handleNewItem={props.handleNewItem}
                />
            </Modal>
            <li className="bgCards rounded-sm min-h-42 md:min-w-[240px] p-2 cursor-pointer"
                onClick={() => {
                    setIsOpen(true)
                }}>

                <img src={props.imageUrl}
                     alt={props.name}
                     className="w-full h-32 object-cover rounded-sm" />
                <p className="font-bold">{props.name}</p>
                <p>Number of Unique Items: {props.items.length}</p>
            </li>
        </>
    );
}


export default PantryGroup;


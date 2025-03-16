import React from "react";
import Modal from "./Modal.tsx";
import PantryGroupDetails from "./PantryGroupDetails.tsx";
import AddNewGroupForm from "./AddNewGroupForm.tsx";

interface AddNewGroupProps {
    name: string;
    onSubmit: (name: string) => void;
}

function AddNewGroup(props: AddNewGroupProps){
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <Modal headerLabel={`${props.name}`} isOpen={isOpen} onCloseRequested={() => setIsOpen(false)}>
                <AddNewGroupForm onSubmit={props.onSubmit}/>
            </Modal>
            <li
                className="flex items-center justify-center rounded-sm min-h-42 md:min-w-[240px] p-2 cursor-pointer textInverse text-4xl"
                onClick={() => setIsOpen(true)}
            >
                +
            </li>
        </>
    );
}


export default AddNewGroup;
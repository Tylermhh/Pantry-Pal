import React from "react";
import Modal from "./Modal.tsx";
import {ImageUploadForm} from "./ImageUploadForm.tsx";

interface ChangeGroupImageProps {
    authToken: string;
    userId: string;
    groupId: string;
    name: string;
    imageUrl: string;
}

function ChangeGroupImage(props: ChangeGroupImageProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <Modal headerLabel={`Change Group Image`} isOpen={isOpen} onCloseRequested={() => setIsOpen(false)}>
                <ImageUploadForm userId={props.userId} authToken={props.authToken} groupId={props.groupId} />
            </Modal>
            <img src={props.imageUrl}
                 alt={props.name}
                 className="min-w-80 h-32 object-cover rounded-sm cursor-pointer"
                 onClick={() => setIsOpen(true)}
            />
        </>
    );
}


export default ChangeGroupImage;
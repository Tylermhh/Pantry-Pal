import {faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useRef} from "react";

interface ModalProps {
    isOpen: boolean,
    onCloseRequested: () => void,
    headerLabel: string,
    children: React.ReactNode,
}

function Modal(props : ModalProps) {
    const inputRef = useRef<HTMLDivElement | null>(null);

    function overlayClickHandler(e: React.MouseEvent<HTMLDivElement>) {  // Correct event type
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            props.onCloseRequested();
        }
    }

    return (props.isOpen ?
        (
            <div
                className="flex fixed top-0 left-0 w-full h-full bg-black/50 rounded-lg justify-center items-center"
                onClick={overlayClickHandler}
            >
                <div ref={inputRef} className="flex flex-col gap-4 bgPrimary rounded-lg p-3 w-auto m-3">
                    <header className="flex items-center justify-between font-bold">
                        {props.headerLabel}
                        <button aria-label="Close" onClick={props.onCloseRequested}>
                            <FontAwesomeIcon icon={faX}/>
                        </button>
                    </header>
                    {props.children}
                </div>
            </div>
        )
        : null)
}

// // Define expected prop types
// Modal.propTypes = {
//     isOpen: PropTypes.bool.isRequired,
//     onCloseRequested: PropTypes.func.isRequired,
//     headerLabel: PropTypes.string.isRequired,
//     children: PropTypes.node,
// };

export default Modal;
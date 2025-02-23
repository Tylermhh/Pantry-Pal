import {faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef} from "react";
import PropTypes from "prop-types";

function Modal(props) {
    const inputRef = useRef(null);

    function overlayClickHandler(e) {
        if (!inputRef.current.contains(e.target)) {
            props.onCloseRequested()
        }
    }

    return (props.isOpen ?
        (
            <div
                className="flex absolute top-0 left-0 w-screen h-screen bg-black/50 rounded-lg justify-center items-center"
                onClick={overlayClickHandler}
            >
                <div ref={inputRef} className="flex flex-col gap-4 bg-amber-100 rounded-lg p-3 w-auto m-3">
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

// Define expected prop types
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCloseRequested: PropTypes.func.isRequired,
    headerLabel: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default Modal;
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({
    isOpen,
    onClose,
    title,
    children })
{
    // Modal only renders when it is open
    if (!isOpen) return null;

    // Render the modal outside of any DOM element and on the body itself
    return createPortal(
        <div className="custom-modal-overlay" onClick={onClose}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
                {title && <h2 className="custom-modal-title">{title}</h2>}
                <div className="custom-modal-body">{children}</div>
                <button className="custom-modal-close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
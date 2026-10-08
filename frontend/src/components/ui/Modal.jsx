import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "../../styles/Components/ui/Modal.css";

export default function Modal({
    isOpen,
    onClose,
    title,
    icon: Icon,
    children,
    className = "",
    closeOnOverlay = true,
    showHeader = true,
}) {

    // --------------------------------------------------
    // Close modal with Escape
    // --------------------------------------------------
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);


    // --------------------------------------------------
    // Don't render when closed
    // --------------------------------------------------
    if (!isOpen) {
        return null;
    }


    // --------------------------------------------------
    // Overlay click
    // --------------------------------------------------
    const handleOverlayClick = () => {
        if (closeOnOverlay) {
            onClose();
        }
    };


    return createPortal(

        <div
            className="modal-overlay"
            onMouseDown={handleOverlayClick}
        >

            <div className={`modal-container ${className}`} onMouseDown={(event) => event.stopPropagation()}>

                {/* Header */}
                {showHeader && (
                    <div className="modal-header">
                        <div className="modal-title-group">
                            {Icon && (
                                <span className="modal-icon">
                                    <Icon size={18} strokeWidth={2} />
                                </span>
                            )}
                            {title && (
                                <span className="modal-title"> {title} </span>
                            )}
                        </div>
                        <button type="button" className="modal-close" aria-label="Close modal" onClick={onClose} >
                            <X size={16} strokeWidth={2} />
                        </button>
                    </div>
                )}


                {/* Modal Content */}
                <div className="modal-body">
                    {children}
                </div>

            </div>

        </div>,

        document.body
    );
}
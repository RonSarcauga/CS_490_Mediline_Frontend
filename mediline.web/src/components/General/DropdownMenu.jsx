import React, { useState, useRef, useEffect, forwardRef } from "react";
import { createPortal } from "react-dom";
import Container, { ItemGroup } from "./Container";

function DropdownMenu({
    triggerLabel,
    menuItems,
    customBody,
    offsetX = 0,
    offsetY = 0,
    portalContainer = document.body
}) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const bodyRef = useRef(null);
    const triggerRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    // Function for toggling the dropdown menu
    const handleToggle = () => {
        setIsOpen((prevState) => {
            const nextState = !prevState;
            if (nextState) {
                adjustDropdownPosition();
            }
            return nextState;
        });
    };

    // Function that handles clicks outside of the dropdown menu's boundaries
    const handleOutsideClick = (e) => {
        if (
            menuRef.current &&
            bodyRef.current &&
            !menuRef.current.contains(e.target) &&
            !bodyRef.current.contains(e.target)
        ) {
            setIsOpen(false);
        }
    };

    // Adjusts the position of the menu for overflow cases
    const adjustDropdownPosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            console.log("Trigger Dimensions: ", rect);
            setDropdownPosition({
                top: rect.bottom + offsetY,
                left: rect.left + offsetX,
            });
        }
        else {
            console.log("Trigger Ref is not assigned correctly!");
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div ref={menuRef}>
            <div ref={triggerRef}>
                <Container
                    customClass="custom-dropdown-trigger"
                    isClickable={true}
                    onClick={handleToggle}
                    content={[
                        <>
                            {triggerLabel}
                        </>
                    ]}
                />
            </div>
            {isOpen &&
                createPortal(
                    <div
                        className="custom-dropdown-body"
                        ref={bodyRef}
                        style={{
                            position: "absolute",
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                            zIndex: 1000,
                        }}
                    >
                        {customBody ? (
                            customBody
                        ) : (
                            <ul className="default-dropdown-body">
                                {menuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="custom-dropdown-item"
                                        style={{ padding: "8px 16px", cursor: "pointer" }}
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>,
                    portalContainer
                )}
        </div>
    );
}

export default DropdownMenu;
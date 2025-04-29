import React, { useState, useRef, useEffect } from "react";
import Container, { ItemGroup } from './Container';

function SimpleDropdownMenu({
    triggerLabel,
    menuItems,
    customBody,
})
{
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const bodyRef = useRef(null);

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
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    // Adjusts the position of the menu for overflow cases
    const adjustDropdownPosition = () => {
        if (bodyRef.current) {
            const rect = bodyRef.current.getBoundingClientRect();

            if (rect.right > window.innerWidth) {
                bodyRef.current.style.left = "auto";
                bodyRef.current.style.right = "0";
            } else {
                bodyRef.current.style.left = "0";
                bodyRef.current.style.right = "auto";
            }

            if (rect.bottom > window.innerHeight) {
                bodyRef.current.style.top = "auto";
                bodyRef.current.style.bottom = "100%";
            } else {
                bodyRef.current.style.top = "100%";
                bodyRef.current.style.bottom = "auto";
            }
        }
    };

    // Closes the dropdown menu for clicks outside of its boundaries
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div className="custom-dropdown-menu" ref={menuRef} style={{ position: "relative" }}>
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
            {isOpen && (
                <div
                    className="custom-dropdown-body"
                    ref={bodyRef}
                >
                    {customBody ? (
                        customBody
                    ) : (
                        <ul
                            className="default-dropdown-body"
                        >
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
                </div>
            )}
        </div>
    );
};

export default SimpleDropdownMenu;
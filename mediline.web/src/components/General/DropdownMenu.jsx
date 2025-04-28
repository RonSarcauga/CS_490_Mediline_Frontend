import React, { useState, useRef, useEffect } from "react";

const DropdownMenu = ({ triggerLabel, menuItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const handleToggle = () => setIsOpen((prevState) => !prevState);

    const handleOutsideClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div className="dropdown-menu" ref={menuRef} style={{ position: "relative" }}>
            <button onClick={handleToggle}>{triggerLabel}</button>
            {isOpen && (
                <ul
                    className="dropdown-content"
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "white",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        borderRadius: "5px",
                        zIndex: 1000,
                    }}
                >
                    {menuItems.map((item, index) => (
                        <li key={index} style={{ padding: "10px", cursor: "pointer" }}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
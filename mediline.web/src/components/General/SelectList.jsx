import { useEffect, forwardRef, useImperativeHandle, useRef, useState } from 'react';

{/*
    This is the base component for a select list.
    For input, it takes placeholder text and a list of items to select.
    For custom event handling, the user can pass an event handler in the form of onSelect.
*/}
export default forwardRef(function SelectList({
    triggerClass,
    contentClass,
    placeholder = "Select an option",
    items = [
        { value: "chocolate", label: "Chocolate" },
        { value: "vanilla", label: "Vanilla" },
        { value: "strawberry", label: "Strawberry" },
    ],
    onSelect,
}, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    }

    const handleSelect = (item) => {
        setSelectedItem(item);
        if (onSelect) onSelect(item);
        setIsOpen(true);
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useImperativeHandle(ref, () => ({
        reset: () => setSelectedItem(null)
    }));

    return (
        <div ref={dropdownRef}>
            <div
                className={`selectList ${triggerClass} ${isOpen ? "open" : ""}`}
                onClick={toggleDropdown}>
                <p className="py-3 font-semibold text-neutral-700">{selectedItem ? selectedItem.label : placeholder}</p>
                <div className={`arrow ${isOpen ? "up" : "down"}`}>
                    <span></span>
                </div>
                {isOpen && (
                    <div className={`selectList-content ${contentClass}`}>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="selectList-item"
                                onClick={() => handleSelect(item)}>
                                {item.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

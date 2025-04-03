import { useState } from 'react';

{/*
    This is the base component for a select list.
    For input, it takes placeholder text and a list of items to select.
    For custom event handling, the user can pass an event handler in the form of onSelect.
*/}
export default function SelectList({
    placeholder = "Select an option",
    items = [
        { value: "chocolate", label: "Chocolate" },
        { value: "vanilla", label: "Vanilla" },
        { value: "strawberry", label: "Strawberry" },
    ],
    onSelect,
})
{
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    }

    const handleSelect = (item) => {
        setSelectedItem(item);
        if (onSelect) onSelect(item);
        setIsOpen(true);
    }

    return (
        <div
            className={`selectList ${isOpen ? "open" : ""}`}
            onClick={toggleDropdown}>
            <p className="py-3 font-semibold text-neutral-700">{selectedItem ? selectedItem.label : placeholder}</p>
            <div className={`arrow ${isOpen ? "up" : "down"}`}>
                <span></span>
            </div>
            {isOpen && (
                <div className="selectList-content">
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
    );
}

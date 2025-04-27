import { useState, useEffect } from 'react';
import Container, { ItemGroup } from './Container';
import BaseIcon from './BaseIcon';

{/* 
    This is the base component for a simple checkbox.
    For input, the user can pass a piece of text to indicate the item to be checked off.
    The user can also pass their own event handler for the onChange function.
*/}
export default function Checkbox({
    label = "item",
    checked = false,
    onChange,
    checkboxClass = "",
    checkHeight = 30,
    checkWidth = 30,
    checkColor = "hsl(210, 70%, 50%)",
    iconClass = "",
}) {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleChange = (e) => {
        const checkedValue = e.target.checked;
        setIsChecked(checkedValue);
        if (onChange) {
            onChange(checkedValue);
        }
    };

    return (
        <label className={`re-checkbox-wrapper ${isChecked ? "checked" : ""} ${checkboxClass}`}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="native-checkbox"
            />
            <span
                className={`${isChecked ? "checked" : ""}`}
            >
                {isChecked && (
                    <span className={`re-check-icon ${iconClass}`}>
                        <BaseIcon
                            height={checkHeight}
                            width={checkWidth}
                            viewBox="0 0 24 24"
                            fillColor="none">
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                            <g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke={checkColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </BaseIcon>
                    </span>
                )}
            </span>
            {label}
        </label>
    );
}

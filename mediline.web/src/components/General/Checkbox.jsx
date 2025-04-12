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
    checked,
    onChange
})
{
    const [isChecked, setIsChecked] = useState(checked || false);

    useEffect(() => {
        if (checked !== undefined) {
            setIsChecked(checked);
        }
    }, [checked]);

    const handleChange = (e) => {
        const checkedValue = e.target.checked;
        setIsChecked(checkedValue);
        console.log("Check this!");
        if (onChange) {
            onChange(checkedValue);
        }
    }

    return (
        <ItemGroup
            customClass="align-items-center gap-3"
            axis={false}
            stretch={true}
            items={[
                <>
                    <label className="checkbox-wrapper">
                        {isChecked && (
                            <span className="check-icon">
                                <BaseIcon
                                    height={30}
                                    width={30}
                                    viewBox="0 0 24 24"
                                    fillColor="none">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                    <g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="hsl(210, 70%, 50%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </BaseIcon>
                            </span>
                        )}
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleChange}
                            className={isChecked ? "checked" : ""}
                        />
                    </label>
                    {label}
                </>
            ]}
        />
    );
};

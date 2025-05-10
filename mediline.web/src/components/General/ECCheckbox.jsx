import { useState } from 'react';
import Container, { ItemGroup } from './Container';
import BaseIcon from './BaseIcon';
import { FaClock } from "react-icons/fa";
import { BsChevronDoubleUp } from "react-icons/bs";

{/* 
    This is the base component for a simple checkbox.
    For input, the user can pass a piece of text to indicate the item to be checked off.
    The user can also pass their own event handler for the onChange function.
*/}
export default function ECCheckbox({
    label = "item",
    time = "0 min",
    reps = "0 reps",
    id = "0",
    personal = false,
    checked,
    onChange
})
{
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleChange = (e) => {
        console.log("Check this!");
        setIsChecked(e.target.checked);
        if (onChange) {
            onChange(e.target.checked);
        }
    }
    reps = reps + " reps"

    return (
        <ItemGroup
            customClass="align-items-center gap-3 bg-neutral-1100 p-2 br-xs "
            axis={false}
            stretch={true}
            style={{
                width:"27vw"
            }}
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
                            style = {{
                                border: "1px solid var(--clr-primary-neutral-400)"
                            }}
                        />
                        
                    </label>
                    {label}
                    {personal && <BsChevronDoubleUp />}
                    {personal && reps}
                    
                </>
            ]}
        />
    );
};

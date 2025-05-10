import { useState, useEffect } from 'react';

{/* This is the base component for an accordion. */ }
export default function Accordion({
    customClass = "",
    headerClass = "",
    bodyClass = "",
    toggleClass = "",
    style,
    header,
    body,
    toggleIcon,
    isExpanded,
    defaultExpanded = false,
    onExpand = () => { },
    onCollapse = () => { }
})
{
    const [expanded, setExpanded] = useState(isExpanded !== undefined ? isExpanded : defaultExpanded);

    // Sync state with parent if `isExpanded` is controlled
    useEffect(() => {
        if (isExpanded !== undefined) {
            setExpanded(isExpanded);
        }
    }, [isExpanded]);

    const handleToggle = () => {
        console.log("Expanded before toggle: ", expanded);
        const nextState = !expanded;
        console.log("Expanded after toggle: ", nextState);
        setExpanded(nextState);
        if (nextState) onExpand(nextState);
        else onCollapse(nextState);
    };

    return (
        <div className={`accordion-menu  ${expanded ? "expanded" : ""}`}>
            <div
                className={`accordion-header ${headerClass}`}
                onClick={handleToggle}
                style={{ cursor: "pointer" }}
            >
                {header}
                {toggleIcon && <span className={`accordion-toggle`}>{toggleIcon}</span>}
            </div>
            <div
                className={`accordion-body ${expanded ? `${bodyClass}` : ""}`}
                style={{...style}}
            >
                {body}
            </div>
        </div>
    );
};
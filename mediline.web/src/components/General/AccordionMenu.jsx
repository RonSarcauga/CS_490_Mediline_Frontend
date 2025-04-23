import { useState, useEffect } from 'react';

{/* This is the base component for an accordion. */ }
export default function Accordion({
    customClass = "",
    headerClass = "",
    bodyClass = "",
    toggleClass = "",
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
        const nextState = !expanded;
        setExpanded(nextState);
        if (nextState) onExpand();
        else onCollapse();
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
            {expanded && (
                <div className={`accordion-body ${bodyClass}`}>
                    {body}
                </div>
            )}
        </div>
    );
};
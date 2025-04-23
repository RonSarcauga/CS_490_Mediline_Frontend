import { useState, useEffect } from 'react';

{/* This is the base component for an accordion. */ }
export default function Accordion({
    customClass = "",                // Add a custom class to the outer container
    headerClassName = "",            // Custom styles for the header
    bodyClassName = "",              // Custom styles for the body
    toggleClassName = "",            // Custom styles for the toggle element
    headerContent,                   // JSX for the header
    bodyContent,                     // JSX for the body
    toggleIcon,                      // Custom toggle icon (e.g., expand/collapse arrow)
    isExpanded,                      // Optional: Controlled state for expansion
    defaultExpanded = false,         // Default state if uncontrolled
    onExpand = () => { },             // Optional callback when expanded
    onCollapse = () => { }            // Optional callback when collapsed
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
        <div className={`accordion ${customClass}`}>
            <div
                className={`accordion-header ${headerClassName}`}
                onClick={handleToggle}
                style={{ cursor: "pointer" }}
            >
                {headerContent}
                {toggleIcon && <span className={`accordion-toggle ${toggleClassName}`}>{toggleIcon}</span>}
            </div>
            {expanded && (
                <div className={`accordion-body ${bodyClassName}`}>
                    {bodyContent}
                </div>
            )}
        </div>
    );
};
import BaseIcon from "./BaseIcon";

{/* This is the base component for a card.
    This can be used as a base for designing cards for the dashboard */}
export default function Card({
        header = null,
        customClass = '',
        icon = null,
        content = null,
        footer = null
    }) {
    {/* Base class of the card component */ }
    const baseClass = 'baseCard';

    return (
        <div className={`${baseClass} ${customClass}`}>
            <div className="cardHeader">
                {/* Renders an icon if any are provided*/}
                {icon ? icon : null}

                {/* Renders a header if any are provided.
                    Can either be text or another element */}
                {header}
            </div>
            <div className="cardBody">
                {content}
            </div>
            <div className="cardFooter">
                {footer}
            </div>
        </div>
    );
}

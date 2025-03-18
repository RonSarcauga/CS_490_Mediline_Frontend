{/* This is the base component for a text block consisting of a header, description and any other item attached to the block. */}
export default function TextBlock({ header, description, children, customClass }) {
    const baseClass = 'textBlock';

    return (
        <div className={`${baseClass} ${customClass}`}>
            <h1>{header}</h1>
            <p>{description}</p>
            {children}
        </div>
    );
}

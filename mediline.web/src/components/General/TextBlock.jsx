{/* This is the base component for a text block consisting of a header, description and any other item attached to the block. */}
export default function TextBlock({ icon = null, headers = [], description, children, customClass }) {
    const baseClass = 'textBlock';

    return (
        <div className={`${baseClass} ${customClass}`}>
            {/* Render an icon if provided */}
            {icon ? icon : null}

            {/* Render multiple headers */}
            {headers.map((header, index) => {
                const { text = '', size = 'h2' } = header;
                const HeaderTag = size;
                return <HeaderTag key={index}>{text}</HeaderTag>;
            })}

            {/* Render the description */ }
            <p>{description}</p>

            {/* Render additional children */}
            {children}
        </div>
    );
}

{/* This is the base component for a container.
    It can be used as a base for any structure that has a layout using a header, body, and footer e.g. cards.
    It is designed to allow other components to be passed into the header, body, or footer.
        Useful pairings include using the ItemGroup component or even another Container component */}
export default function Container({
    id = null,
    dataAttributes = {},
    header = [],
    content = [],
    footer = [],
    customClass = '',
    headerClass = '',
    contentClass = '',
    footerClass = '',
    style,
    maxWidth = null,
    isClickable = false,
    onClick = null,
    fitParent = false,
    fitScreen = false
}) {
    const baseClass = "container";

    {/* Additional utility classes.
        This has been implemented to limit reliance on inline styles.
        This also gives the user a little more control. */}
    const classNames = `
        ${baseClass}
        ${customClass}
        ${fitParent ? "fit-parent" : ""}
        ${fitScreen ? "fit-screen" : ""}
        ${isClickable ? "clickable" : ""}
    `;


    {/* Although using inline styles are discouraged, these styles do not remove too much control from the user.
        They are used to make the Container component more flexible */}
    const combinedStyle = {
        ...(maxWidth && { maxWidth }),
        ...style
    };

    {/* These add optional data attributes to the component to be used in event handling.
        The format of data attributes are as follows: data-{attribute}={attribute value}.
        These are particular useful for sending data from our view models into our JS files. */}
    const data = {
        ...dataAttributes,
    }

    return (
        <div
            id={id}
            {...dataAttributes}
            className={`${classNames}`}
            style={combinedStyle}
            onClick={isClickable ? onClick : null}>
            <div className={`header ${headerClass}`}>
                {header}
            </div>
            <div className={`content ${contentClass}`}>
                {content}
            </div>
            <div className={`footer ${footerClass}`}>
                {footer}
            </div>
        </div>
    );
}

{/* This is the base component for a group of items.
    It can be used to organize elements inside of a structure to preserve the grid layout used for structures such as the dashboard */}
export function ItemGroup({
    id = null,
    dataAttributes = {},
    customClass = '',
    style,
    stretch = false,
    maxWidth = null,
    evenSplit = '',
    axis = true,
    items = [],
    isClickable = false,
    onClick='',
    fitParent = false,
    fitScreen = false
})
{
    {/* Conditionally changes the base class to either be 'item-group-col' or 'item-group-row' based on the value of axis.
        If the axis is 0 ('false'), then items in the group are displayed along the x-axis, meaning that they are separated into columns in a single row. 
        If the axis is 1 ('true'), then items in the group are displayed along the y-axis, meaning that they are separated into rows in a single column. */}
    const baseClass = axis ? 'item-group-col' : 'item-group-row';

    {/* Additional utility classes.
        This has been implemented to limit reliance on inline styles.
        This also gives the user a little more control. */}
    const classNames = `
        ${baseClass}
        ${customClass}
        ${fitParent ? "fit-parent" : ""}
        ${fitScreen ? "fit-screen" : ""}
        ${stretch ? `${baseClass}-stretch` : ""}
        ${evenSplit ? `${baseClass}-even` : ""}
        ${isClickable ? "clickable" : ""}
    `;

    {/* Although using inline styles are discouraged, these styles do not remove too much control from the user. 
        They are used to make the ItemGroup component more flexible */}
    const combinedStyle = {
        ...(maxWidth && { maxWidth }),
        ...style
    };

    {/* These add optional data attributes to the component to be used in event handling.
        The format of data attributes are as follows: data-{attribute}={attribute value}.
        These are particular useful for sending data from our view models into our JS files. */}
    const data = {
        ...dataAttributes,
    }

    return (
        <div
            id={id}
            {...data}
            className={`${classNames}`}
            style={combinedStyle}
            onClick={isClickable ? onClick : null}>
            {items}
        </div>
    )
}

{/* This is the base component for an image that is going to be attached to the background of a container.
    Typical use cases includes adding a picture on the top of a card and its content.
    
    Keep in mind that this component is meant to be used in a grid layout.
    If you just want an image that can be modified or controlled, use the Image component instead */}
export function PictureFrame({
    customClass = '',
    pictureClass = '',
    headerClass = '',
    bodyClass = '',
    footerClass = '',
    header = [],
    body = [],
    footer = [],
    content = [],
    dataAttributes = {},
    location = 'right',
    url = ''
})
{
    {/* By default, the picture is placed on the right of a horizontal frame */}
    var baseClass = 'frame-horizontal';

    {/* Locations that the picture can be placed */}
    const horizontal = ['left', 'right'];
    const vertical = ['top', 'bottom'];

    {/* Determines which frame is used based on the location that the picture will be placed */}
    if (horizontal.includes(location.toLowerCase())) {
        baseClass = 'frame-horizontal';
    }
    else if (vertical.includes(location.toLowerCase())) {
        baseClass = 'frame-vertical';
    }

    {/* Although the use of inline styles is mostly discouraged, I try to give the user as much control over the element here */}
    const style = {
        backgroundImage: `url(${url})`
    };

    {/* These add optional data attributes to the component to be used in event handling.
        The format of data attributes are as follows: data-{attribute}={attribute value}.
        These are particular useful for sending data from our view models into our JS files. */}
    const data = {
        ...dataAttributes,
    }

    return (
        <div className={`${baseClass} ${customClass}`}>
            {/* Renders the content before or after the picture based on the location */}
            {location === 'right' || location === 'bottom' ? content : null }
            <div className={`picture ${pictureClass}`} style={style}>
                <div className={`header ${headerClass}`}>
                    {header}
                </div>
                <div className={`content ${bodyClass}`}>
                    {body}
                </div>
                <div className={`footer ${footerClass}`}>
                    {footer}
                </div>
            </div>
            {location === 'left' || location === 'top' ? content : null}
        </div>
    );
}

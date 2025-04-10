function Button({
    content = [],
    isClickable = false,
    style = {},
    customClass = null
})
{
    const baseClass = "button";

    const classNames = `
        ${baseClass}
        ${customClass}
        ${isClickable ? "clickable" : ""}
    `;

    return (
        <div className={classNames} style={style}>
            {content}
        </div>
    );
}

export default Button;
function Button({
    content = [],
    isClickable = false,
    style = {},
    customClass = null,
    onClick = null
}) {
    const baseClass = "button";

    const classNames = `
        ${baseClass}
        ${customClass}
        ${isClickable ? "clickable" : ""}
    `;

    return (
        <div className={classNames}
            style={style}
            onClick={isClickable ? onClick : null}>
            {content}
        </div>
    );
}

export default Button;
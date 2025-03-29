function Button({
    content = [],
    customClass = null
})
{
    const baseClass = "button";

    return (
        <div className={`${baseClass} ${customClass}`}>
            {content}
        </div>
    );
}

export default Button;
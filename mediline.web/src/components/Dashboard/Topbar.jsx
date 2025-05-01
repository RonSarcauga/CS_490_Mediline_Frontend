import { Link } from 'react-router-dom';

{/* This is the base component for the navigation bar. 
    Create a style sheet for a page to change its appearance */}
export default function Topbar({
    header = [],
    items = [],
    customClass = '',
    itemClass = ''
})
{
    const baseClass = "topbar";

    return (
        <nav className={`${baseClass} ${customClass}`}>
            <div className="logo">
                {header}
            </div>
            <div className={`topbarItems ${itemClass}`}>
                {items}
            </div>
        </nav>
    );
}

{/* This is a base component for items to be added to the navbar */}
export function TopbarItem({
    icon,
    text,
    to = "/",
    customClass = '',
    textClass = '',
    onClick,
})
{
    const baseClass = 'topbarItem';

    return (
        <Link to={to} className={`${baseClass} ${customClass}`} onClick={onClick}>
            {icon}
            <span className={`topbarText ${textClass}`}>
                {text}
            </span>
        </Link>
    );
}

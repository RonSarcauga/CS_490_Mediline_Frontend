import { Link } from 'react-router-dom';
import Logo from '../General/Logo';

{/* This is the base component for the navigation bar. 
    Create a style sheet for a page to change its appearance */}
export default function Topbar({ height = 50, width = 50, fillColor = "#1B2B32", text, children }) {
    return (
        <nav className="topbar">
            <Logo height={height}
                  width={width}
                  fillColor={fillColor}
                  text={text} >
                <span>
                    { text }
                </span>
            </Logo>
            <div></div>
            {children}
            <div></div>
        </nav>
    );
}

{/* This is a base component for items to be added to the navbar */}
export function TopbarItem({ icon, text, to = "/" }) {
    return (
        <Link to={ to } className="topbarItem">
            {icon}
            <span className="topbarText">
                {text}
            </span>
        </Link>
    );
}

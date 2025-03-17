import Logo from '../Logo'

{/* This is the navigation bar for the dashboards specifically.
    A separate navigation bar will be used for the landing page */}
export default function Navbar() {
    return (
        <nav className="navigation-bar">
            <Logo height={50} width={50} fillColor="#1B2B32">
                MEDILINE
            </Logo>
        </nav>
    );
}

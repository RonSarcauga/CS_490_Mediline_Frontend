import Navbar from './Navbar';
import Sidebar, { SidebarItem } from './Sidebar';

{/* This is the navigation bar for the dashboards specifically.
    A separate navigation bar will be used for the landing page */}
export default function Board() {
    return (
        <nav className="dashboard-backdrop">
            <Navbar
        </nav>
    );
}
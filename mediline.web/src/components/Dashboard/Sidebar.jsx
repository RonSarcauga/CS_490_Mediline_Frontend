{/* This is the sidebar for the dashboard.
    It stores all the navigation links to different pages in the user portal */}
export default function Sidebar({ children }) {
    return (
        <aside className="sidebar-container">
            <nav className="sidebar">
                <ul>
                    {children}
                </ul>
            </nav>
        </aside>
    );
}

{/* Base component for items in the sidebar */}
export function SidebarItem({ icon }) {
    return (
        <li>
            <span className="indicator">
                {icon}
            </span>
        </li>
    );
}

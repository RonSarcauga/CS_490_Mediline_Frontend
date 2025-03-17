export default function Sidebar({ children }) {
  return (
    <aside className="sidebar-container">
          <nav className="sidebar">
              <ul>
                  { children }
              </ul>
          </nav>
    </aside>
  )
}

{/* Component for items in the sidebar */}
export function SidebarItem({ icon }) {
    return (
        <li>
            <span className="indicator">
                {icon}
            </span>
        </li>
    )
}

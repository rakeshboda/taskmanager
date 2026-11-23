import { LayoutDashboard, ListTodo, CalendarDays, Settings, Menu, X } from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My tasks", icon: ListTodo },
  { label: "Calendar", icon: CalendarDays },
  { label: "Settings", icon: Settings },
];

export default function Sidebar({ activePage = "Overview", open, onClose, onNavigate }) {
  return (
    <>
      {open && <button className="mobile-backdrop" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        <div className="brand">
          <span className="brand-mark"><LayoutDashboard size={19} /></span>
          <span>FocusBoard</span>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close menu"><X size={19} /></button>
        </div>

        <p className="sidebar-label">WORKSPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activePage === label ? "active" : ""}`}
              onClick={() => { onNavigate?.(label); onClose?.(); }}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span className="tip-spark">✦</span>
            <strong>Stay focused</strong>
            <p>Small steps lead to big progress.</p>
          </div>
          <div className="sidebar-user">
            <div className="avatar">JD</div>
            <div><strong>Jamie Doe</strong><span>Personal workspace</span></div>
          </div>
        </div>
      </aside>
    </>
  );
}

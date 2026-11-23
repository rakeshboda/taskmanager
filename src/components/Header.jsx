import { Bell, Menu, Plus } from "lucide-react";

export default function Header({ onMenuClick, onAddTask }) {
  return (
    <header className="top-header">
      <div className="breadcrumbs">
        <button className="icon-button mobile-menu" onClick={onMenuClick} aria-label="Open menu"><Menu size={21} /></button>
        <span>Workspace</span><span className="crumb-divider">/</span><strong>Overview</strong>
      </div>
      <div className="header-actions">
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
        <div className="avatar header-avatar">JD</div>
        <button className="button button-primary header-add" onClick={onAddTask}><Plus size={16} /> New task</button>
      </div>
    </header>
  );
}

import { RotateCcw } from "lucide-react";

const tabs = ["All tasks", "To do", "In progress", "Completed"];

export default function FilterTabs({ activeStatus, onStatusChange, priority, onPriorityChange, onReset }) {
  return (
    <div className="filter-toolbar">
      <div className="filter-tabs" role="group" aria-label="Filter tasks by status">
        {tabs.map((tab) => {
          const value = tab === "All tasks" ? "All" : tab;
          return <button key={tab} className={activeStatus === value ? "filter-tab selected" : "filter-tab"} onClick={() => onStatusChange(value)}>{tab}</button>;
        })}
      </div>
      <div className="filter-right">
        <select className="priority-filter" value={priority} onChange={(event) => onPriorityChange(event.target.value)} aria-label="Filter by priority">
          <option value="All">Priority: All</option>
          <option value="High">Priority: High</option>
          <option value="Medium">Priority: Medium</option>
          <option value="Low">Priority: Low</option>
        </select>
        <button className="reset-filters" onClick={onReset} title="Reset filters" aria-label="Reset filters"><RotateCcw size={14} /></button>
      </div>
    </div>
  );
}

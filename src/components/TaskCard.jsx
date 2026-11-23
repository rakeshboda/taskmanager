import { CalendarDays, CheckCircle2, Circle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const statusClass = (status) => status.toLowerCase().replaceAll(" ", "-");

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const due = task.dueDate ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "No due date";
  return (
    <article className="task-row">
      <div className="task-leading">
        <span className={`task-check ${task.status === "Completed" ? "task-check--done" : ""}`}>
          {task.status === "Completed" ? <CheckCircle2 size={17} /> : <Circle size={17} />}
        </span>
        <div className="task-name-wrap">
          <strong className={task.status === "Completed" ? "task-title completed-title" : "task-title"}>{task.title}</strong>
          <span className="task-description">{task.description || "No description added"}</span>
        </div>
      </div>
      <div className="task-meta">
        <span className="category-pill">{task.category || "General"}</span>
        <span className={`priority-pill priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        <label className="status-select-wrap">
          <span className="sr-only">Change status for {task.title}</span>
          <select className={`status-pill status-${statusClass(task.status)}`} value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}>
            <option>To do</option><option>In progress</option><option>Completed</option>
          </select>
        </label>
        <span className="due-date"><CalendarDays size={13} /> {due}</span>
        <div className="task-actions">
          <button className="icon-button task-action" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={15} /></button>
          <button className="icon-button task-action delete-action" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={15} /></button>
        </div>
      </div>
    </article>
  );
}

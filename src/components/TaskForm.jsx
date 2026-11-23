import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = { title: "", description: "", status: "To do", priority: "Medium", dueDate: "" };

export default function TaskForm({ open, task, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(task ? {
        title: task.title || "",
        description: task.description || "",
        status: task.status || "To do",
        priority: task.priority || "Medium",
        dueDate: task.dueDate || "",
      } : emptyForm);
      setError("");
    }
  }, [open, task]);

  if (!open) return null;

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) {
      setError("Please enter a task title.");
      return;
    }
    if (!form.status || !form.priority || !form.dueDate) {
      setError("Please complete the status, priority and due date fields.");
      return;
    }
    onSubmit({ ...form, title, description: form.description.trim(), category: task?.category || "General" });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
        <div className="modal-heading">
          <div><h2 id="task-modal-title">{task ? "Edit task" : "Create new task"}</h2><p>Add your task details to stay on top of your work.</p></div>
          <button className="icon-button" onClick={onClose} aria-label="Close form"><X size={19} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="form-field"><span>Task title <b>*</b></span><input name="title" value={form.title} onChange={update} placeholder="e.g. Update landing page" autoFocus /></label>
          <label className="form-field"><span>Description</span><textarea name="description" value={form.description} onChange={update} placeholder="Add notes about this task..." rows="3" /></label>
          <div className="form-grid">
            <label className="form-field"><span>Status <b>*</b></span><select name="status" value={form.status} onChange={update}><option>To do</option><option>In progress</option><option>Completed</option></select></label>
            <label className="form-field"><span>Priority <b>*</b></span><select name="priority" value={form.priority} onChange={update}><option>Low</option><option>Medium</option><option>High</option></select></label>
          </div>
          <label className="form-field"><span>Due date <b>*</b></span><input type="date" name="dueDate" value={form.dueDate} onChange={update} /></label>
          <p className="required-note">* Required field</p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary">{task ? "Save changes" : "Create task"}</button></div>
        </form>
      </section>
    </div>
  );
}

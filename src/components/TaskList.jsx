import { ListTodo } from "lucide-react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (!tasks.length) {
    return <div className="empty-state"><ListTodo size={30} /><strong>No tasks found</strong><p>Try changing your search or filters, or create a new task.</p></div>;
  }
  return <div className="task-list">
    {tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />)}
  </div>;
}

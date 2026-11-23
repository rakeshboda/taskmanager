import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, ListTodo, Plus } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import useLocalStorage from "./hooks/useLocalStorage";
import { sampleTasks } from "./data/sampleTasks";

const STORAGE_KEY = "focusboard_tasks";

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, sampleTasks);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Overview");

  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((task) => task.status === "In progress").length;
    const completed = tasks.filter((task) => task.status === "Completed").length;
    return { total, inProgress, completed, percentage: total ? Math.round((completed / total) * 100) : 0 };
  }, [tasks]);

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = activeStatus === "All" || task.status === activeStatus;
    const matchesPriority = priority === "All" || task.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  }), [tasks, search, activeStatus, priority]);

  const openCreate = () => { setSelectedTask(null); setFormOpen(true); };
  const openEdit = (task) => { setSelectedTask(task); setFormOpen(true); };
  const saveTask = (values) => {
    if (selectedTask) {
      setTasks((current) => current.map((task) => task.id === selectedTask.id ? { ...task, ...values, id: task.id } : task));
    } else {
      setTasks((current) => [{ ...values, id: Date.now() + Math.floor(Math.random() * 1000) }, ...current]);
    }
    setFormOpen(false);
    setSelectedTask(null);
  };
  const deleteTask = (task) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${task.title}"? This action cannot be undone.`);
    if (confirmed) setTasks((current) => current.filter((item) => item.id !== task.id));
  };
  const changeStatus = (id, status) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task));
  const resetFilters = () => { setSearch(""); setActiveStatus("All"); setPriority("All"); };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={setActivePage} />
      <main className="main-area">
        <Header onMenuClick={() => setSidebarOpen(true)} onAddTask={openCreate} />
        <div className="dashboard-content">
          <div className="page-heading">
            <div><p className="eyebrow">WORKSPACE / OVERVIEW</p><h1>Your work, in focus.</h1><p>Plan your day, stay organized, and celebrate small wins.</p></div>
            <button className="button button-primary desktop-add" onClick={openCreate}><Plus size={16} /> New task</button>
          </div>

          <FocusNotes />

          <section className="stats-grid" aria-label="Task overview">
            <StatCard icon={ListTodo} label="Total tasks" value={stats.total} detail="Across all projects" tone="purple" />
            <StatCard icon={Clock3} label="In progress" value={stats.inProgress} detail="Keep the momentum" tone="blue" />
            <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} detail={`${stats.percentage}% of total tasks`} tone="green" />
          </section>

          <section className="tasks-section">
            <div className="section-heading"><div><h2>My tasks</h2><p>Manage and track everything in one place.</p></div><span className="task-count">{visibleTasks.length} {visibleTasks.length === 1 ? "task" : "tasks"}</span></div>
            <div className="task-tools">
              <FilterTabs activeStatus={activeStatus} onStatusChange={setActiveStatus} priority={priority} onPriorityChange={setPriority} onReset={resetFilters} />
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <TaskList tasks={visibleTasks} onEdit={openEdit} onDelete={deleteTask} onStatusChange={changeStatus} />
          </section>
        </div>
        <footer className="page-footer">Made for focused work <span>·</span> FocusBoard</footer>
      </main>

      <button className="mobile-create-button" onClick={openCreate} aria-label="Create new task"><Plus size={22} /></button>
      <TaskForm open={formOpen} task={selectedTask} onClose={() => { setFormOpen(false); setSelectedTask(null); }} onSubmit={saveTask} />
    </div>
  );
}

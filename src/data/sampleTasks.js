
const today = new Date();

const addDays = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const sampleTasks = [
  {
    id: 101,
    title: "Design landing page",
    description: "Website redesign",
    category: "Design",
    status: "To do",
    priority: "High",
    dueDate: addDays(1),
  },
  {
    id: 102,
    title: "Fix mobile navigation",
    description: "Frontend sprint - UI polish",
    category: "Development",
    status: "In progress",
    priority: "Medium",
    dueDate: addDays(2),
  },
  {
    id: 103,
    title: "Review onboarding copy",
    description: "Content updates - Approved",
    category: "Content",
    status: "Completed",
    priority: "Low",
    dueDate: addDays(3),
  },
  {
    id: 104,
    title: "Prepare API documentation",
    description: "Document task endpoints and responses",
    category: "Development",
    status: "In progress",
    priority: "High",
    dueDate: addDays(4),
  },
  {
    id: 105,
    title: "Test login functionality",
    description: "Verify validation and error states",
    category: "Testing",
    status: "To do",
    priority: "Medium",
    dueDate: addDays(5),
  },
  {
    id: 106,
    title: "Research dashboard patterns",
    description: "Collect references for the next iteration",
    category: "Research",
    status: "Completed",
    priority: "Low",
    dueDate: addDays(6),
  },
];

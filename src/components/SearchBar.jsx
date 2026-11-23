import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <Search size={16} />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Find a task..." aria-label="Search tasks by title" />
      {value && <button type="button" className="search-clear" onClick={() => onChange("")} aria-label="Clear search"><X size={15} /></button>}
    </label>
  );
}

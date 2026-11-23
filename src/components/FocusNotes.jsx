import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const notes = [
  { eyebrow: "FOCUS NOTES  ·  01 / 03", title: "Make today count.", description: "A little focus goes a long way.", task: "Design landing page", progress: 62 },
  { eyebrow: "FOCUS NOTES  ·  02 / 03", title: "Small steps, big progress.", description: "Keep your priorities in check.", task: "Fix mobile navigation", progress: 75 },
  { eyebrow: "FOCUS NOTES  ·  03 / 03", title: "Celebrate the wins.", description: "Every completed task moves you forward.", task: "Review onboarding copy", progress: 100 },
];

export default function FocusNotes() {
  const [active, setActive] = useState(0);
  const current = notes[active];
  const previous = () => setActive((index) => (index - 1 + notes.length) % notes.length);
  const next = () => setActive((index) => (index + 1) % notes.length);

  return (
    <section className="focus-banner" aria-label="Focus notes carousel">
      <div className="focus-content">
        <span className="focus-eyebrow">{current.eyebrow}</span>
        <h2>{current.title}</h2>
        <p>{current.description}</p>
        <div className="focus-indicators" aria-label="Choose focus note">
          {notes.map((note, index) => (
            <button key={note.title} aria-label={`Show focus note ${index + 1}`} aria-pressed={active === index}
              className={active === index ? "indicator active" : "indicator"} onClick={() => setActive(index)} />
          ))}
        </div>
      </div>
      <div className="focus-task-preview">
        <div className="focus-check"><Check size={13} /></div>
        <div className="focus-task-copy"><small>COMPLETED</small><strong>{current.task}</strong><div className="progress-track"><span style={{ width: `${current.progress}%` }} /></div></div>
        <b>{current.progress}%</b>
      </div>
      <div className="carousel-controls">
        <button className="carousel-arrow carousel-arrow-muted" onClick={previous} aria-label="Previous focus note"><ChevronLeft size={17} /></button>
        <button className="carousel-arrow" onClick={next} aria-label="Next focus note"><ChevronRight size={17} /></button>
      </div>
    </section>
  );
}

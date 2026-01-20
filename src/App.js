import { useState } from "react";
import "./App.css";

const data = [
  { id: 1, type: "announcement", title: "Welcome to the Digital Notice Board", text: "This is your central hub for announcements, events, and important updates.", date: "January 11, 2026", pinned: true },
  { id: 2, type: "event", title: "Team Meeting - Q1 Planning", text: "Join us for our quarterly planning meeting on January 15th at 10:00 AM.", date: "January 10, 2026", pinned: false },
  { id: 3, type: "important", title: "System Maintenance Scheduled", text: "The system will undergo maintenance on January 14th from 2:00 AM to 4:00 AM.", date: "January 9, 2026", pinned: false },
  { id: 4, type: "reminder", title: "Deadline: Project Submissions", text: "All project submissions are due by January 18th at 5:00 PM.", date: "January 8, 2026", pinned: false },
];

export default function App() {
  const [notices, setNotices] = useState(data);
  const [filter, setFilter] = useState("all");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title: "", text: "", type: "announcement" });

  const togglePin = (id) => {
    setNotices((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
    );
  };

  const removeNotice = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotice = () => {
    if (!form.title || !form.text) return;

    setNotices((prev) => [
      {
        id: Date.now(),
        ...form,
        date: new Date().toDateString(),
        pinned: false,
      },
      ...prev,
    ]);

    setForm({ title: "", text: "", type: "announcement" });
    setShow(false);
  };

  const filtered =
    filter === "all"
      ? notices
      : notices.filter((n) => n.type === filter);

  const sorted = [...filtered].sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="app">
      <header>
        <h1>📌 Digital Notice Board</h1>
        <button className="add-btn" onClick={() => setShow(true)}>
          + Add Notice
        </button>
      </header>

      <input className="search" placeholder="Search notices..." />

      <div className="filters">
        {["all", "announcement", "event", "reminder", "important"].map((f) => (
          <span
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? "active" : ""}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </span>
        ))}
      </div>

      <div className="grid">
        {sorted.map((n) => (
          <div key={n.id} className={`card ${n.type} ${n.pinned ? "pinned" : ""}`}>
            <button className="pin" onClick={() => togglePin(n.id)}>
              {n.pinned ? "📌" : "📍"}
            </button>

            <button className="delete" onClick={() => removeNotice(n.id)}>
              ✖
            </button>

            <small className="tag">{n.type}</small>
            <h3>{n.title}</h3>
            <p>{n.text}</p>
            <span className="date">{n.date}</span>
          </div>
        ))}
      </div>

      {show && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Add Notice</h3>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
            />

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="announcement">Announcement</option>
              <option value="event">Event</option>
              <option value="reminder">Reminder</option>
              <option value="important">Important</option>
            </select>

            <div className="modal-actions">
              <button onClick={() => setShow(false)}>Cancel</button>
              <button onClick={addNotice}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

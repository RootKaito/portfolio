"use client";

import { useState } from "react";
import { publishedLabs } from "../lib/labs";

const categories = ["All Labs", "Mobile Security", "Defensive Security", "Application Security"];

export default function LabsContent() {
  const [category, setCategory] = useState("All Labs");
  const visibleLabs = publishedLabs.filter((lab) => category === "All Labs" || lab.category === category);
  return <section className="section panel labs-section" aria-label="Published security labs">
    <div className="filters" role="group" aria-label="Filter labs">
      {categories.map((value) => <button key={value} className="filter" type="button" aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}
    </div>
    {visibleLabs.map((lab) => <div key={lab.title} className={lab.category !== "Application Security" ? "project-grid labs-grid" : undefined} dangerouslySetInnerHTML={{ __html: lab.markup }} />)}
    {visibleLabs.length === 0 && <div className="labs-empty"><p className="eyebrow">{category}</p><h2>No published labs yet.</h2><p>Published experiments will appear here when they are ready to explore.</p></div>}
    <p className="lab-meta" role="status" aria-live="polite">{visibleLabs.length} published lab{visibleLabs.length === 1 ? "" : "s"} · Independent, isolated environments.</p>
  </section>;
}

import React from 'react';

type Bullet = string;

interface Project {
  title: string;
  period: string;
  stack: string;
  color: string;
  live?: string;
  github?: string;
  liveLabel?: string;
  bullets: Bullet[];
}

const projects: Project[] = [
  {
    title: "ConnectUs",
    period: "Jul 2025 – Nov 2025",
    stack: "Flutter · GraphQL · Supabase · Hive · WebSockets",
    color: "bg-neo-cyan",
    github: "https://github.com/ojaswi1234",
    bullets: [
      "Built a WebSocket messaging layer supporting concurrent client sessions with automated reconnection logic — maintaining ≈250ms latency under high load.",
      "Reduced GraphQL payload size by ~30% by eliminating nested over-fetching and applying schema-level caching, cutting bandwidth and parse overhead.",
      "Enhanced local data retrieval speeds by >35% through Hive indexing and async persistence, enabling reliable offline-first functionality.",
      "Implemented OAuth 2.0 authentication and optimized app initialization to achieve a near-instant cold-start time.",
    ],
  },
  {
    title: "DevOps Dashboard",
    period: "Mar 2025 – May 2025",
    stack: "Node.js · MongoDB · Docker · Microservices",
    color: "bg-neo-orange",
    live: "https://github.com/ojaswi1234",
    liveLabel: "Live Demo",
    github: "https://github.com/ojaswi1234",
    bullets: [
      "Containerized a multi-tenant Node.js application using Docker, ensuring environment parity across development, staging, and production.",
      "Built a real-time axios module for server health monitoring with structured logging and automated error alerts.",
      "Implemented a Circuit Breaker pattern that significantly reduced service recovery time during simulated downstream failures.",
    ],
  },
  {
    title: "Just Notes",
    period: "Aug 2024 – Nov 2024",
    stack: "JavaScript · Browser Extension API · Manifest V3",
    color: "bg-neo-yellow",
    live: "https://microsoftedge.microsoft.com/addons/detail/just-notes/mddmihmmmhkmllhcdjhlfhnpgjngdild?hl=en-US",
    liveLabel: "Edge Add-on",
    github: "https://github.com/ojaswi1234/notes_maker_ext.git",
    bullets: [
      "Optimized data access by ~25% by refining browser storage I/O and minimizing redundant read/write operations.",
      "Engineered a live webpage annotation overlay with async event handling, reducing UI execution overhead by ~40%.",
      "Structured under Manifest V3, enforcing a privacy-first architecture and ensuring cross-browser runtime stability.",
    ],
  },
];

const ACCENT_TAG_COLORS = ["bg-neo-green", "bg-neo-pink", "bg-neo-cyan"];

export const ProjectSection = () => {
  return (
    <section id="projects" className="opacity-0 w-full py-20 flex flex-col items-center">
      <div className="neo-box bg-neo-pink dark:bg-pink-800 p-4 mb-16 transform rotate-2 self-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-black dark:text-white tracking-widest">
          Projects
        </h2>
      </div>

      <div className="w-full flex flex-col gap-10">
        {projects.map((proj, idx) => (
          <div key={idx} className="neo-box bg-white dark:bg-zinc-900 overflow-hidden">
            {/* Header bar */}
            <div className={`${proj.color} border-b-4 border-black dark:border-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}>
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-black">{proj.title}</h3>
                <span className="font-mono text-sm text-black/70 mt-0.5 block">{proj.period}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn bg-white text-black text-xs uppercase px-3 py-1.5"
                  >
                    {proj.liveLabel ?? "Live Demo"}
                  </a>
                )}
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn bg-black text-white text-xs uppercase px-3 py-1.5"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Stack row */}
            <div className="px-5 pt-4 pb-2 border-b-2 border-dashed border-black/20 dark:border-white/20">
              <div className="flex flex-wrap gap-2">
                {proj.stack.split(" · ").map((tech, i) => (
                  <span
                    key={i}
                    className={`${ACCENT_TAG_COLORS[i % ACCENT_TAG_COLORS.length]} border-2 border-black text-black font-mono font-bold text-xs px-2 py-0.5 uppercase`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bullets */}
            <ul className="p-5 space-y-3">
              {proj.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-3 h-3 border-2 border-black dark:border-white bg-neo-yellow dark:bg-yellow-600 inline-block" />
                  <p className="text-black dark:text-gray-200 text-sm md:text-base leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

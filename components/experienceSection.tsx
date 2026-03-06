import React from 'react';

const experiences = [
  {
    company: "Grazitti Interactive",
    role: "Software Engineer Trainee",
    period: "Jun 2025 – Nov 2025",
    color: "bg-neo-cyan",
    bullets: [
      "Refactored core Java modules by eliminating inefficient logic paths, improving execution efficiency by over 25%.",
      "Designed a high-throughput allocation engine using Factory and Singleton design patterns, improving processing accuracy and code maintainability.",
      "Ranked in the top 10th percentile of trainees by consistently delivering modular, testable code that passed system design and unit testing benchmarks.",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="opacity-0 w-full py-20 flex flex-col items-center">
      <div className="neo-box bg-neo-orange dark:bg-orange-800 p-4 mb-12 transform rotate-1 self-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-black dark:text-white tracking-widest">
          Experience
        </h2>
      </div>

      <div className="w-full flex flex-col gap-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="neo-box bg-white dark:bg-zinc-900 overflow-hidden">
            {/* Header */}
            <div className={`${exp.color} border-b-4 border-black dark:border-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2`}>
              <div>
                <h3 className="text-2xl font-black uppercase text-black">{exp.company}</h3>
                <span className="font-bold text-black/80 text-base">{exp.role}</span>
              </div>
              <span className="font-mono text-sm text-black/70 bg-white/50 border-2 border-black px-3 py-1 self-start sm:self-center">
                {exp.period}
              </span>
            </div>

            {/* Bullets */}
            <ul className="p-5 space-y-3">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-3 h-3 border-2 border-black dark:border-white bg-neo-pink dark:bg-pink-600 inline-block" />
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

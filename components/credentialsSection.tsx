import React from 'react';

const certifications = [
  {
    title: "Cloud Computing",
    issuer: "NPTEL / IIT",
    desc: "Cloud Deployment Patterns and Infrastructure Readiness",
    color: "bg-neo-yellow",
  },
  {
    title: "GitHub Fundamentals",
    issuer: "GitHub",
    desc: "Version Control, CI/CD Workflows, and Production Deployment",
    color: "bg-neo-pink",
  },
  {
    title: "Java",
    issuer: "HackerRank",
    desc: "Verified proficiency in Concurrency, Data Structures, and Algorithms",
    color: "bg-neo-cyan",
  },
];

const education = [
  {
    institution: "Lovely Professional University, Punjab",
    degree: "B.Tech in Computer Science and Engineering",
    period: "Since Aug 2023",
    detail: "CGPA: 7.0",
    color: "bg-neo-green",
  },
];

export const CredentialsSection = () => {
  return (
    <section id="credentials" className="opacity-0 w-full py-20 flex flex-col items-center gap-20">
      {/* Education */}
      <div className="w-full">
        <div className="neo-box bg-neo-green dark:bg-green-800 p-4 mb-10 transform -rotate-1 self-start inline-block">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-black dark:text-white tracking-widest">
            Education
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {education.map((edu, idx) => (
            <div key={idx} className="neo-box bg-white dark:bg-zinc-900 overflow-hidden">
              <div className={`${edu.color} border-b-4 border-black dark:border-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2`}>
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-black">{edu.institution}</h3>
                  <p className="font-bold text-black/80 text-base mt-0.5">{edu.degree}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                  <span className="font-mono text-sm text-black/70 bg-white/50 border-2 border-black px-3 py-1">{edu.period}</span>
                  <span className="font-black text-black text-lg">{edu.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="w-full">
        <div className="neo-box bg-neo-pink dark:bg-pink-800 p-4 mb-10 transform rotate-1 self-start inline-block">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-black dark:text-white tracking-widest">
            Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div key={idx} className="neo-box bg-white dark:bg-zinc-900 flex flex-col overflow-hidden">
              <div className={`${cert.color} border-b-4 border-black dark:border-white p-4`}>
                <h3 className="text-xl font-black uppercase text-black">{cert.title}</h3>
                <span className="text-sm font-bold text-black/70 uppercase font-mono">{cert.issuer}</span>
              </div>
              <p className="p-4 text-sm text-black dark:text-gray-200 leading-relaxed flex-1">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

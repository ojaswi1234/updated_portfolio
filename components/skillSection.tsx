type Skill = { name: string; src: string }

const categories: { label: string; color: string; skills: Skill[] }[] = [
  {
    label: "Backend",
    color: "bg-neo-yellow",
    skills: [
      { name: "Node.js", src: "/skills/Node.js.png" },
      { name: "Express.js", src: "/skills/Express.png" },
      { name: "Django", src: "/skills/Django.png" },
      { name: "Java", src: "/skills/Java.png" },
      { name: "C/C++", src: "/skills/c.png" },
      { name: "GraphQL", src: "/skills/graphql.png" },
      { name: "WebSockets", src: "/skills/Socket.io.png" },
    ],
  },
  {
    label: "Frontend & Mobile",
    color: "bg-neo-pink",
    skills: [
      { name: "Next.js", src: "/skills/Next.js.png" },
      { name: "React", src: "/skills/react.png" },
      { name: "TypeScript", src: "/skills/typescript.png" },
      { name: "JavaScript", src: "/skills/JavaScript.png" },
      { name: "Tailwind CSS", src: "/skills/tailwind.png" },
      { name: "Flutter", src: "/skills/flutter.png" },
    ],
  },
  {
    label: "Databases & Caching",
    color: "bg-neo-cyan",
    skills: [
      { name: "MongoDB", src: "/skills/mongodb.png" },
      { name: "PostgreSQL", src: "/skills/postgresql.png" },
      { name: "MySQL", src: "/skills/mysql.png" },
      { name: "Redis", src: "/skills/redis.png" },
      { name: "Supabase", src: "/skills/supabase.png" },
      { name: "Hive", src: "/skills/hive.png" },
    ],
  },
  {
    label: "DevOps & Infra",
    color: "bg-neo-orange",
    skills: [
      { name: "Docker", src: "/skills/docker.png" },
      { name: "Linux", src: "/skills/linux.png" },
      { name: "GCP", src: "/skills/gcp.png" },
      { name: "Vercel", src: "/skills/vercel.png" },
      { name: "Git", src: "/skills/git.png" },
      { name: "GitHub", src: "/skills/github.png" },
    ],
  },
]

export const SkillSection = () => {
  return (
    <section id="skills" className="opacity-0 w-full py-20 flex flex-col items-center">
      {/* Section header */}
      <div className="neo-box bg-neo-green dark:bg-green-800 p-4 mb-12 transform -rotate-2 self-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-black dark:text-white tracking-widest">
          Skills & Tech
        </h2>
      </div>

      {/* Skills board — Bento Grid Layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, catIdx) => (
          <div
            key={catIdx}
            className="neo-box bg-white dark:bg-zinc-900 p-6 flex flex-col gap-6 hover:translate-x-1 hover:-translate-y-1 transition-transform duration-200"
          >
            {/* Category label chip */}
            <div className="flex items-center justify-between border-b-4 border-black dark:border-white pb-3">
              <span
                className={`${cat.color} border-2 border-black text-black font-black uppercase text-sm px-3 py-1.5`}
              >
                {cat.label}
              </span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-black dark:bg-white"></div>
                <div className="w-3 h-3 rounded-full border-2 border-black dark:border-white"></div>
              </div>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="neo-btn px-3 py-1.5 flex items-center gap-2 bg-white dark:bg-zinc-800 hover:bg-neo-yellow dark:hover:bg-yellow-600 transition-all active:translate-y-1 active:shadow-none"
                >
                  <img src={skill.src} alt={skill.name} className="w-5 h-5 object-contain" />
                  <span className="font-bold text-sm tracking-tight text-black dark:text-white">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

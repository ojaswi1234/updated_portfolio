
import { NavBar } from "../components/NavBar";
import { ModeToggle } from "../components/darkButton";

import { useState, useEffect } from "react";
import { SkillSection } from "../components/skillSection";
import { animate } from "animejs";

import { Scanlines } from "../components/ui/overlays";
import { AnimeLoader } from "../components/loading";

import { ExperienceSection } from "../components/experienceSection";
import { CredentialsSection } from "../components/credentialsSection";
import { ContactSection } from "../components/contactus";
import { TerminalSection } from "../components/terminalSection";
import { ProjectSection } from "../components/projectSection";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Scroll Animations Effect
  useEffect(() => {
    if (!loading) {
      // Elements to animate
      const sections = document.querySelectorAll('section');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [50, 0],
              easing: 'easeOutExpo',
              duration: 1000,
              delay: 100
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      sections.forEach(section => {
        section.style.opacity = '0'; // Initial state
        observer.observe(section);
      });
      
      return () => observer.disconnect();
    }
  }, [loading]);

  if (loading) {
    return <AnimeLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <Scanlines />
      
      <main className="min-h-screen py-6 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-16 pt-24">
        <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
        </div>
        <NavBar />

        <section id="greeting" className="relative mt-4 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 opacity-0">
          
          {/* Left Side: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start space-y-8 z-10">
            <div className="neo-box bg-neo-yellow dark:bg-yellow-600 p-6 sm:p-10 w-full text-center lg:text-left hover:-translate-y-1 hover:translate-x-1 transition-transform duration-200">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white relative inline-block">
                Hey there, <br/> 
                <span className="relative inline-block hover:animate-glitch cursor-default">I&apos;m Ojaswi!
                  <span className="absolute top-0 left-0 -z-10 w-full h-full text-neo-pink opacity-0 hover:opacity-100 hover:translate-x-[2px] hover:translate-y-[2px] transition-all">I&apos;m Ojaswi!</span>
                  <span className="absolute top-0 left-0 -z-10 w-full h-full text-neo-cyan opacity-0 hover:opacity-100 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all delay-75">I&apos;m Ojaswi!</span>
                </span>
              </h1>
            </div>
          
            <div className="neo-box bg-neo-cyan dark:bg-cyan-800 text-black dark:text-white p-6 w-full text-center lg:text-left text-base sm:text-lg font-bold">
              <p>
                Backend-focused Software Engineer building distributed systems, real-time applications &amp; microservices with Node.js, GraphQL, and Docker.
              </p>
              <p className="mt-2 font-mono text-sm font-normal opacity-80">
                B.Tech CSE @ LPU &nbsp;·&nbsp; Ex-Trainee @ Grazitti Interactive
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full">
              <a href="#projects" className="neo-btn bg-neo-pink dark:bg-pink-700 text-black dark:text-white px-8 py-3 text-lg uppercase cursor-pointer block">
                View Projects
              </a>
              <a href="mailto:ojaswideep2020@gmail.com" className="neo-btn bg-neo-yellow text-black px-8 py-3 text-lg uppercase cursor-pointer block">
                Hire Me
              </a>
              <button 
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                className="neo-btn bg-neo-green dark:bg-green-700 text-black dark:text-white px-8 py-3 text-lg uppercase cursor-pointer flex items-center justify-center gap-2"
              >
                Open Shell
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side: Photo */}
          <div className="relative flex-1 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 neo-box bg-neo-orange overflow-hidden">
              <img
                src="/linkedin_profile.png"
                alt="Profile photo of Ojaswi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Terminal View */}
        {isTerminalOpen && (
          <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setIsTerminalOpen(false)}>
            <div className="neo-box w-full max-w-5xl bg-[#0a0e14] p-0 flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 border-b-4 border-black dark:border-zinc-600 p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600"></div>
                  </div>
                  <span className="font-mono text-green-400 text-sm font-bold">ojaswi@portfolio:~</span>
                </div>
                <button title="Close Terminal" onClick={() => setIsTerminalOpen(false)} className="bg-red-500 border border-red-600 w-6 h-6 rounded hover:bg-red-600 transition-colors flex items-center justify-center text-white text-xs font-bold">✕</button>
              </div>
              <div className="h-[70vh] overflow-hidden">
                <TerminalSection />
              </div>
            </div>
          </section>
        )}

      {/* GitHub Stats */}
      <section className="neo-box bg-white dark:bg-zinc-800 p-8 w-full opacity-0">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-black dark:text-white mb-8 border-b-4 border-black dark:border-white pb-4">
          GitHub Stats
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 w-full bg-neo-cyan dark:bg-cyan-900 border-4 border-black dark:border-white p-4 relative h-96">
            <img
              src="https://raw.githubusercontent.com/ojaswi1234/ojaswi1234/main/images/userstats.svg"
              alt="GitHub Stats"
              className="w-full mix-blend-multiply dark:mix-blend-normal object-contain"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="neo-box bg-neo-yellow p-3 relative h-12">
              <img src="https://img.shields.io/badge/Commits-1K%2B-38B6FF?style=for-the-badge&logo=git&logoColor=black" alt="Commits" className="w-full h-auto object-contain" />
            </div>
            <div className="neo-box bg-neo-pink p-3 relative h-12">
              <img src="https://img.shields.io/badge/Contributions-200%2B-3ECF8E?style=for-the-badge&logo=github&logoColor=black" alt="Contributions" className="w-full h-auto object-contain" />
            </div>
            <div className="neo-box bg-neo-orange p-3 relative h-12">
              <img src="https://img.shields.io/badge/Activity-100%25-00D4AA?style=for-the-badge&logo=dependabot&logoColor=black" alt="Activity" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      <SkillSection />
      <ExperienceSection />
      <ProjectSection />
      <CredentialsSection />
      <ContactSection />
    </main>
    </>
  );
}

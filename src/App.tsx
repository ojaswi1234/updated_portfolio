
import { NavBar } from "../components/NavBar";
import { ModeToggle } from "../components/darkButton";

import { useState, useEffect, useRef, useCallback } from "react";
import { SkillSection } from "../components/skillSection";
import { animate } from "animejs";

import { Scanlines } from "../components/ui/overlays";
import { AnimeLoader } from "../components/loading";

import { ExperienceSection } from "../components/experienceSection";
import { CredentialsSection } from "../components/credentialsSection";
import { ContactSection } from "../components/contactus";
import { TerminalSection } from "../components/terminalSection";
import { ProjectSection } from "../components/projectSection";
import { ScrollIndicator } from "../components/ScrollIndicator";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const terminalOverlayRef = useRef<HTMLDivElement>(null);
  const terminalBoxRef = useRef<HTMLDivElement>(null);

  // Animate terminal open
  useEffect(() => {
    if (isTerminalOpen && terminalOverlayRef.current && terminalBoxRef.current) {
      // Set initial state
      terminalOverlayRef.current.style.opacity = '0';
      terminalBoxRef.current.style.opacity = '0';
      terminalBoxRef.current.style.transform = 'scale(0.4) translateY(40px)';
      terminalBoxRef.current.style.borderRadius = '50%';

      // Animate backdrop fade in
      animate(terminalOverlayRef.current, {
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 300,
      });

      // Animate terminal box morph in
      animate(terminalBoxRef.current, {
        opacity: [0, 1],
        scale: [0.4, 1.03, 1],
        translateY: [40, -8, 0],
        borderRadius: ['50%', '12px', '8px'],
        easing: 'easeOutExpo',
        duration: 600,
        delay: 100,
      });
    }
  }, [isTerminalOpen]);

  // Close with animation
  const closeTerminal = useCallback(() => {
    if (terminalOverlayRef.current && terminalBoxRef.current) {
      animate(terminalBoxRef.current, {
        opacity: [1, 0],
        scale: [1, 0.85],
        translateY: [0, 30],
        easing: 'easeInQuad',
        duration: 250,
      });
      animate(terminalOverlayRef.current, {
        opacity: [1, 0],
        easing: 'easeInQuad',
        duration: 300,
        delay: 50,
        onComplete: () => setIsTerminalOpen(false),
      });
    } else {
      setIsTerminalOpen(false);
    }
  }, []);

  // Lock body scroll when terminal overlay is open
  useEffect(() => {
    document.documentElement.style.overflow = isTerminalOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [isTerminalOpen]);

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
      
      <main className="min-h-screen py-6 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-10 md:space-y-16 pt-20 md:pt-8">
        <div className="fixed top-[70px] md:top-4 right-4 z-50">
            <ModeToggle />
        </div>
        <NavBar />

        <section id="greeting" className="relative mt-4 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 opacity-0">
          
          {/* Left Side: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start space-y-8 z-10">
            <div className="neo-box bg-neo-yellow dark:bg-yellow-600 p-6 sm:p-10 w-full text-center lg:text-left hover:-translate-y-1 hover:translate-x-1 transition-transform duration-200">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black  tracking-tight text-black dark:text-white relative inline-block">
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
              
              <button 
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                className="neo-btn bg-neo-green dark:bg-green-700 text-black dark:text-white px-8 py-3 text-lg uppercase cursor-pointer flex items-center justify-center gap-2"
              >
                Open Shell
                <svg xmlns="http://www.w3.org/2000/svg" className="size-8" viewBox="0 0 24 24" fill="currentColor">
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

        {/* Terminal View — moved outside main below */}

      {/* GitHub Stats */}
      <section id="github-stats" className="neo-box bg-white dark:bg-zinc-800 p-4 md:p-8 w-full opacity-0">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-black dark:text-white mb-8 border-b-4 border-black dark:border-white pb-4">
          GitHub Stats
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 w-full bg-neo-cyan dark:bg-cyan-900 border-4 border-black dark:border-white p-4 relative h-fit">
            <img
              src="https://raw.githubusercontent.com/ojaswi1234/ojaswi1234/main/images/terminal-stats.svg"
              alt="GitHub stats"
              className="w-full mix-blend-multiply dark:mix-blend-normal object-contain"
            />
          </div>
          
        </div>
      </section>

      <SkillSection />
      <ExperienceSection />
      <ProjectSection />
      <CredentialsSection />
      <ContactSection />
    </main>
    <ScrollIndicator />

    {/* Terminal Overlay */}
    {isTerminalOpen && (
      <div ref={terminalOverlayRef} className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 10000, background: 'rgba(0, 0, 0, 0.8)' }} onClick={closeTerminal}>
        <div ref={terminalBoxRef} className="w-full max-w-5xl bg-[#0a0e14] rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10" onClick={e => e.stopPropagation()}>
          <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 border-b border-zinc-600 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
            <div className="flex gap-2">
              <button title="Close Terminal" onClick={closeTerminal} className="w-3 h-3 rounded-full bg-red-500 border border-red-600 hover:bg-red-600 transition-colors cursor-pointer"></button>
              <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600"></div>
              <button title="Maximize Terminal" className="w-3 h-3 rounded-full bg-green-500 border border-green-600 hover:bg-green-600 transition-colors cursor-pointer"></button>
            </div>
            <span className="font-mono text-green-400 text-xs sm:text-sm font-bold truncate">ojaswi@portfolio:~</span>
          </div>
          <div className="h-[55vh] sm:h-[65vh] md:h-[70vh] overflow-hidden overflow-x-auto">
            <TerminalSection onClose={closeTerminal} />
          </div>
        </div>
      </div>
    )}
    </>
  );
}

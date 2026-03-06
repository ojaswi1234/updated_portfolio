import React, { useState, useEffect } from 'react'

export const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        setShow(false); 
      } else { 
        setShow(true);  
      }
      setLastScrollY(window.scrollY); 
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav className={`neo-box bg-white dark:bg-zinc-800 flex justify-between items-center p-4 fixed top-0 left-0 right-0 mx-auto max-w-7xl z-40 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex items-center gap-4">
        <a href="#greeting" className="text-2xl font-black uppercase text-black dark:text-white hover:text-neo-pink transition-colors">
          Ojaswi
        </a>
      </div>

      <div className="hidden md:flex items-center gap-6 font-bold uppercase text-sm">
        <a href="#greeting" className="text-black hover:bg-neo-yellow px-3 py-1 border-2 border-transparent hover:border-black dark:hover:border-white transition-all">Home</a>
        <a href="#skills" className="text-black hover:bg-neo-green px-3 py-1 border-2 border-transparent hover:border-black dark:hover:border-white transition-all">Skills</a>
        <a href="#experience" className="text-black hover:bg-neo-cyan px-3 py-1 border-2 border-transparent hover:border-black dark:hover:border-white transition-all">Experience</a>
        <a href="#projects" className="text-black hover:bg-neo-orange px-3 py-1 border-2 border-transparent hover:border-black dark:hover:border-white transition-all">Projects</a>
        <a href="#credentials" className="text-black hover:bg-neo-pink px-3 py-1 border-2 border-transparent hover:border-black dark:hover:border-white transition-all">Credentials</a>
        <a href="#contact" className="text-black hover:bg-neo-yellow px-3 py-1 border-2 border-transparent hover:border-black dark:hover:border-white transition-all">Contact</a>
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <div className="md:hidden relative">
          <button 
          title="sone"
            className="neo-btn bg-neo-yellow p-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-4 top-full mt-4 neo-box bg-white dark:bg-zinc-800 flex flex-col min-w-[220px] text-lg font-bold uppercase shadow-2xl z-50">
              <a href="#greeting" onClick={() => setDropdownOpen(false)} className="text-black p-4 border-b-4 border-black dark:border-white hover:bg-neo-yellow">Home</a>
              <a href="#skills" onClick={() => setDropdownOpen(false)} className="text-black p-4 border-b-4 border-black dark:border-white hover:bg-neo-green">Skills</a>
              <a href="#experience" onClick={() => setDropdownOpen(false)} className="text-black p-4 border-b-4 border-black dark:border-white hover:bg-neo-cyan">Experience</a>
              <a href="#projects" onClick={() => setDropdownOpen(false)} className="text-black p-4 border-b-4 border-black dark:border-white hover:bg-neo-orange">Projects</a>
              <a href="#credentials" onClick={() => setDropdownOpen(false)} className="text-black p-4 border-b-4 border-black dark:border-white hover:bg-neo-pink">Credentials</a>
              <a href="#contact" onClick={() => setDropdownOpen(false)} className="text-black p-4 hover:bg-neo-yellow">Contact</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

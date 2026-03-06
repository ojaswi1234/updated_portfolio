import React from 'react';
import { IoStar } from "react-icons/io5";

const skills = [
  "FULL STACK ENGINEERING",
  "React & NEXT.JS",
  "NODE.JS & BACKEND",
  "SYSTEM ARCHITECTURE",
  "OPEN SOURCE",
  "UI/UX DESIGN",
  "CLOUD NATIVE", 
  "TYPE SAFETY"
];

export const Marquee = () => {
    return (
        <div className="w-full bg-black dark:bg-zinc-800 border-y-4 border-black dark:border-white py-3 overflow-hidden flex whitespace-nowrap mb-12 select-none">
            <div className="animate-infinite-scroll flex gap-8 font-black text-white dark:text-neo-yellow text-xl sm:text-2xl uppercase tracking-widest pl-4 w-max">
                {/* 3 copies to ensure smooth loop */}
                {[...skills, ...skills, ...skills].map((skill, i) => (
                    <span key={i} className="flex items-center gap-8">
                        {skill}
                        <IoStar className="text-neo-pink text-xl" />
                    </span>
                ))}
            </div>
        </div>
    )
}
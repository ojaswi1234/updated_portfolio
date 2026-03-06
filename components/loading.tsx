import React, { useEffect, useRef } from 'react';
import { animate, createTimeline } from 'animejs';

export const AnimeLoader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressPercentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial Text Scramble Setup
    const textWrapper = textRef.current;
    if (textWrapper) {
      // Split text into spans for per-letter animation
      const originalText = textWrapper.textContent || '';
      textWrapper.innerHTML = originalText.replace(/\S/g, "<span class='letter inline-block opacity-0'>$&</span>");
    }

    // 2. Main Timeline
    const timeline = createTimeline({
      loop: false,
      onComplete: () => {
        // Fade out whole container
        if (containerRef.current) {
          animate(containerRef.current, {
            opacity: 0,
            duration: 500,
            easing: 'easeInOutQuad',
            onComplete: onComplete
          });
        }
      }
    });

    // 3. Progress Value + Bar Animation
    const progressObj = { value: 0 };
    
    // Animate the 'value' from 0 to 100
    timeline.add(progressObj, {
      value: 100,
      round: 1, // Anime.js built-in rounding
      duration: 2500,
      easing: 'easeInOutExpo',
      // Update the DOM elements on every frame
      onUpdate: () => {
        const currentVal = Math.round(progressObj.value);
        // Update Percentage Text
        if (progressPercentRef.current) {
          progressPercentRef.current.innerText = `${currentVal}%`;
        }
        // Update Progress Bar Width
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${currentVal}%`;
        }
      }
    }, 0);

    // 4. Text Reveal (Scramble In)
    timeline.add('.letter', {
      opacity: [0, 1],
      translateX: [40, 0],
      translateZ: 0,
      scaleX: [0.3, 1], 
      easing: "easeOutExpo",
      duration: 800,
      delay: (el: any, i: number) => 100 + 30 * i 
    }, 200);

    // 5. Text Scramble Effect (Random Characters)
    // Run this concurrently with the reveal
    const scrambleObj = { p: 0 };
    timeline.add(scrambleObj, {
        p: 100,
        duration: 2000,
        easing: 'linear',
        onUpdate: (anim: any) => {
            if (!textWrapper) return;
            const letters = textWrapper.querySelectorAll('.letter');
            letters.forEach((letter) => {
               // Randomly change characters during the animation
               if(Math.random() > 0.85 && anim.progress < 90) {
                   const charCode = 33 + Math.floor(Math.random() * 94);
                   letter.innerHTML = String.fromCharCode(charCode);
               } 
               // Restore original character logic would be complex without storing it,
               // so we just let it be random until the final cleanup step.
            });
        }
    }, 0);

    // 6. Final Text Cleanup
    // Ensure final text is readable ("SYSTEM READY")
    timeline.add(scrambleObj, {
        p: 100,
        duration: 1,
        onUpdate: () => {
             if(textWrapper) textWrapper.innerHTML = "SYSTEM READY";
        }
    }, '+=100'); // small delay after scramble ends

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white px-4">
      
      {/* Main Title */}
      <div className="text-4xl sm:text-6xl md:text-8xl font-black font-mono tracking-tighter mb-12 text-center text-white uppercase glitch-text" ref={textRef}>
        INITIALIZING...
      </div>
      
      {/* Progress Container */}
      <div className="w-full max-w-md flex flex-col gap-2">
        {/* Progress Bar Track */}
        <div className="w-full h-6 border-2 border-white/30 bg-black p-1 relative overflow-hidden">
            {/* Grid Background in Bar */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_95%,#ffffff_95%)] bg-[length:20px_100%]"></div>
            
            {/* Active Progress Fill */}
            <div ref={progressBarRef} className="h-full bg-neo-green w-0 transition-all duration-75 ease-out shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
        </div>
        
        {/* Percentage Display */}
        <div className="flex justify-between font-mono font-bold text-sm md:text-base text-neo-green uppercase">
          <span>Loading Assets</span>
          <span ref={progressPercentRef}>0%</span>
        </div>
      </div>

    </div>
  );
};

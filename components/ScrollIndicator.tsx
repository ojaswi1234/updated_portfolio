import { useState, useEffect, useRef, useCallback } from "react";

const THUMB_SIZE = 14;
const BAR_PADDING = 16;

const SECTION_LABELS: Record<string, string> = {
  greeting: "Hello",
  "github-stats": "GitHub Stats",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  credentials: "Credentials",
  contact: "Contact",
};

export function ScrollIndicator() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [dragging, setDragging] = useState(false);
  const rafId = useRef<number>(0);
  const barRef = useRef<HTMLDivElement>(null);

  const scrollToPercent = useCallback((percent: number) => {
    const el = document.documentElement;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    window.scrollTo({ top: percent * scrollHeight });
  }, []);

  const updateScroll = useCallback(() => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const percent = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;

    setScrollPercent(percent);
    setVisible(scrollTop > window.innerHeight * 0.4);

    // Determine which section is most visible
    const viewMid = scrollTop + window.innerHeight / 2;
    let activeName = "";
    const ids = Object.keys(SECTION_LABELS);
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= viewMid) {
        activeName = SECTION_LABELS[id];
      }
    }
    setCurrentSection(activeName);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(updateScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateScroll]);

  // Drag handlers
  const getPercentFromY = useCallback((clientY: number) => {
    const bar = barRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    const trackTop = rect.top + BAR_PADDING;
    const trackHeight = rect.height - BAR_PADDING * 2 - THUMB_SIZE;
    return Math.min(1, Math.max(0, (clientY - trackTop - THUMB_SIZE / 2) / trackHeight));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    const percent = getPercentFromY(e.clientY);
    scrollToPercent(percent);
  }, [getPercentFromY, scrollToPercent]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    const percent = getPercentFromY(e.clientY);
    scrollToPercent(percent);
  }, [dragging, getPercentFromY, scrollToPercent]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const thumbTop = `calc(${BAR_PADDING}px + (100vh - ${BAR_PADDING * 2 + THUMB_SIZE}px) * ${scrollPercent})`;

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: 36,
        zIndex: 9999,
        pointerEvents: visible ? "auto" : "none",
        cursor: dragging ? "grabbing" : "pointer",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        touchAction: "none",
      }}
      className="scroll-indicator"
    >
      {/* Thin track */}
      <div
        style={{
          position: "absolute",
          left: 17,
          top: BAR_PADDING,
          bottom: BAR_PADDING,
          width: 3,
          borderRadius: 2,
          background: "var(--foreground)",
          opacity: 0.12,
        }}
      />

      {/* Circular thumb */}
      <div
        style={{
          position: "absolute",
          left: 17,
          transform: "translateX(-50%)",
          top: thumbTop,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: "50%",
          background: "var(--foreground)",
          opacity: dragging ? 0.8 : 0.5,
          boxShadow: "0 0 6px rgba(0,0,0,0.15)",
          transition: dragging ? "none" : "opacity 0.2s ease",
          scale: dragging ? "1.3" : "1",
        }}
      />

      {/* Section label — always visible */}
      {currentSection && (
        <div
          style={{
            position: "absolute",
            right: 32,
            top: thumbTop,
            transform: "translateY(-25%)",
            whiteSpace: "nowrap",
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "inherit",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--background)",
            background: "var(--foreground)",
            borderRadius: 4,
            opacity: 0.85,
            pointerEvents: "none",
          }}
        >
          {currentSection}
        </div>
      )}
    </div>
  );
}

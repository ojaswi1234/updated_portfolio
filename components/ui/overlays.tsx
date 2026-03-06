import React, { useEffect, useState } from 'react';

export const Scanlines = () => {
    return (
        <div className="pointer-events-none fixed top-0 left-0 h-screen w-screen z-[100] opacity-[0.04] mix-blend-overlay pointer-events-none select-none">
            <div className="absolute inset-0 bg-transparent bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] animate-pulse"></div>
        </div>
    );
};
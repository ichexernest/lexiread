'use client'

import { useEffect, useRef } from 'react'
import { animate, createScope, createSpring, createDraggable } from 'animejs';


export default function Loading() {
    const roots = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!roots.current) return;

        const scope = createScope({ root: roots.current }).add(scope => {

        animate('span', {
            // Property keyframes
            y: [
              { to: '-2.75rem', ease: 'outExpo', duration: 600 },
              { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
            ],
            // Property specific parameters
            rotate: {
              from: '-1turn',
              delay: 0
            },
            delay: (_, i) => i * 50, // Function based value
            ease: 'inOutCirc',
            loopDelay: 1000,
            loop: true
          });
  
      });
  
      // Properly cleanup all anime.js instances declared inside the scope
      return () => scope.revert();
  
    }, []);
  return (
    <div ref={roots} className="flex justify-center items-center w-screen h-screen overflow-hidden">
      <h2 className="flex gap-1 text-4xl font-bold text-gray-800">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </h2>
    </div>
  )
}

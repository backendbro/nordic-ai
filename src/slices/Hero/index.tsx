"use client";

import { FC, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import { Shapes } from "./Shapes";

const Hero: FC = () => {
  const component = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.fromTo(
      ".hero-title",
      { y: 80, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3 }
    );

    tl.fromTo(
      ".hero-subtitle",
      { y: 40, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1 },
      "-=0.9"
    );

    tl.fromTo(
      ".hero-tagline",
      { y: 25, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
      "-=0.85"
    );
  }, []);

  return (
    <Bounded ref={component} className="relative">
      <div className="grid min-h-[85vh] grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* AI Core Visual */}
        <Shapes />

        {/* Left Text Section */}
        <div className="col-start-1 md:row-start-1">
          <h1
            className="
                hero-title 
                text-transparent bg-clip-text 
                bg-gradient-to-br from-white via-blue-200 to-cyan-300
                drop-shadow-[0_0_35px_rgba(100,160,255,0.45)]
                font-extrabold tracking-tight leading-[0.95]
                whitespace-nowrap
                text-[clamp(3.5rem,15vmin,13rem)]
              "
          >
            Nordic AI
          </h1>

          <p
            className="
                hero-subtitle
                mt-6 text-3xl md:text-5xl
                bg-clip-text text-transparent 
                bg-gradient-to-r from-blue-200 via-cyan-200 to-white
                font-semibold 
                drop-shadow-[0_0_20px_rgba(140,200,255,0.4)]
                max-w-xl
              "
          >
            Autonomous Intelligence for the Leaders of Tomorrow
          </p>

          <p
            className="
                hero-tagline
                mt-6 text-xl md:text-2xl 
                text-slate-300/80 tracking-wide
                font-medium 
                max-w-lg
              "
          >
            Transform workflows. Augment teams. Accelerate execution.
          </p>

          <p
            className="
                hero-tagline
                mt-4 text-sm md:text-base 
                text-slate-400 uppercase tracking-[0.25em]
              "
          >
            AI AGENTS • AUTOMATION • INTELLIGENCE SYSTEMS
          </p>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;

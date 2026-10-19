"use client";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";

export default function Marquee({ items, speed = 20 }) {
  const controls = useAnimation();

 
  const startAnimation = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: { repeat: Infinity, ease: "linear", duration: speed },
    });
  };

 
  useEffect(() => {
    startAnimation();
  }, [controls, speed]);

  
  const handleMouseEnter = () => {
    controls.stop();
  };

 
  const handleMouseLeave = () => {
    startAnimation();
  };

  return (
    <div 
      className="overflow-hidden w-full relative flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={controls}
        className="flex whitespace-nowrap items-center"
      >
       
        {items.map((item, index) => (
          <div key={index} className="mx-3 px-5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-2">
            {item.icon && <item.icon size={16} className="text-accent" />}
            {item.label}
          </div>
        ))}
       
        {items.map((item, index) => (
          <div key={`dup-${index}`} className="mx-3 px-5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-2">
            {item.icon && <item.icon size={16} className="text-accent" />}
            {item.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
"use client";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";

export default function Marquee({ items, speed = 20 }) {
  const controls = useAnimation();

  // অ্যানিমেশন শুরু করার ফাংশন
  const startAnimation = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: { repeat: Infinity, ease: "linear", duration: speed },
    });
  };

  // কম্পোনেন্ট লোড হওয়ার সাথে সাথে অ্যানিমেশন চালু হবে
  useEffect(() => {
    startAnimation();
  }, [controls, speed]);

  // মাউস নিলে অ্যানিমেশন পজ হবে
  const handleMouseEnter = () => {
    controls.stop();
  };

  // মাউস সরালে আবার অ্যানিমেশন চালু হবে
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
        {/* প্রথম সেট */}
        {items.map((item, index) => (
          <div key={index} className="mx-3 px-5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-2">
            {item.icon && <item.icon size={16} className="text-accent" />}
            {item.label}
          </div>
        ))}
        {/* দ্বিতীয় সেট (সিমলেস লুপের জন্য) */}
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
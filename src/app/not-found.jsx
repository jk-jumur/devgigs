"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Terminal, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F6] dark:bg-slate-950 relative overflow-hidden transition-colors duration-300 px-4">
 
      <motion.div 
        className="absolute w-[600px] h-[600px] bg-accent/10 dark:bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
 
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex justify-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-3xl font-extrabold text-brand dark:text-white hover:opacity-80 transition-opacity">
            <Terminal className="text-accent" size={40} />
            DevGigs
          </Link>
        </motion.div>

      
        <div className="relative inline-block">
          <h1 className="text-9xl md:text-[180px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-100 dark:from-slate-700 dark:to-slate-900 tracking-tighter leading-none">
            404
          </h1>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Sparkles className="text-accent/50" size={120} />
          </motion.div>
        </div>

      
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-4 mt-4">
          Lost in the Code?
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist. It might have been moved, deleted, or perhaps it never existed at all.
        </p>

   
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold shadow-lg shadow-accent/20 hover:-translate-y-1 transition-transform">
              <ArrowLeft size={18} className="mr-2" /> Back to Home
            </Button>
          </Link>
          <Link href="/items">
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold dark:text-white dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <Search size={18} className="mr-2" /> Browse Gigs
            </Button>
          </Link>
        </div>
      </motion.div>

      
      <p className="absolute bottom-8 text-sm text-slate-400 dark:text-slate-600 font-medium">
        © {new Date().getFullYear()} DevGigs Inc. All rights reserved.
      </p>
    </div>
  );
}
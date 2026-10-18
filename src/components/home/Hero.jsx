"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      
      <motion.div 
        initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center"
      >
        <motion.div variants={fadeInUp}>
          <Badge color="accent">🚀 Trusted by 10,000+ developers</Badge>
        </motion.div>
        <motion.h1 variants={fadeInUp} className="mt-6 text-4xl md:text-6xl font-extrabold text-brand dark:text-white leading-tight tracking-tight">
          Hire top developers. <br />
          <span className="text-accent">Or become one.</span>
        </motion.h1>
        <motion.p variants={fadeInUp} className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          DevGigs is the premium marketplace where developers post tech gigs and clients find the perfect match — fast, reliable, and transparent.
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/items">
            <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold text-brand shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Browse Gigs <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <Link href="/items/add">
            <Button variant="primary" size="lg" className="w-full sm:w-auto dark:bg-white dark:text-brand">
              Post a Gig
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
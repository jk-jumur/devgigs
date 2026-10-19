"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CareersPage() {
  const jobs = [
    { title: "Senior Frontend Engineer", type: "Full-time", location: "Remote", dept: "Engineering" },
    { title: "Product Designer (UI/UX)", type: "Full-time", location: "Dhaka, BD", dept: "Design" },
    { title: "Developer Relations Advocate", type: "Part-time", location: "Remote", dept: "Community" },
    { title: "Backend Engineer (Node.js)", type: "Full-time", location: "Remote", dept: "Engineering" },
  ];

  const handleApply = (jobTitle) => {
    toast.success(`Application started for: ${jobTitle}`);
  };

  const handleSendResume = () => {
    toast.success("Resume submission portal opening soon!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            
            <motion.div 
              initial="hidden" animate="visible" variants={fadeInUp}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center justify-center p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <Briefcase className="text-accent" size={32} />
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-4 tracking-tight">
                Join Our Team
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                We are building the future of freelance development. If you are passionate about tech, design, and community, we would love to hear from you.
              </p>
            </motion.div>

            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-64 lg:h-80 w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" 
                alt="Team collaboration"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Job Listings */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-16">
        <motion.div 
          initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="space-y-4"
        >
          {jobs.map((job, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 hover:border-accent dark:hover:border-accent transition-colors duration-300 shadow-sm group"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-md">{job.dept}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-accent transition-colors">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                  <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleApply(job.title)}
                className="w-full md:w-auto shrink-0 group-hover:bg-accent group-hover:text-brand group-hover:border-accent transition-all mt-2 md:mt-0"
              >
                Apply Now <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Card -  */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mt-12 md:mt-16 p-8 md:p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 dark:bg-accent/20 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <Sparkles className="mx-auto text-accent mb-4" size={32} />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Don't see a perfect fit?</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">We are always looking for talented individuals. Send your resume and we'll get back to you.</p>
            <Button 
              variant="accent" 
              onClick={handleSendResume}
              className="px-8 w-full md:w-auto shadow-lg shadow-accent/20"
            >
              Send Resume
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
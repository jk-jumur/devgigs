"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, UserCheck, AlertCircle, Ban } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: "By accessing or using DevGigs, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service."
    },
    {
      icon: UserCheck,
      title: "2. User Responsibilities",
      content: "As a user, you agree to provide accurate information when creating an account or posting a gig. You must not post fraudulent, misleading, or illegal gigs, and you are responsible for maintaining the confidentiality of your login credentials."
    },
    {
      icon: AlertCircle,
      title: "3. Marketplace Conduct",
      content: "DevGigs acts as a platform connecting developers and clients. We do not take responsibility for the quality of work delivered or payment disputes. Users are encouraged to communicate clearly and agree on terms before starting a project."
    },
    {
      icon: Ban,
      title: "4. Account Termination",
      content: "We reserve the right to suspend or terminate accounts that violate these terms or engage in suspicious activity. You can delete your gigs at any time from the Manage Gigs dashboard."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Text */}
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="text-center lg:text-left relative z-10"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center justify-center p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
                 <FileText className="text-accent" size={32} />
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-4 leading-tight">
                Terms of Service
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-4">
                Please read our terms carefully to ensure a safe and fair marketplace for everyone.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-sm text-slate-500 font-medium">
                Last updated: October 2026
              </motion.p>
            </motion.div>

            {/* Right Image (New Unique Image) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-64 lg:h-80 w-full rounded-3xl overflow-hidden shadow-2xl"
            >
         <Image 
  src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1200&auto=format&fit=crop"
  alt="Lady Justice - Legal Terms"
  fill
  className="object-cover"
  priority
/>
              <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-16">
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-6"
        >
          {sections.map((sec, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <sec.icon className="text-brand dark:text-accent" size={24} />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">{sec.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">{sec.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
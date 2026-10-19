"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { Terminal, Target, Users, Zap } from "lucide-react";

// অ্যানিমেশনের জন্য কনফিগারেশন
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
  return (
    // এখানে Warm Off-White (#F9F9F6) ব্যাকগ্রাউন্ড দেওয়া হয়েছে
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Text */}
              <motion.div 
                initial="hidden" animate="visible" variants={staggerContainer}
                className="text-center lg:text-left"
              >
                <motion.div variants={fadeInUp} className="inline-flex items-center justify-center p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <Terminal className="text-accent" size={32} />
                </motion.div>
                <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-brand dark:text-white mb-6 leading-tight">
                  Building the future of <br />
                  <span className="text-accent">freelance development.</span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
                  DevGigs is a developer-first marketplace designed to connect elite talent with clients who demand high-quality work. We remove the friction from freelancing.
                </motion.p>
              </motion.div>

              {/* Right Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }} 
                animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
                className="relative h-72 lg:h-96 w-full rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image 
    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop" 
    alt="DevGigs Team"
    fill
    className="object-cover"
    priority
   />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent"></div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Mission & Values Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Target, title: "Our Mission", desc: "To empower developers worldwide by providing a seamless, transparent, and secure platform to monetize their skills." },
              { icon: Users, title: "Community First", desc: "We believe in the power of the developer community. DevGigs is built by developers, for developers." },
              { icon: Zap, title: "Speed & Quality", desc: "Connecting top-tier talent with exciting projects in record time, without compromising on quality." },
            ].map((feature, i) => (
              <motion.div 
                variants={fadeInUp} 
                key={i}
                whileHover={{ y: -8, transition: { duration: 0.2 } }} // হোভার করলে কার্ড উপরে উঠবে
              >
                <Card className="p-8 text-center hover:border-accent dark:hover:border-accent bg-white dark:bg-slate-900 dark:border-slate-800 transition-all duration-300 shadow-xl h-full">
                  <div className="w-14 h-14 mx-auto bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-5 border border-slate-100 dark:border-slate-700">
                    <feature.icon className="text-brand dark:text-accent" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-brand dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="bg-white dark:bg-slate-900 py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-extrabold text-brand dark:text-white">Why we built DevGigs</h2>
              <motion.div 
                initial={{ width: 0 }} whileInView={{ width: "5rem" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1.5 bg-accent mx-auto mt-4 rounded-full"
              ></motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400"
            >
              <p>
                Finding reliable tech gigs has always been a fragmented experience. Talent is scattered across social media, WhatsApp groups, and outdated job boards. As developers ourselves, we felt the pain of navigating this chaotic landscape.
              </p>
              <p>
                We built <strong className="text-brand dark:text-white">DevGigs</strong> to solve this. We envisioned a platform that not only looks premium but functions effortlessly. Whether you are a frontend specialist, a backend engineer, or a fullstack wizard, DevGigs gives you the tools to showcase your expertise and get hired instantly.
              </p>
              <p>
                This project was designed with a relentless focus on <strong className="text-brand dark:text-white">performance, security, and a world-class user experience</strong>, powered by the latest Next.js App Router and Firebase Authentication.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
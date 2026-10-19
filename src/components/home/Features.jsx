"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Shield, Zap, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Search, title: "Smart Search", desc: "Find gigs by skill, budget, and delivery time instantly." },
  { icon: Shield, title: "Verified Sellers", desc: "All sellers are rated and reviewed by real clients." },
  { icon: Zap, title: "Fast Delivery", desc: "Most gigs delivered within 2-5 days guaranteed." },
];

export default function Features() {
  return (
    <section className="bg-[#F9F9F6] dark:bg-slate-950 py-16 md:py-24 relative overflow-hidden transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* বাম দিকের ইমেজ (মোবাইলে নিচে যাবে, উচ্চতা কমবে) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1 h-64 sm:h-80 lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop" 
              alt="Developers collaborating"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/60 via-transparent to-transparent"></div>
            
            {/* ইমেজের উপরে গ্লাসি কার্ড (মোবাইলে ছোট হবে) */}
            <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="text-green-400 w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-white font-bold text-xs md:text-base">100% Secure Payments</p>
                <p className="text-[10px] md:text-xs text-slate-200">Your money is safe with us</p>
              </div>
            </div>
          </motion.div>

          {/* ডান দিকের ফিচার কার্ড (মোবাইলে উপরে যাবে) */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 md:mb-10 text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-3 md:mb-4">
                Why DevGigs?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-lg mx-auto lg:mx-0">
                Built for developers, by developers. We provide the best experience for both clients and sellers.
              </p>
            </motion.div>

            <div className="space-y-4 md:space-y-6">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ x: 8 }}
                  className="flex flex-col sm:flex-row items-start gap-4 md:gap-5 p-5 md:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-accent dark:hover:border-accent transition-all duration-300 group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-brand dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-lg group-hover:bg-accent transition-colors duration-300">
                    <f.icon className="text-accent dark:text-white group-hover:text-brand w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white mb-1 md:mb-2 group-hover:text-accent transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
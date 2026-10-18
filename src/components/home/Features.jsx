"use client";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { Search, Shield, Zap } from "lucide-react";

const features = [
  { icon: Search, title: "Smart Search", desc: "Find gigs by skill, budget, and delivery time." },
  { icon: Shield, title: "Verified Sellers", desc: "All sellers are rated and reviewed by clients." },
  { icon: Zap, title: "Fast Delivery", desc: "Most gigs delivered within 2-5 days." },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-brand dark:text-white">Why DevGigs?</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Built for developers, by developers.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="p-8 text-center hover:-translate-y-2 hover:shadow-xl dark:bg-slate-900 dark:border-slate-800 transition-all duration-300">
              <div className="w-14 h-14 mx-auto bg-brand dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                <f.icon className="text-accent" size={28} />
              </div>
              <h3 className="mt-5 font-bold text-lg text-brand dark:text-white">{f.title}</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
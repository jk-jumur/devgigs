"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const steps = [
  { n: "1", t: "Post a Gig", d: "Describe your service, set a price, and publish." },
  { n: "2", t: "Get Hired", d: "Clients browse and contact you directly." },
  { n: "3", t: "Deliver & Earn", d: "Complete the work and get paid." },
];

const testimonials = [
  { name: "Rahim A.", text: "Got my first client in 2 days. Amazing platform!" },
  { name: "Sadia K.", text: "The UI is so clean. I love posting gigs here." },
  { name: "Tanvir H.", text: "Best place to find React gigs in Bangladesh." },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand dark:bg-black py-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-16">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((s, i) => (
            <motion.div 
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-8 text-center bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-accent transition-colors cursor-default"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-accent text-brand flex items-center justify-center font-extrabold text-2xl shadow-lg mb-5">
                {s.n}
              </div>
              <h3 className="font-bold text-xl mb-2">{s.t}</h3>
              <p className="text-slate-400">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="p-6 bg-slate-800 rounded-2xl border border-slate-700"
            >
              <div className="flex text-accent mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-accent" />)}
              </div>
              <p className="text-slate-300 italic mb-6">&ldquo;{t.text}&rdquo;</p>
              <p className="font-bold text-sm text-white">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
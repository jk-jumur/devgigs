"use client";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Quote } from "lucide-react";

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
    <section className="bg-[#F9F9F6] dark:bg-slate-950 py-24 relative overflow-hidden transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-accent/10 dark:bg-accent/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* সেকশন টাইটেল */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4">How It Works</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Get started in three simple steps. It's fast, reliable, and transparent.</p>
        </motion.div>
        
        {/* স্টেপস কার্ড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
          {/* কানেক্টিং লাইন */}
          <div className="hidden md:block absolute top-20 left-[15%] right-[15%] h-0.5 bg-slate-200 dark:bg-slate-800 -z-10"></div>

          {steps.map((s, i) => (
            <motion.div 
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ y: -8 }}
              className="p-8 flex flex-col items-center text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-accent dark:hover:border-accent transition-all duration-300 relative group"
            >
              <div className="w-16 h-16 -mt-16 mb-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand dark:text-white flex items-center justify-center font-extrabold text-2xl shadow-md group-hover:bg-accent group-hover:text-brand group-hover:border-accent transition-colors duration-300">
                {s.n}
              </div>
              
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mb-3 tracking-tight">{s.t}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>

        {/* টেস্টিমোনিয়াল সেকশন */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4">
            Loved by Developers
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Here's what our community says.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 relative shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-accent dark:hover:border-accent transition-all duration-300 group"
            >
              <Quote className="absolute top-6 right-6 text-slate-100 dark:text-slate-800 w-12 h-12 -z-0" />
              
              <div className="flex text-accent mb-6 relative z-10">
                {[...Array(5)].map((_, j) => <Star key={j} size={18} className="fill-accent" />)}
              </div>
              <p className="text-slate-700 dark:text-slate-300 italic mb-8 relative z-10 text-lg leading-relaxed font-medium">
                &ldquo;{t.text}&rdquo;
              </p>
              
              <div className="flex items-center gap-3 mt-auto relative z-10 border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="w-10 h-10 rounded-full bg-brand dark:bg-slate-800 text-white flex items-center justify-center font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Verified Developer</p>
                </div>
                <CheckCircle2 className="ml-auto text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
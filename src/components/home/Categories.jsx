"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  { name: "Frontend", count: 42, desc: "React, Next.js, Vue & more" },
  { name: "Backend", count: 38, desc: "Node.js, Python, Go & more" },
  { name: "Fullstack", count: 25, desc: "End-to-end development" },
  { name: "Mobile", count: 19, desc: "iOS & Android apps" },
  { name: "DevOps", count: 12, desc: "AWS, Docker, CI/CD" },
];

export default function Categories() {
  return (
    <section className="bg-[#F9F9F6] dark:bg-slate-950 py-24 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            {/* মেইন হেডলাইনের সাইজ কমিয়ে text-3xl md:text-4xl করা হলো */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-3">
              Browse by Category
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Find the perfect gig for your specific needs.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link 
                href={`/items?category=${c.name}`}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900/50 transition-colors px-4 -mx-4 rounded-xl"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <span className="text-lg font-bold text-slate-400 dark:text-slate-600 w-8">
                    0{i + 1}
                  </span>
                  <div>
                    {/* ক্যাটাগরি টাইটেলের সাইজ text-xl md:text-2xl করা হলো */}
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white group-hover:text-accent transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                      {c.desc}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 pl-14 md:pl-0">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
                    {c.count} gigs
                  </span>
                  <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300 bg-white dark:bg-transparent">
                    <ArrowUpRight className="text-slate-400 dark:text-slate-500 group-hover:text-brand transition-colors" size={24} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
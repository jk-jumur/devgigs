"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

const categories = [
  { name: "Frontend", count: 42 },
  { name: "Backend", count: 38 },
  { name: "Fullstack", count: 25 },
  { name: "Mobile", count: 19 },
  { name: "DevOps", count: 12 },
];

export default function Categories() {
  return (
    <section className="bg-white dark:bg-slate-900 py-20 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-brand dark:text-white text-center mb-12">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((c, i) => (
            <motion.div 
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href={`/items?category=${c.name}`}>
                <Card className="p-6 text-center hover:border-accent hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-900 dark:border-slate-800 group transition-all duration-300">
                  <p className="font-bold text-brand dark:text-white group-hover:text-accent transition-colors">{c.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.count} gigs</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
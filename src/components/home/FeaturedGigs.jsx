"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Star, ArrowRight } from "lucide-react";

export default function FeaturedGigs({ gigs }) {
  const featured = gigs.slice(0, 4);
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-extrabold text-brand dark:text-white">Featured Gigs</h2>
        <Link href="/items" className="text-brand dark:text-white font-bold hover:text-accent transition flex items-center gap-1">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((g, i) => (
          <motion.div 
            key={g.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="group overflow-hidden flex flex-col hover:border-brand dark:hover:border-accent dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
              <div className="relative h-40 overflow-hidden">
                <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3">
                  <Badge color="accent">{g.category}</Badge>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-brand dark:text-white group-hover:text-accent transition-colors line-clamp-2">{g.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{g.shortDescription}</p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <span className="text-brand dark:text-white font-extrabold text-lg">৳{g.budget}</span>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <Star size={14} className="text-accent fill-accent" /> {g.sellerRating}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
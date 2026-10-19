"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Star, ArrowRight } from "lucide-react";

export default function FeaturedGigs({ gigs }) {
  const featured = gigs.slice(0, 4);
  
  return (
    
    <section className="bg-[#F9F9F6] dark:bg-slate-950 py-24 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
      
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-3">
              Featured Gigs
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
              Hand-picked top-rated services from our best developers.
            </p>
          </div>
          <Link href="/items" className="group text-slate-800 dark:text-white font-bold hover:text-accent transition flex items-center gap-2 bg-white dark:bg-slate-900 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md">
            View all gigs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {featured.map((g, i) => (
            <motion.div 
              key={g.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <div className="group h-full flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                
      
                <div className="relative h-52 overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                  <Image 
                    src={g.imageUrl} 
                    alt={g.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4">
                    <Badge color="accent" className="shadow-lg">{g.category}</Badge>
                  </div>
                </div>

               
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {g.shortDescription}
                  </p>
                  
                 
                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-0.5">Starting at</span>
                      <span className="text-slate-900 dark:text-white font-extrabold text-xl">৳{g.budget}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                      <Star size={14} className="text-accent fill-accent" /> 
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{g.sellerRating}</span>
                    </div>
                  </div>

            
                  <div className="mt-5 w-full">
                    <Link href={`/items/${g.id}`} className="w-full block">
                      <Button 
                        variant="accent" 
                        size="md" 
                        className="w-full font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
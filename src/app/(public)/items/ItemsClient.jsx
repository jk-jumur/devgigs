"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useDebounce } from "@/hooks/useDebounce";
import { getGigs } from "@/lib/api";
import { Search, Star, Filter, Loader2 } from "lucide-react";

const CATEGORIES = ["All", "Frontend", "Backend", "Fullstack", "Mobile", "DevOps"];
const BUDGETS = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ৳5k", min: 0, max: 5000 },
  { label: "৳5k - ৳10k", min: 5000, max: 10000 },
  { label: "৳10k - ৳20k", min: 10000, max: 20000 },
  { label: "৳20k+", min: 20000, max: Infinity },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ItemsClient() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budgetIdx, setBudgetIdx] = useState(0);
  
  const debouncedSearch = useDebounce(search, 300);

  // পেজ লোড হওয়ার সময় API থেকে ডেটা আনা
  useEffect(() => {
    getGigs()
      .then((data) => setGigs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const b = BUDGETS[budgetIdx];
    // নতুন গিগ সবার আগে দেখানোর জন্য সর্ট করা হলো
    const sortedGigs = [...gigs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return sortedGigs.filter((g) => {
      const matchSearch = g.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          g.skills.some((s) => s.toLowerCase().includes(debouncedSearch.toLowerCase()));
      const matchCat = category === "All" || g.category === category;
      const matchBudget = g.budget >= b.min && g.budget <= b.max;
      return matchSearch && matchCat && matchBudget;
    });
  }, [gigs, debouncedSearch, category, budgetIdx]);

  return (
    <>
      {/* সার্চ ও ফিল্টার সেকশন */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 transition-colors">
        
        {/* সার্চ ইনপুট */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or skill..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand dark:focus:border-accent focus:ring-1 focus:ring-brand dark:focus:ring-accent text-brand dark:text-white transition-all relative z-0"
          />
        </div>
        
        {/* ক্যাটাগরি ফিল্টার */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" size={18} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand dark:focus:border-accent font-medium text-brand dark:text-white appearance-none transition-all cursor-pointer relative z-0"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* বাজেট ফিল্টার */}
        <select
          value={budgetIdx}
          onChange={(e) => setBudgetIdx(Number(e.target.value))}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand dark:focus:border-accent font-medium text-brand dark:text-white transition-all cursor-pointer"
        >
          {BUDGETS.map((b, i) => <option key={b.label} value={i}>{b.label}</option>)}
        </select>
      </div>

      {/* রেজাল্ট */}
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-accent" size={40} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-bold text-brand dark:text-white">No gigs found</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your filters or search query.</p>
          <Button variant="outline" className="mt-6" onClick={() => { setSearch(""); setCategory("All"); setBudgetIdx(0); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <motion.div 
          variants={staggerContainer} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((g) => (
            <motion.div key={g.id} variants={fadeInUp}>
              <Card className="group overflow-hidden flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand dark:hover:border-accent transition-all duration-300 hover:shadow-xl dark:hover:shadow-accent/5">
                <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <Image 
                    src={g.imageUrl} 
                    alt={g.title} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge color="accent" className="shadow-md">{g.category}</Badge>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="text-lg font-bold text-brand dark:text-white group-hover:text-accent dark:group-hover:text-accent transition-colors line-clamp-2">{g.title}</h3>
                    <div className="flex items-center gap-1 text-sm font-bold text-brand dark:text-white shrink-0 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                      <Star size={14} className="text-accent fill-accent" /> {g.sellerRating}
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{g.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {g.skills.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mb-1">Starting at</p>
                      <p className="text-xl font-extrabold text-brand dark:text-white">৳{g.budget}</p>
                    </div>
                    <Link href={`/items/${g.id}`}>
                      <Button variant="outline" size="sm" className="group-hover:bg-accent group-hover:border-accent group-hover:text-brand dark:group-hover:text-brand dark:text-white dark:border-slate-600 transition-all font-bold">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
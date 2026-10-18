"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, Star } from "lucide-react";

const CATEGORIES = ["All", "Frontend", "Backend", "Fullstack", "Mobile", "DevOps"];
const BUDGETS = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ৳5k", min: 0, max: 5000 },
  { label: "৳5k - ৳10k", min: 5000, max: 10000 },
  { label: "৳10k - ৳20k", min: 10000, max: 20000 },
  { label: "৳20k+", min: 20000, max: Infinity },
];

export default function ItemsClient({ initialGigs }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budgetIdx, setBudgetIdx] = useState(0);
  
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    const b = BUDGETS[budgetIdx];
    return initialGigs.filter((g) => {
      const matchSearch = g.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          g.skills.some((s) => s.toLowerCase().includes(debouncedSearch.toLowerCase()));
      const matchCat = category === "All" || g.category === category;
      const matchBudget = g.budget >= b.min && g.budget <= b.max;
      return matchSearch && matchCat && matchBudget;
    });
  }, [initialGigs, debouncedSearch, category, budgetIdx]);

  return (
    <>
      {/* সার্চ ও ফিল্টার সেকশন */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or skill..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand font-medium text-slate-700"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          value={budgetIdx}
          onChange={(e) => setBudgetIdx(Number(e.target.value))}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand font-medium text-slate-700"
        >
          {BUDGETS.map((b, i) => <option key={b.label} value={i}>{b.label}</option>)}
        </select>
      </div>

      {/* রেজাল্ট */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-bold text-brand">No gigs found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((g) => (
            <Card key={g.id} className="group overflow-hidden flex flex-col cursor-pointer hover:border-brand transition-colors duration-300">
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4">
                  <Badge color="brand">{g.category}</Badge>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand transition-colors line-clamp-2 pr-2">{g.title}</h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-brand shrink-0">
                    <Star size={16} className="text-accent fill-accent" /> {g.sellerRating}
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{g.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {g.skills.slice(0, 3).map((s) => (
                    <span key={s} className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">{s}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Starting at</p>
                    <p className="text-xl font-extrabold text-brand">৳{g.budget}</p>
                  </div>
                  <Link href={`/items/${g.id}`}>
                    <Button variant="outline" size="sm" className="group-hover:bg-accent group-hover:border-accent group-hover:text-brand transition-all">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
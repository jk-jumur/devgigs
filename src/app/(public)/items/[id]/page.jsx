"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getGigById, getGigs } from "@/lib/api";
import { ArrowLeft, Star, Clock, Calendar, User, ShieldCheck, Zap, Loader2 } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function GigDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [gig, setGig] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getGigById(id), getGigs()])
      .then(([g, all]) => {
        setGig(g);
        setRelated(all.filter((x) => x.id !== g.id && x.category === g.category).slice(0, 3));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleHire = () => {
    toast.success("Contact request sent to seller successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 transition-colors">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="animate-spin text-accent" size={48} />
          <p className="text-slate-500 dark:text-slate-400 font-bold tracking-wide animate-pulse">Loading gig details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 transition-colors">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          <h1 className="text-3xl font-extrabold text-brand dark:text-white mb-4">Gig not found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">The gig you are looking for doesn't exist or has been removed.</p>
          <Button variant="accent" onClick={() => router.push("/items")}>Back to Gigs</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      {/* মেইন কন্টেইনারে flex-1 এবং pb-24 দেওয়া হলো যাতে ফুটার লেগে না থাকে */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        
        {/* ব্যাক বাটন */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
          onClick={() => router.push("/items")} 
          className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-accent font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Gigs
        </motion.button>

        {/* গ্রিড লেআউট: ২ কলাম কন্টেন্ট, ১ কলাম সাইডবার */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* বাম দিকের কন্টেন্ট (৮ কলাম) */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-8 space-y-6">
            
            {/* হিরো ইমেজ ও টাইটেল */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
              <div className="relative h-64 sm:h-80 w-full bg-slate-100 dark:bg-slate-800">
                <Image 
                  src={gig.imageUrl} 
                  alt={gig.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover" 
                  priority
                />
              </div>
              <div className="p-6 sm:p-8">
                <Badge color="accent" className="mb-4">{gig.category}</Badge>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand dark:text-white mb-3 leading-tight">
                  {gig.title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  {gig.shortDescription}
                </p>
              </div>
            </motion.div>

            {/* ডেসক্রিপশন */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
              <h2 className="text-lg font-bold text-brand dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                About this gig
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                {gig.fullDescription}
              </p>
            </motion.div>

            {/* স্কিলস */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
              <h2 className="text-lg font-bold text-brand dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {gig.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg text-sm border border-slate-200 dark:border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* স্পেসিফিকেশন */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
              <h2 className="text-lg font-bold text-brand dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                Specifications
              </h2>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Category</p>
                  <p className="font-semibold text-brand dark:text-white">{gig.category}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Delivery Time</p>
                  <p className="font-semibold text-brand dark:text-white flex items-center gap-1.5"><Clock size={16} className="text-accent"/> {gig.deliveryDays} Days</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Posted On</p>
                  <p className="font-semibold text-brand dark:text-white flex items-center gap-1.5"><Calendar size={16} className="text-accent"/> {gig.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Seller Name</p>
                  <p className="font-semibold text-brand dark:text-white flex items-center gap-1.5"><User size={16} className="text-accent"/> {gig.sellerName}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ডান দিকের স্টিকি সাইডবার (৪ কলাম) */}
          <motion.aside 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 w-full lg:sticky lg:top-24 self-start"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl dark:shadow-none transition-colors">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Budget</h3>
              <p className="text-4xl font-extrabold text-brand dark:text-white mb-6">৳{gig.budget}</p>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Star size={16} className="text-accent fill-accent" /> Seller Rating</span>
                  <span className="font-bold text-brand dark:text-white">{gig.sellerRating}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Clock size={16} className="text-accent" /> Delivery</span>
                  <span className="font-bold text-brand dark:text-white">{gig.deliveryDays} Days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><ShieldCheck size={16} className="text-green-500" /> Payment</span>
                  <span className="font-bold text-brand dark:text-white">Secure</span>
                </div>
              </div>

              <Button variant="accent" onClick={handleHire} className="w-full py-4 text-lg font-bold rounded-xl shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5">
                Hire / Contact
              </Button>
              <p className="mt-3 text-xs text-center text-slate-400 dark:text-slate-500 font-medium">
                You won't be charged yet
              </p>
            </div>
          </motion.aside>

        </div>

        {/* Related Gigs */}
        {related.length > 0 && (
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="mt-20">
            <h2 className="text-2xl font-extrabold text-brand dark:text-white mb-6">Related Gigs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((g) => (
                <Card key={g.id} className="group overflow-hidden flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand dark:hover:border-accent transition-all duration-300">
                  <div className="relative h-40 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <Image 
                      src={g.imageUrl} 
                      alt={g.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3">
                      <Badge color="accent">{g.category}</Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-brand dark:text-white line-clamp-2 mb-2 group-hover:text-accent transition-colors">{g.title}</h3>
                    <p className="text-brand dark:text-white font-extrabold text-lg mb-4 mt-auto">৳{g.budget}</p>
                    <Link href={`/items/${g.id}`}>
                      <Button variant="outline" className="w-full dark:text-white dark:border-slate-700" size="sm">View Details</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      <Footer />
    </div>
  );
}
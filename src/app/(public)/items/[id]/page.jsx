"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner"; // টোস্ট ইমপোর্ট করা হলো
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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
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

  // Hire বাটনে ক্লিক করলে এই ফাংশনটি চলবে
  const handleHire = () => {
    toast.success("Contact request sent to seller successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="animate-spin text-accent" size={48} />
          <p className="text-slate-500 font-bold tracking-wide animate-pulse">Loading gig details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          <h1 className="text-3xl font-extrabold text-brand mb-4">Gig not found</h1>
          <p className="text-slate-500 mb-8">The gig you are looking for doesn't exist or has been removed.</p>
          <Button variant="accent" onClick={() => router.push("/items")}>Back to Gigs</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* ব্যাক বাটন */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => router.push("/items")} 
          className="group flex items-center gap-2 text-slate-500 hover:text-brand font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Gigs
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* বাম দিকের কন্টেন্ট */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            
            {/* হিরো ইমেজ ও টাইটেল */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-slate-100 overflow-hidden">
                <img src={gig.imageUrl} alt={gig.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Badge color="accent" className="shadow-lg">{gig.category}</Badge>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand mb-4 leading-tight">
                  {gig.title}
                </h1>
                <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
                  {gig.shortDescription}
                </p>
              </div>
            </motion.div>

            {/* ডেসক্রিপশন */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-brand mb-4 flex items-center gap-2">
                <Zap className="text-accent" size={20} /> About this gig
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
                {gig.fullDescription}
              </p>
            </motion.div>

            {/* স্কিলস */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-brand mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {gig.skills.map((s) => (
                  <span key={s} className="px-4 py-2 bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm border border-slate-200 hover:border-brand hover:bg-brand hover:text-white transition-all duration-300">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* স্পেসিফিকেশন */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-brand mb-6">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Category</p>
                  <p className="font-bold text-brand text-lg">{gig.category}</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Delivery Time</p>
                  <p className="font-bold text-brand text-lg flex items-center gap-2"><Clock size={18} className="text-accent"/> {gig.deliveryDays} Days</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Posted On</p>
                  <p className="font-bold text-brand text-lg flex items-center gap-2"><Calendar size={18} className="text-accent"/> {gig.createdAt}</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Seller Name</p>
                  <p className="font-bold text-brand text-lg flex items-center gap-2"><User size={18} className="text-accent"/> {gig.sellerName}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ডান দিকের স্টিকি কার্ড (Hire Section) */}
          <motion.aside 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:sticky lg:top-24 self-start"
          >
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-2xl shadow-slate-200/60">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">Total Budget</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-brand mb-6">৳{gig.budget}</p>
              
              <div className="space-y-4 mb-8 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-3 text-slate-700 font-semibold">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><Star size={16} className="text-accent fill-accent" /></div>
                  <span className="text-brand">{gig.sellerRating}</span> Seller Rating
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-semibold">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><Clock size={16} className="text-brand" /></div>
                  {gig.deliveryDays} Days Delivery
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-semibold">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><ShieldCheck size={16} className="text-green-500" /></div>
                  100% Secure Payment
                </div>
              </div>

              {/* এখানে onClick যোগ করা হয়েছে */}
              <Button 
                variant="accent" 
                onClick={handleHire}
                className="w-full py-6 text-lg font-extrabold rounded-xl shadow-lg shadow-accent/30 hover:-translate-y-1 transition-transform"
              >
                Hire / Contact Seller
              </Button>
              <p className="mt-4 text-xs text-center text-slate-400 font-semibold">
                You won't be charged yet
              </p>
            </div>
          </motion.aside>

        </div>

        {/* Related Gigs */}
        {related.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand mb-8">Related Gigs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((g) => (
                <Card key={g.id} className="group overflow-hidden flex flex-col hover:border-brand transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-44 overflow-hidden">
                    <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <Badge color="accent">{g.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-brand text-lg line-clamp-2 mb-2 group-hover:text-accent transition-colors">{g.title}</h3>
                    <p className="text-brand font-extrabold text-xl mb-6 mt-auto">৳{g.budget}</p>
                    <Link href={`/items/${g.id}`}>
                      <Button variant="outline" className="w-full font-bold" size="sm">View Details</Button>
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
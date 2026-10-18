"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getGigById, getGigs } from "@/lib/api";
import { ArrowLeft, Star, Clock, Calendar, User, CheckCircle2 } from "lucide-react";

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
        // একই ক্যাটাগরির অন্যান্য গিগগুলো বের করা হচ্ছে
        setRelated(all.filter((x) => x.id !== g.id && x.category === g.category).slice(0, 3));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10 w-full animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded mb-6" />
          <div className="h-72 bg-slate-200 rounded-xl" />
          <div className="h-8 w-2/3 bg-slate-200 rounded mt-4" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-brand">Gig not found</h1>
          <Button className="mt-4" onClick={() => router.push("/items")}>Back to Gigs</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* ব্যাক বাটন */}
        <button onClick={() => router.push("/items")} className="flex items-center gap-2 text-slate-500 hover:text-brand font-medium mb-6 transition">
          <ArrowLeft size={18} /> Back to Gigs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* বাম দিকের কন্টেন্ট */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <img src={gig.imageUrl} alt={gig.title} className="w-full h-80 object-cover" />
              <div className="p-8">
                <Badge color="brand" className="mb-4">{gig.category}</Badge>
                <h1 className="text-3xl font-extrabold text-brand mb-4">{gig.title}</h1>
                <p className="text-slate-600 text-lg">{gig.shortDescription}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-brand mb-4">About this gig</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{gig.fullDescription}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-brand mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {gig.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-medium rounded-lg text-sm border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-brand mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 mb-1">Category</p>
                  <p className="font-semibold text-brand">{gig.category}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 mb-1">Delivery Time</p>
                  <p className="font-semibold text-brand flex items-center gap-1"><Clock size={16} /> {gig.deliveryDays} Days</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 mb-1">Posted On</p>
                  <p className="font-semibold text-brand flex items-center gap-1"><Calendar size={16} /> {gig.createdAt}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 mb-1">Seller Name</p>
                  <p className="font-semibold text-brand flex items-center gap-1"><User size={16} /> {gig.sellerName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ডান দিকের স্টিকি কার্ড (Hire Section) */}
          <aside className="relative">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sticky top-24 shadow-xl shadow-slate-200/50">
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Budget</p>
              <p className="text-4xl font-extrabold text-brand mb-4">৳{gig.budget}</p>
              
              <div className="space-y-3 mb-8 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Star size={18} className="text-accent fill-accent" />
                  <span className="text-brand font-bold">{gig.sellerRating}</span> Seller Rating
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Clock size={18} className="text-brand" /> {gig.deliveryDays} Days Delivery
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 size={18} className="text-green-500" /> 100% Secure Payment
                </div>
              </div>

              <Button variant="accent" className="w-full py-6 text-lg font-bold">
                Hire / Contact Seller
              </Button>
              <p className="mt-4 text-xs text-center text-slate-400 font-medium">
                You won't be charged yet
              </p>
            </div>
          </aside>

        </div>

        {/* Related Gigs */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-extrabold text-brand mb-8">Related Gigs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((g) => (
                <Card key={g.id} className="group overflow-hidden flex flex-col hover:border-brand transition-colors">
                  <img src={g.imageUrl} alt={g.title} className="w-full h-40 object-cover" />
                  <div className="p-5 flex flex-col flex-1">
                    <Badge color="brand" className="w-fit mb-2">{g.category}</Badge>
                    <h3 className="font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-brand transition">{g.title}</h3>
                    <p className="text-brand font-extrabold text-lg mb-4 mt-auto">৳{g.budget}</p>
                    <Link href={`/items/${g.id}`}>
                      <Button variant="outline" className="w-full" size="sm">View Details</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
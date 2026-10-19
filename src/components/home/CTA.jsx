"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext"; // useAuth ইমপোর্ট করো

export default function CTA() {
  const { user } = useAuth(); // ইউজারের লগইন স্টেট চেক করো

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">Ready to start earning?</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 font-medium">Join thousands of developers already on DevGigs.</p>
        
        <Link 
          // লগইন থাকলে /items, না থাকলে /login?mode=register
          href={user ? "/items" : "/login?mode=register"} 
          className="inline-block mt-10"
        >
          <Button variant="accent" size="lg" className="font-bold text-brand px-10 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all">
            {user ? "Browse Gigs" : "Get Started Free"} {/* টেক্সটও ডাইনামিক করা হলো */}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
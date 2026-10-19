import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";

import FeaturedGigs from "@/components/home/FeaturedGigs";
import HowItWorks from "@/components/home/HowItWorks";
import CTA from "@/components/home/CTA";
import { gigs } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Categories />
        <FeaturedGigs gigs={gigs} />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
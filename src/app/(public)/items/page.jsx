import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ItemsClient from "./ItemsClient";
import { gigs } from "@/lib/mock-data"; // সরাসরি ডেটা ইমপোর্ট করা হলো

export default function ItemsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-brand tracking-tight">Browse Gigs</h1>
          <p className="text-slate-500 mt-2">Find the perfect developer for your project.</p>
        </div>
        
        {/* ডেটা প্রপ হিসেবে পাঠানো হচ্ছে */}
        <ItemsClient initialGigs={gigs} />
      </main>
      <Footer />
    </div>
  );
}
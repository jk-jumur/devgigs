import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ItemsClient from "./ItemsClient";
import { gigs } from "@/lib/mock-data";

export default function ItemsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F6] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      {/* এখানে flex-1 এবং pb-20 যোগ করা হয়েছে */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand dark:text-white tracking-tight">Browse Gigs</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Find the perfect developer for your project.</p>
        </div>
        
        <ItemsClient initialGigs={gigs} />
      </main>
      
      <Footer />
    </div>
  );
}
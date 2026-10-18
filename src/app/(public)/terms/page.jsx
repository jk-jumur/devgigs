import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, UserCheck, AlertCircle, Ban } from "lucide-react";

export const metadata = { title: "Terms of Service — DevGigs" };

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: "By accessing or using DevGigs, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service."
    },
    {
      icon: UserCheck,
      title: "2. User Responsibilities",
      content: "As a user, you agree to provide accurate information when creating an account or posting a gig. You must not post fraudulent, misleading, or illegal gigs, and you are responsible for maintaining the confidentiality of your login credentials."
    },
    {
      icon: AlertCircle,
      title: "3. Marketplace Conduct",
      content: "DevGigs acts as a platform connecting developers and clients. We do not take responsibility for the quality of work delivered or payment disputes. Users are encouraged to communicate clearly and agree on terms before starting a project."
    },
    {
      icon: Ban,
      title: "4. Account Termination",
      content: "We reserve the right to suspend or terminate accounts that violate these terms or engage in suspicious activity. You can delete your gigs at any time from the Manage Gigs dashboard."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Text */}
            <div className="text-center lg:text-left relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
                 <FileText className="text-accent" size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand dark:text-white mb-4 leading-tight">Terms of Service</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-4">Please read our terms carefully to ensure a safe and fair marketplace for everyone.</p>
              <p className="text-sm text-slate-500 font-medium">Last updated: October 2026</p>
            </div>

            {/* Right Image (Relevant to Code/Legal) */}
            <div className="relative h-64 lg:h-80 w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
                alt="Coding Environment"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16">
        <div className="space-y-6">
          {sections.map((sec, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <sec.icon className="text-brand dark:text-accent" size={24} />
                </div>
                <h2 className="text-xl font-bold text-brand dark:text-white">{sec.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
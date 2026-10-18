import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Eye } from "lucide-react";

export const metadata = { title: "Privacy Policy — DevGigs" };

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: "At DevGigs, we collect information to provide better services to our users. When you register, we collect your name, email, and authentication data via Firebase. If you post a gig, we store the gig details (title, description, budget) in our database."
    },
    {
      icon: Lock,
      title: "2. How We Use Your Information",
      content: "We use the collected information to authenticate your account securely using Firebase Authentication, display your gigs to potential clients, facilitate communication, and improve our platform's security and user experience."
    },
    {
      icon: Shield,
      title: "3. Data Security",
      content: "Your data's security is our top priority. We use Firebase (a Google product) for authentication, which provides industry-standard encryption. We do not store your passwords directly on our servers."
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
                 <Shield className="text-accent" size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand dark:text-white mb-4 leading-tight">Your Privacy Matters</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-4">Learn how we handle your data with industry-standard security and transparency.</p>
              <p className="text-sm text-slate-500 font-medium">Last updated: October 2026</p>
            </div>

            {/* Right Image (Relevant to Security/Privacy) */}
            <div className="relative h-64 lg:h-80 w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
                alt="Cybersecurity and Data Protection"
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

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold text-brand dark:text-white mb-4">4. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              If you have any questions regarding this Privacy Policy, please contact our support team at{" "}
              <a href="mailto:privacy@devgigs.com" className="text-accent font-semibold hover:underline">privacy@devgigs.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Mail } from "lucide-react";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa"; // react-icons থেকে ব্র্যান্ড আইকন
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);

    try {
      const existingSubs = JSON.parse(localStorage.getItem("devgigs_subscribers") || "[]");
      if (existingSubs.includes(email)) {
        toast.info("You are already subscribed!");
      } else {
        localStorage.setItem("devgigs_subscribers", JSON.stringify([...existingSubs, email]));
        toast.success("Subscribed successfully! Welcome to the DevGigs newsletter.");
        setEmail("");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#F9F9F6] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-brand dark:text-white">
              <Terminal className="text-accent" size={28} />
              DevGigs
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              The premium marketplace where elite developers post tech gigs and clients find the perfect match.
            </p>
            
            {/* social links */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook" 
                className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#1877F2] dark:hover:text-[#1877F2] hover:border-[#1877F2] dark:hover:border-[#1877F2] transition-all duration-300 shadow-sm"
              >
                <FaFacebook size={18} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="GitHub" 
                className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#333] dark:hover:text-white hover:border-[#333] dark:hover:border-white transition-all duration-300 shadow-sm"
              >
                <FaGithub size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn" 
                className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] hover:border-[#0A66C2] dark:hover:border-[#0A66C2] transition-all duration-300 shadow-sm"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-brand dark:text-white mb-6 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link href="/items" className="hover:text-accent dark:hover:text-accent transition-colors">Browse Gigs</Link></li>
              <li><Link href="/items/add" className="hover:text-accent dark:hover:text-accent transition-colors">Post a Gig</Link></li>
              <li><Link href="/items/manage" className="hover:text-accent dark:hover:text-accent transition-colors">Manage Gigs</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-brand dark:text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-accent dark:hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-accent dark:hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-accent dark:hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent dark:hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-bold text-brand dark:text-white mb-6 uppercase tracking-wider text-sm">Stay Updated</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Get the latest gigs and updates straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand dark:focus:border-accent text-brand dark:text-white transition-colors shadow-sm"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-2.5 bg-accent text-brand font-bold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            © {currentYear} DevGigs Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              All systems operational
            </span>
            <span>Built with Next.js</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
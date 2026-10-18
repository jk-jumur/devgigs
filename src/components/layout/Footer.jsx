import Link from "next/link";
import { Terminal, Globe, MessageCircle, Mail, Users } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
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
            <div className="flex gap-3 pt-2">
              <a href="#" aria-label="Website" className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-accent hover:border-brand dark:hover:border-accent transition-all duration-300">
                <Globe size={18} />
              </a>
              <a href="#" aria-label="Community" className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-accent hover:border-brand dark:hover:border-accent transition-all duration-300">
                <MessageCircle size={18} />
              </a>
              <a href="#" aria-label="Team" className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-accent hover:border-brand dark:hover:border-accent transition-all duration-300">
                <Users size={18} />
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
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-bold text-brand dark:text-white mb-6 uppercase tracking-wider text-sm">Stay Updated</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Get the latest gigs and updates straight to your inbox.
            </p>
            <form className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand dark:focus:border-accent text-brand dark:text-white transition-colors"
                />
              </div>
              <button type="button" className="w-full py-2.5 bg-brand dark:bg-accent text-white dark:text-brand font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors">
                Subscribe
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
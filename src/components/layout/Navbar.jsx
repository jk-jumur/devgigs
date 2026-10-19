"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; // usePathname ইমপোর্ট করো
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Menu, X, ChevronDown, Terminal, Briefcase, Shield, FileText } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // বর্তমান পাথ বের করার জন্য
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const moreRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Gigs" },
    { href: "/about", label: "About" },
  ];

  const moreLinks = [
    { href: "/careers", label: "Careers", icon: Briefcase },
    { href: "/privacy", label: "Privacy Policy", icon: Shield },
    { href: "/terms", label: "Terms of Service", icon: FileText },
  ];

  // সক্রিয় লিংক চেক করার ফাংশন
  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-brand dark:text-white transition-opacity hover:opacity-80">
          <Terminal className="text-accent" size={24} />
          DevGigs
        </Link>

        {/* ডেস্কটপ মেনু */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((l) => (
              <Link 
                key={l.href} 
                href={l.href} 
                className={`text-sm font-semibold transition-colors relative ${
                  isActive(l.href) 
                    ? "text-brand dark:text-accent" // অ্যাক্টিভ অবস্থায় কালার
                    : "text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-accent" // সাধারণ অবস্থায়
                }`}
              >
                {l.label}
                {/* অ্যাক্টিভ হলে নিচে একটি ছোট দাগ দেখাবে */}
                {isActive(l.href) && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-accent rounded-full"></span>
                )}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button 
                onClick={() => setMoreOpen((o) => !o)} 
                className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-accent transition-colors"
              >
                More <ChevronDown size={14} />
              </button>
              
              {moreOpen && (
                <div className="absolute left-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-2">
                  {moreLinks.map((l) => (
                    <Link 
                      key={l.href} 
                      href={l.href}
                      onClick={() => setMoreOpen(false)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        isActive(l.href) ? "text-accent bg-slate-50 dark:bg-slate-800" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <l.icon size={16} /> {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* অ্যাকাউন্ট সেকশন */}
          <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-6">
            <ThemeToggle />
            
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen((o) => !o)} 
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-brand dark:bg-accent text-white dark:text-brand flex items-center justify-center text-sm font-bold shadow-md">
                    {user.email[0].toUpperCase()}
                  </div>
                  <ChevronDown size={16} className="text-slate-500 dark:text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-2 transform transition-all animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-bold text-brand dark:text-white truncate">{user.displayName || "Developer"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link 
                        href="/items/add" 
                        onClick={() => setDropdownOpen(false)} 
                        className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        Add Gig
                      </Link>
                      <Link 
                        href="/items/manage" 
                        onClick={() => setDropdownOpen(false)} 
                        className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        Manage Gigs
                      </Link>
                    </div>
                    <div className="p-2 border-t border-slate-100 dark:border-slate-800 mt-1">
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="dark:text-white dark:border-slate-700 dark:hover:bg-slate-900">
                    Login
                  </Button>
                </Link>
                <Link href="/login?mode=register">
                  <Button variant="accent" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* মোবাইল মেনু ও থিম টগল বাটন */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors" 
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* মোবাইল মেনু ড্রপডাউন */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          {navLinks.map((l) => (
            <Link 
              key={l.href} 
              href={l.href} 
              onClick={() => setMobileOpen(false)} 
              className={`block px-4 py-3 text-sm font-bold rounded-xl ${
                isActive(l.href) 
                  ? "bg-accent/10 text-brand dark:text-accent" // মোবাইলে অ্যাক্টিভ হলে হাইলাইট
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
          
          <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
          
          <div className="space-y-1">
            {moreLinks.map((l) => (
              <Link 
                key={l.href} 
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl ${
                  isActive(l.href) 
                    ? "bg-accent/10 text-brand dark:text-accent" 
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                <l.icon size={16} /> {l.label}
              </Link>
            ))}
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>

          {user ? (
            <div className="space-y-1">
              <div className="px-4 py-2">
                <p className="text-sm font-bold text-brand dark:text-white">{user.displayName || "Developer"}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
              </div>
              <Link href="/items/add" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Add Gig</Link>
              <Link href="/items/manage" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Manage Gigs</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl mt-2">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full justify-center dark:text-white dark:border-slate-700">Login</Button>
              </Link>
              <Link href="/login?mode=register" onClick={() => setMobileOpen(false)}>
                <Button variant="accent" className="w-full justify-center">Register</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
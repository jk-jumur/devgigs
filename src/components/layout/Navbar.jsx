"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
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

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">DevGigs</Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-700 hover:text-indigo-600 transition font-medium">
              {l.label}
            </Link>
          ))}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen((o) => !o)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                  {user.email[0].toUpperCase()}
                </div>
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    <p className="text-xs text-gray-500">Logged in</p>
                  </div>
                  <Link href="/items/add" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Add Gig</Link>
                  <Link href="/items/manage" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Manage Gigs</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link href="/login?mode=register"><Button size="sm">Register</Button></Link>
            </div>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen((o) => !o)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-gray-700 font-medium">{l.label}</Link>
          ))}
          {user ? (
            <>
              <Link href="/items/add" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-700">Add Gig</Link>
              <Link href="/items/manage" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-700">Manage Gigs</Link>
              <button onClick={handleLogout} className="block py-2 text-red-600 font-medium">Logout</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block py-2 text-indigo-600 font-medium">Login / Register</Link>
          )}
        </div>
      )}
    </header>
  );
}
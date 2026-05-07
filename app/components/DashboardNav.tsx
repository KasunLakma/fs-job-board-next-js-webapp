"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/recruiter-dashboard" },
    { name: "Manage Jobs", href: "/recruiter-dashboard/jobs" },
    { name: "Manage Applications", href: "/recruiter-dashboard/applications" },
  ];

  // Prevent hydration mismatch by only rendering the dynamic parts after mount
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-transparent">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl">C</div>
              <div className="hidden sm:block h-10 w-32 bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-transform group-hover:scale-105">
              C
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tight text-white block leading-none">Recruiter</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Dashboard</span>
            </div>
          </Link>
          
          <div className="hidden md:flex gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive 
                      ? 'text-white bg-white/10 shadow-inner' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-800 transition-all group"
            >
              <div className="h-8 w-8 rounded-lg overflow-hidden border border-gray-700 group-hover:border-primary/50 transition-colors">
                <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" width={32} height={32} />
              </div>
              <div className="hidden lg:block text-left mr-1">
                <p className="text-xs font-bold text-white leading-none">John Recruiter</p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Pro Account</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </button>

            {isProfileOpen && (
              <div 
                className="absolute right-0 mt-3 w-56 rounded-2xl border border-gray-800 bg-gray-900 p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 ring-1 ring-white/5"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <div className="px-3 py-3 border-b border-gray-800 mb-1">
                  <p className="text-sm font-bold text-white">John Recruiter</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">john@company.com</p>
                </div>
                <div className="space-y-1">
                  <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                    <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    Settings
                  </Link>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

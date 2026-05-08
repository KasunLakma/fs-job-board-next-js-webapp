"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Bell, Settings, LogOut, ChevronDown, User, Briefcase, LayoutDashboard, FileText } from "lucide-react";

export default function DashboardNav() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Dashboard", href: "/recruiter-dashboard", icon: LayoutDashboard },
    { name: "Manage Jobs", href: "/recruiter-dashboard/jobs", icon: Briefcase },
    { name: "Manage Applications", href: "/recruiter-dashboard/applications", icon: FileText },
  ];

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
      scrolled || isMobileMenuOpen
        ? 'border-b border-border bg-background/90 backdrop-blur-xl' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 lg:gap-12">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-all md:hidden"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-transform group-hover:scale-105">
              C
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tight text-foreground block leading-none">Recruiter</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Dashboard</span>
            </div>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive 
                      ? 'text-foreground bg-foreground/10 shadow-inner' 
                      : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          
          <button className="relative p-2.5 text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-full transition-all">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 sm:gap-3 p-1.5 rounded-xl border border-border bg-foreground/5 hover:border-border/80 hover:bg-foreground/10 transition-all group"
            >
              <div className="h-8 w-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-primary/50 transition-colors">
                <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" width={32} height={32} />
              </div>
              <div className="hidden lg:block text-left mr-1">
                <p className="text-xs font-bold text-foreground leading-none">John Recruiter</p>
                <p className="text-[10px] text-foreground/50 mt-1 uppercase tracking-tighter">Pro Account</p>
              </div>
              <ChevronDown size={14} className={`text-foreground/40 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div 
                className="absolute right-0 mt-3 w-56 rounded-2xl border border-border bg-card p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 ring-1 ring-black/5 dark:ring-white/5 z-[60]"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <div className="px-3 py-3 border-b border-border mb-1">
                  <p className="text-sm font-bold text-foreground">John Recruiter</p>
                  <p className="text-xs text-foreground/50 truncate mt-0.5">john@company.com</p>
                </div>
                <div className="space-y-1">
                  <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/60 hover:bg-foreground/5 hover:text-foreground rounded-xl transition-all">
                    <Settings size={16} className="text-primary" />
                    Settings
                  </Link>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border animate-in slide-in-from-top-4 duration-300 overflow-hidden">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold transition-all ${
                    isActive 
                      ? 'text-primary bg-primary/10 shadow-inner' 
                      : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${isActive ? 'bg-primary/20 text-primary' : 'bg-foreground/5 text-foreground/40'}`}>
                    <Icon size={20} />
                  </div>
                  {link.name}
                </Link>
              );
            })}
            
            <div className="h-px bg-border my-4 mx-4"></div>
            
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-bold text-foreground/60">Theme Mode</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

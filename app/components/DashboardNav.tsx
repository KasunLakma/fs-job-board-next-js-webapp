"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function DashboardNav() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">C</div>
            <span className="hidden text-xl font-bold tracking-tight text-foreground sm:block">Recruiter</span>
          </Link>
          
          <div className="hidden md:flex gap-1">
            <Link href="/recruiter-dashboard" className="px-3 py-2 text-sm font-medium text-primary bg-primary/5 rounded-md">
              Dashboard
            </Link>
            <Link href="/recruiter-dashboard/jobs" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary hover:bg-gray-50 rounded-md transition-all">
              Manage Jobs
            </Link>
            <Link href="/recruiter-dashboard/applications" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary hover:bg-gray-50 rounded-md transition-all">
              Manage Applications
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-900 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onMouseEnter={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
            >
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/20 overflow-hidden">
                <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" width={32} height={32} />
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-900 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </button>

            {isProfileOpen && (
              <div 
                onMouseLeave={() => setIsProfileOpen(false)}
                className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-200"
              >
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-foreground">John Recruiter</p>
                  <p className="text-xs text-gray-900 truncate">john@company.com</p>
                </div>
                <div className="p-1">
                  <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    Settings
                  </Link>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

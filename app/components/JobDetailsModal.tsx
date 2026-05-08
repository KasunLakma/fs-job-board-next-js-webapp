"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MapPin, Briefcase, DollarSign, Calendar, Tag } from "lucide-react";

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    category: string;
    postedAt: string;
  } | null;
}

export default function JobDetailsModal({ isOpen, onClose, job }: JobDetailsModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen || !job) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card text-foreground rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-border animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Job Details</h2>
            <p className="text-sm text-foreground/60 mt-1">
              Reference ID: <span className="font-mono text-primary">{job.id.substring(0, 8)}...</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-foreground/60 hover:text-foreground rounded-full hover:bg-foreground/10 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-8 flex-1 custom-scrollbar">
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight text-foreground">{job.title}</h1>
            <p className="text-xl font-bold text-primary mt-2">{job.company}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-foreground/5 border border-border/50">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">Location</p>
                <p className="font-semibold text-foreground">{job.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-foreground/5 border border-border/50">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <DollarSign size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">Salary Range</p>
                <p className="font-semibold text-foreground">{job.salary}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-foreground/5 border border-border/50">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">Job Type</p>
                <p className="font-semibold text-foreground">{job.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-foreground/5 border border-border/50">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Tag size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">Category</p>
                <p className="font-semibold text-foreground">{job.category}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Calendar size={16} />
              <span>Posted on {job.postedAt}</span>
            </div>
            
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                Recruiter Status
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                This listing is currently active and receiving applications. You can manage candidates from the applications tab.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-card/50 shrink-0 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-border bg-background text-foreground/70 font-bold hover:bg-foreground/5 transition-all"
          >
            Close
          </button>
          <button 
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Edit Listing
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

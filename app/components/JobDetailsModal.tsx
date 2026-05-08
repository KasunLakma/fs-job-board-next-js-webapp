"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MapPin, Briefcase, DollarSign, Calendar, Tag, CheckCircle2, ChevronRight, ListChecks, Award, Info, Globe, Trophy } from "lucide-react";

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
    status: string;
    postedAt: string;
    description: string;
    skills: string[];
    responsibilities: string[];
    requirements: string[];
    workArrangement?: string;
    experienceLevel?: string;
    currency?: string;
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
      <div className="bg-card text-foreground rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-border animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-border bg-card/50 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border ${
                job.status === "Published" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500" : 
                job.status === "Draft" ? "border-amber-500/20 bg-amber-500/10 text-amber-500" : 
                "border-rose-500/20 bg-rose-500/10 text-rose-500"
              }`}>
                {job.status}
              </span>
              <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">
                ID: {job.id.substring(0, 8)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">{job.title}</h1>
            <p className="text-lg font-bold text-primary flex items-center gap-2 mt-1">
              {job.company}
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/20"></span>
              <span className="text-foreground/40 text-sm font-medium">{job.location}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 text-foreground/60 hover:text-foreground rounded-2xl hover:bg-foreground/10 transition-all active:scale-95 ml-4"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 sm:p-10 flex-1 custom-scrollbar space-y-12">
          
          {/* Detailed Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {[
              { label: "Salary", value: job.salary, icon: <DollarSign size={18} />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { label: "Type", value: job.type, icon: <Briefcase size={18} />, color: "text-amber-500", bg: "bg-amber-500/10" },
              { label: "Level", value: job.experienceLevel || "Mid Level", icon: <Trophy size={18} />, color: "text-indigo-500", bg: "bg-indigo-500/10" },
              { label: "Format", value: job.workArrangement || "Remote", icon: <Globe size={18} />, color: "text-cyan-500", bg: "bg-cyan-500/10" },
              { label: "Category", value: job.category, icon: <Tag size={18} />, color: "text-blue-500", bg: "bg-blue-500/10" },
              { label: "Posted", value: job.postedAt, icon: <Calendar size={18} />, color: "text-primary", bg: "bg-primary/10" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 transition-colors hover:border-primary/20">
                <div className={`h-9 w-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-3`}>
                  {item.icon}
                </div>
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 font-black">{item.label}</p>
                <p className="font-bold text-foreground text-xs truncate">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {/* About This Role */}
            <section className="space-y-4">
              <h3 className="text-xl font-black text-foreground flex items-center gap-3">
                <Info className="text-primary" size={22} />
                About This Role
              </h3>
              <p className="text-foreground/70 leading-relaxed text-lg whitespace-pre-wrap">
                {job.description}
              </p>
            </section>

            {/* Skills Section */}
            {job.skills && job.skills.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xl font-black text-foreground flex items-center gap-3">
                  <Award className="text-primary" size={22} />
                  Skills Required
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-4 py-2 rounded-xl bg-foreground/5 border border-border text-sm font-bold text-foreground/80 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xl font-black text-foreground flex items-center gap-3">
                  <ChevronRight className="text-primary" size={22} />
                  Key Responsibilities
                </h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="h-2 w-2 rounded-full bg-primary/40 mt-2.5 transition-all group-hover:bg-primary group-hover:scale-125"></div>
                      <span className="text-foreground/70 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <section className="space-y-4 pb-4">
                <h3 className="text-xl font-black text-foreground flex items-center gap-3">
                  <ListChecks className="text-primary" size={22} />
                  Job Requirements
                </h3>
                <ul className="space-y-3">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="h-5 w-5 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={12} className="text-primary" />
                      </div>
                      <span className="text-foreground/70 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-8 border-t border-border bg-card/80 backdrop-blur-md shrink-0 flex items-center justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-8 py-3.5 rounded-2xl border border-border bg-background text-foreground/60 font-black hover:bg-foreground/5 hover:text-foreground transition-all active:scale-95"
          >
            Close
          </button>
          <button 
            className="px-8 py-3.5 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            Edit Listing
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

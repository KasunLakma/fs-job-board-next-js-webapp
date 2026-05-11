"use client";

import { X, Mail, Phone, Link, Globe, FileText, CheckCircle2, Clock, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  linkedin?: string | null;
  portfolio?: string | null;
  resumeUrl: string;
  coverLetter?: string | null;
  status: string;
  createdAt: any;
  job: {
    title: string;
  };
}

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
  onStatusUpdate: (id: string, newStatus: string) => Promise<void>;
}

export default function ApplicationDetailsModal({
  isOpen,
  onClose,
  application,
  onStatusUpdate,
}: ApplicationDetailsModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !application) return null;

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    await onStatusUpdate(application.id, newStatus);
    setIsUpdating(false);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Accepted":
        return { icon: <CheckCircle2 size={16} />, bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" };
      case "Rejected":
        return { icon: <XCircle size={16} />, bg: "bg-rose-500/10", text: "text-rose-500", border: "border-rose-500/20" };
      case "In-Review":
        return { icon: <Clock size={16} />, bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" };
      default:
        return { icon: <Clock size={16} />, bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20" };
    }
  };

  const statusConfig = getStatusConfig(application.status);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-8 pb-4 flex items-start justify-between bg-gradient-to-br from-primary/5 via-transparent to-transparent">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-black tracking-tight text-foreground">{application.name}</h2>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                {statusConfig.icon}
                {application.status}
              </span>
            </div>
            <p className="text-lg text-foreground/60 font-medium">Applied for <span className="text-primary font-bold">{application.job.title}</span></p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-2xl bg-foreground/5 text-foreground/40 hover:text-foreground hover:bg-foreground/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.02] border border-border/50">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-foreground/40 leading-none mb-1">Email Address</p>
                <p className="text-sm font-bold text-foreground">{application.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.02] border border-border/50">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-foreground/40 leading-none mb-1">Phone Number</p>
                <p className="text-sm font-bold text-foreground">{application.phone || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {application.linkedin && (
              <a 
                href={application.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/20 text-sm font-bold hover:bg-[#0077b5] hover:text-white transition-all"
              >
                <Link size={18} /> LinkedIn Profile <ExternalLink size={14} />
              </a>
            )}
            {application.portfolio && (
              <a 
                href={application.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 text-sm font-bold hover:bg-primary hover:text-white transition-all"
              >
                <Globe size={18} /> Portfolio <ExternalLink size={14} />
              </a>
            )}
            <a 
              href={`/${application.resumeUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-sm font-bold hover:bg-emerald-500 hover:text-white transition-all"
            >
              <FileText size={18} /> View Resume <ExternalLink size={14} />
            </a>
          </div>

          {/* Cover Letter */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-foreground/40">Cover Letter</h3>
            <div className="p-6 rounded-[2rem] bg-foreground/[0.02] border border-border/50 text-foreground/80 leading-relaxed italic">
              {application.coverLetter || "No cover letter provided."}
            </div>
          </div>

          {/* Status Management */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-foreground/40">Update Application Status</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Pending", value: "Pending", color: "amber" },
                { label: "In Review", value: "In-Review", color: "blue" },
                { label: "Accepted", value: "Accepted", color: "emerald" },
                { label: "Rejected", value: "Rejected", color: "rose" },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleStatusChange(s.value)}
                  disabled={isUpdating || application.status === s.value}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                    application.status === s.value
                      ? "bg-foreground text-background border-foreground shadow-lg"
                      : `bg-transparent text-foreground/60 border-border hover:border-${s.color}-500/50 hover:text-${s.color}-500`
                  } disabled:opacity-50`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

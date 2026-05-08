"use client";

import { Briefcase, CheckCircle, FileText, XCircle } from "lucide-react";

interface StatsProps {
  total: number;
  published: number;
  drafts: number;
  closed: number;
}

export default function DashboardStats({ total, published, drafts, closed }: StatsProps) {
  const stats = [
    {
      label: "Total Jobs",
      value: total,
      icon: <Briefcase size={20} />,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Published",
      value: published,
      icon: <CheckCircle size={20} />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Drafts",
      value: drafts,
      icon: <FileText size={20} />,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Closed",
      value: closed,
      icon: <XCircle size={20} />,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className="rounded-2xl border border-border bg-card p-5 transition-theme hover:shadow-lg hover:border-primary/20"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`h-10 w-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              {stat.icon}
            </div>
            <span className="text-2xl font-black text-foreground">{stat.value}</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-foreground/40">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

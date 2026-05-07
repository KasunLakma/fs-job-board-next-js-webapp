import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function SummaryCard({ title, value, icon, description, trend }: SummaryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 p-6 shadow-xl transition-all hover:border-primary/50 hover:bg-gray-900 hover:shadow-primary/5">
      <div className="flex items-center justify-between">
        <div className="relative z-10">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <h3 className="mt-1 text-4xl font-bold tracking-tight text-white">{value}</h3>
          
          {description && (
            <p className="mt-2 text-xs text-gray-500">{description}</p>
          )}
          
          {trend && (
            <div className={`mt-3 flex items-center text-xs font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <div className={`mr-1.5 flex h-4 w-4 items-center justify-center rounded-full ${trend.isPositive ? 'bg-green-400/10' : 'bg-red-400/10'}`}>
                {trend.isPositive ? (
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ) : (
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
              </div>
              {trend.value} <span className="ml-1 text-gray-500 font-normal">vs last month</span>
            </div>
          )}
        </div>
        <div className="relative z-10 rounded-xl bg-primary/10 p-3.5 text-primary ring-1 ring-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          {icon}
        </div>
      </div>
      
      {/* Decorative gradient and glow */}
      <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/20" />
      <div className="absolute inset-px rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}

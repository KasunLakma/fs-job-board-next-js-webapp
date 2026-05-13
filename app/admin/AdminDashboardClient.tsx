"use client";

import { useState } from "react";
import { 
  Users, ShieldCheck, ArrowLeft, LayoutDashboard, 
  Settings, UserCheck, Activity, LogOut, 
  Briefcase, Trash2, RefreshCw, CheckCircle2, AlertCircle 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminDashboardClientProps {
  userCount: number;
  jobCount: number;
  initialUsers: any[];
  initialJobs: any[];
  recentActivities: any[];
  error: string | null;
}

export default function AdminDashboardClient({ 
  userCount, 
  jobCount, 
  initialUsers, 
  initialJobs,
  recentActivities,
  error: initialError
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Dashboard" | "Users" | "Jobs">("Dashboard");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    setIsUpdating(true);
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");
      
      showToast(`User role updated to ${newRole}`, "success");
      router.refresh();
    } catch (err) {
      showToast("Error updating role", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job? This will also remove all associated applications.")) return;
    
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete job");
      
      showToast("Job deleted successfully", "success");
      router.refresh();
    } catch (err) {
      showToast("Error deleting job", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatTimeAgo = (date: Date | string) => {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just Now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return then.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary/30 antialiased overflow-x-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-top-4 duration-300 ${
          toast.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-rose-500/10 border-rose-500/20 text-rose-500"
        }`}>
          {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p className="font-black text-sm">{toast.message}</p>
        </div>
      )}

      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse [animation-delay:2s]"></div>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white/[0.02] border-r border-white/5 backdrop-blur-xl z-50 hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight uppercase">Core<span className="text-primary">Admin</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: "Dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
            { id: "Users", icon: <Users size={20} />, label: "User Management" },
            { id: "Jobs", icon: <Briefcase size={20} />, label: "All Jobs" },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 px-2">
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <UserCheck size={20} className="text-white/60 group-hover:text-primary" />
            </div>
            <div>
              <p className="text-xs font-black text-white">System Admin</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Bypassed Access</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen p-4 md:p-8 lg:p-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-2">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{activeTab}</span>
            </h1>
            <p className="text-white/40 font-medium text-lg">Real-time monitoring and administrative controls.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm"
            >
              <ArrowLeft size={18} />
              View Site
            </Link>
          </div>
        </div>

        {/* Dashboard View */}
        {activeTab === "Dashboard" && (
          <div className="space-y-12 relative z-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Users Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl overflow-hidden">
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                      <Users size={28} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">Total Users</p>
                  <h3 className="text-5xl font-black tracking-tighter">{userCount}</h3>
                </div>
              </div>

              {/* Total Jobs Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl overflow-hidden">
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                      <Briefcase size={28} className="text-blue-400" />
                    </div>
                  </div>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">Total Jobs Posted</p>
                  <h3 className="text-5xl font-black tracking-tighter">{jobCount}</h3>
                </div>
              </div>
            </div>

            {/* Error Notification */}
            {initialError && (
              <div className="p-6 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 flex items-center gap-4">
                <AlertCircle size={24} className="text-rose-500 shrink-0" />
                <p className="text-rose-500 font-bold text-sm">{initialError}</p>
              </div>
            )}

            {/* Quick Overview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <RefreshCw size={20} className="text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity) => (
                      <div key={`${activity.type}-${activity.id}`} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 group hover:bg-white/10 transition-all border border-white/5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white/80 group-hover:text-primary transition-colors">
                            {activity.description}
                          </span>
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-0.5">
                            {activity.type.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
                          {formatTimeAgo(activity.date)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Activity size={32} className="text-white/10 mb-3" />
                      <p className="text-sm text-white/40 font-medium">No recent activity detected.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  System Health
                </h3>
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-500">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold uppercase tracking-wider">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users View */}
        {activeTab === "Users" && (
          <div className="relative z-10">
            <div className="rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">User</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Role</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Joined Date</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {initialUsers.length > 0 ? (
                      initialUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center border border-white/5 font-black text-primary text-sm uppercase">
                                {user.name?.charAt(0) || user.email.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-white group-hover:text-primary transition-colors">{user.name || "Unnamed User"}</p>
                                <p className="text-xs text-white/30">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                              user.role === 'ADMIN' 
                                ? 'bg-primary/10 border-primary/20 text-primary' 
                                : 'bg-white/5 border-white/10 text-white/40'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-medium text-white/40">
                              {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button 
                              onClick={() => handleRoleToggle(user.id, user.role)}
                              disabled={isUpdating}
                              className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-all disabled:opacity-50 ${
                                user.role === 'ADMIN'
                                  ? 'text-rose-500 hover:bg-rose-500 hover:text-white border-rose-500/20 bg-rose-500/5'
                                  : 'text-primary hover:bg-primary hover:text-white border-primary/20 bg-primary/10'
                              }`}
                            >
                              {user.role === 'ADMIN' ? 'Remove Admin' : 'Make Admin'}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4} className="px-8 py-20 text-center text-white/20">No users found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Jobs View */}
        {activeTab === "Jobs" && (
          <div className="relative z-10">
            <div className="rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Job Listing</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Posted Date</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {initialJobs.length > 0 ? (
                      initialJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-white/[0.01] transition-colors group">
                          <td className="px-8 py-6">
                            <div>
                              <p className="font-bold text-white group-hover:text-primary transition-colors">{job.title}</p>
                              <p className="text-xs text-white/30">{job.company} • {job.location}</p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                              job.status === 'Published' 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                                : 'bg-white/5 border-white/10 text-white/40'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-medium text-white/40">
                              {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button 
                              onClick={() => handleDeleteJob(job.id)}
                              disabled={isUpdating}
                              className="text-rose-500 hover:bg-rose-500 hover:text-white p-2.5 rounded-xl border border-rose-500/20 transition-all disabled:opacity-50"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4} className="px-8 py-20 text-center text-white/20">No jobs found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

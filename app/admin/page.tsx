import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Users, ShieldCheck, ArrowLeft, LayoutDashboard, Settings, UserCheck, Activity, LogOut } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Super Admin Dashboard | CCA Job Board",
  description: "Manage system-wide settings and users.",
};

export default async function AdminDashboardPage() {
  // --- SECURITY CHECK (TEMPORARILY DISABLED FOR TESTING) ---
  // IMPORTANT: Replace this with your actual authentication logic (e.g., NextAuth.js session check)
  /*
  const mockSession = {
    user: {
      name: "System Admin",
      role: "ADMIN", // Toggle this to "USER" to test redirection
    },
  };

  if (mockSession.user.role !== "ADMIN") {
    redirect("/");
  }
  */
  // ------------------------------------

  // Fetch real-time data from the database
  let userCount = 0;
  let users: any[] = [];
  let error = null;

  try {
    userCount = await prisma.user.count();
    users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (err) {
    console.error("Failed to fetch admin stats:", err);
    error = "Database connection error. Please ensure migrations are applied (npx prisma db push).";
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary/30 antialiased overflow-x-hidden">
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
            { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
            { icon: <Users size={20} />, label: "User Management", active: false },
            { icon: <Activity size={20} />, label: "System Logs", active: false },
            { icon: <Settings size={20} />, label: "Settings", active: false },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                item.active 
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
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Super Admin</span>
            </h1>
            <p className="text-white/40 font-medium text-lg">System-wide monitoring and controls initialized.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm"
            >
              <ArrowLeft size={18} />
              View Site
            </Link>
            <button className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg hover:shadow-rose-500/20">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 relative z-10">
          {/* Total Users Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl overflow-hidden">
              <div className="flex items-start justify-between mb-8">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                  <Users size={28} className="text-primary" />
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Active
                </div>
              </div>
              <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">Total Users</p>
              <h3 className="text-5xl font-black tracking-tighter">{userCount}</h3>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-white/20">
                <Activity size={14} />
                <span>Live from Database</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-6 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 flex items-center gap-4 mb-8 relative z-10">
            <div className="h-10 w-10 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
              <Activity size={20} className="text-rose-500" />
            </div>
            <div>
              <p className="text-rose-500 font-black text-sm">Database Warning</p>
              <p className="text-white/40 text-xs font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* User Management Section */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-2xl font-black">User <span className="text-primary">Management</span></h2>
            <span className="text-xs font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/40 uppercase tracking-wider">
              Recent Users
            </span>
          </div>

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
                  {users.length > 0 ? (
                    users.map((user) => (
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
                          <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 mb-4">
                          <Users size={24} className="text-white/20" />
                        </div>
                        <h4 className="text-lg font-bold text-white/40">No users found</h4>
                        <p className="text-xs text-white/20 mt-1">Users will appear here once they sign up.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

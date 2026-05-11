import Link from "next/link";
import { LogIn, ArrowLeft, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Sign In | CCA Job Board",
  description: "Sign in to your account.",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-foreground/40 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="p-8 md:p-10 rounded-[2.5rem] bg-card border border-border shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <LogIn size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">Sign In</h1>
            <p className="mt-2 text-foreground/50 font-medium">Access your recruiter or admin dashboard.</p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
              <ShieldAlert size={20} className="text-amber-500 shrink-0 mt-1" />
              <div>
                <p className="text-amber-500 font-black text-xs uppercase tracking-wider mb-1">Configuration Required</p>
                <p className="text-foreground/60 text-xs leading-relaxed">
                  Real authentication (Clerk or NextAuth.js) has not been initialized yet.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-4">Email Address</label>
                <input 
                  type="email" 
                  disabled
                  placeholder="admin@example.com"
                  className="w-full rounded-2xl border border-border bg-foreground/[0.02] px-6 py-4 text-sm outline-none opacity-50 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-4">Password</label>
                <input 
                  type="password" 
                  disabled
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-border bg-foreground/[0.02] px-6 py-4 text-sm outline-none opacity-50 cursor-not-allowed"
                />
              </div>
            </div>

            <button 
              disabled
              className="w-full py-4 rounded-2xl bg-primary/20 text-primary font-black text-sm uppercase tracking-widest cursor-not-allowed border border-primary/10"
            >
              Sign In (Locked)
            </button>

            <div className="pt-6 border-t border-border flex flex-col items-center gap-4">
              <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest text-center">Development Shortcut</p>
              <Link 
                href="/admin" 
                className="inline-flex items-center gap-2 text-primary hover:underline font-black text-sm"
              >
                Go directly to Admin Dashboard &rarr;
              </Link>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs font-bold text-foreground/20 uppercase tracking-widest">
          &copy; 2024 CCA Job Board Development
        </p>
      </div>
    </div>
  );
}

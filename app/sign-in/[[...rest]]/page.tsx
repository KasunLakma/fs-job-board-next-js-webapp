import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors mb-8 self-start"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <SignIn 
          path="/sign-in"
          routing="path"
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm font-black uppercase tracking-widest py-3",
              card: "bg-white/[0.03] border border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden",
              headerTitle: "text-white font-black text-2xl tracking-tighter",
              headerSubtitle: "text-white/40 font-medium",
              socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all rounded-2xl",
              formFieldLabel: "text-[10px] font-black uppercase tracking-widest text-white/40 ml-1",
              formFieldInput: "bg-white/5 border border-white/10 text-white rounded-2xl px-4 py-3 focus:border-primary/50 focus:ring-0",
              footerActionText: "text-white/40 font-medium",
              footerActionLink: "text-primary hover:text-primary/80 font-black",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-primary",
            }
          }}
          signUpUrl="/sign-up"
        />
        
        <p className="mt-8 text-center text-xs font-bold text-white/10 uppercase tracking-widest">
          &copy; 2024 CCA Job Board Secure Access
        </p>
      </div>
    </div>
  );
}

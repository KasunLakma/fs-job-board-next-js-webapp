import DashboardNav from "../../../../components/DashboardNav";
import PostJobForm from "../../../../components/PostJobForm";

export const metadata = {
  title: "Post New Job | CCA Job Board",
};

export default function NewJobPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 transition-theme">
      <DashboardNav />
      
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PostJobForm />
      </main>
    </div>
  );
}

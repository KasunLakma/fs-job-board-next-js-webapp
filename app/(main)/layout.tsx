import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      storageKey="site-theme"
    >
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

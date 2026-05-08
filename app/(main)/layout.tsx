import { ThemeProvider } from "../components/ThemeProvider";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

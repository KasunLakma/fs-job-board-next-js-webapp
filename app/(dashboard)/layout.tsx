import { ThemeProvider } from "@/app/components/ThemeProvider";

export default function DashboardLayout({
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
      storageKey="dashboard-theme"
    >
      {children}
    </ThemeProvider>
  );
}

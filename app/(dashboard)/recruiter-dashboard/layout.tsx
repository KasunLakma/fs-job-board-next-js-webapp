import { ThemeProvider } from "../../components/ThemeProvider";

export default function RecruiterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="dashboard-theme"
    >
      {children}
    </ThemeProvider>
  );
}

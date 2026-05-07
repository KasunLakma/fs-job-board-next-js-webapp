"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Console log for debugging state changes
  React.useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme]);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-gray-200 bg-gray-100/50 dark:border-gray-800 dark:bg-gray-900/50 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}


      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-900 group"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
      <span className="sr-only">Toggle theme</span>
      
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-primary/0 blur-md transition-all group-hover:bg-primary/10 dark:group-hover:bg-primary/20" />
    </button>
  );
}

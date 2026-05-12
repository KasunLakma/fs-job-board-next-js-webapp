import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "CCA Job Board",
  description: "Find your next career opportunity",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}

import Link from "next/link";
import Image from "next/image";

export default function Header() {
 return (
 <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/80 backdrop-blur-md">
 <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
 <Link href="/" className="flex items-center gap-4">
 <Image src="/logo.png.jpg" alt="CCA Job Board" width={200} height={80} className="h-14 w-auto object-contain" priority />
 <span className="text-2xl font-bold tracking-tight text-primary">CCA Job Board</span>
 </Link>
 <nav className="hidden md:flex gap-6">
 <Link href="/jobs" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
 Find Jobs
 </Link>
 </nav>
 <div className="flex items-center gap-4">
 <Link href="/employers" className="hidden text-sm font-medium text-foreground hover:text-primary transition-colors md:block">
 For Employers
 </Link>
 <Link
 href="/signin"
 className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
 >
 Sign In
 </Link>
 </div>
 </div>
 </header>
 );
}

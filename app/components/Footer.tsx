import Link from "next/link";
import Image from "next/image";

export default function Footer() {
 return (
 <footer className="w-full border-t border-gray-200 bg-background py-12">
 <div className="container mx-auto flex flex-col items-center gap-4 px-4 md:px-6">
 <div className="flex flex-col items-center gap-4 text-center">
 <Link href="/" className="flex items-center gap-2">
 <Image src="/logo.png.jpg" alt="CCA Job Board" width={160} height={64} className="h-8 w-auto object-contain" />
 <span className="text-lg font-bold text-primary">CCA Job Board</span>
 </Link>
 <p className="text-sm text-gray-900 max-w-md">
 Empowering the next generation of software engineers to find their dream careers.
 </p>
 </div>
 </div>
 <div className="container mx-auto mt-12 flex flex-col items-center justify-center gap-4 px-4 pt-8 border-t border-gray-100 md:px-6 ">
 <p className="text-xs text-gray-900 ">
 © <span suppressHydrationWarning>{new Date().getFullYear()}</span> CCA Job Board. All rights reserved.
 </p>
 </div>
 </footer>
 );
}

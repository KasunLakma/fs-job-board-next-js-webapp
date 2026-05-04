"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, Suspense } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function PaginationContent({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => router.push(`${pathname}?${createQueryString("page", (currentPage - 1).toString())}`)}
        disabled={currentPage <= 1}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
      >
        Previous
      </button>
      
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => router.push(`${pathname}?${createQueryString("page", page.toString())}`)}
              className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => router.push(`${pathname}?${createQueryString("page", (currentPage + 1).toString())}`)}
        disabled={currentPage >= totalPages}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
      >
        Next
      </button>
    </div>
  );
}

export default function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={<div className="h-10 mt-8 flex justify-center"><div className="w-64 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-md"></div></div>}>
      <PaginationContent {...props} />
    </Suspense>
  );
}

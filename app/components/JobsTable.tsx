"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  ArrowUpDown, 
  Eye, 
  MoreHorizontal,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import JobDetailsModal from "./JobDetailsModal";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  status: string;
  postedAt: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
}

interface JobsTableProps {
  data: Job[];
  totalRows: number;
  currentPage: number;
  pageSize: number;
  initialFilters: {
    search: string;
    status: string;
    type: string;
    sort: string;
    order: string;
  };
}

export default function JobsTable({ data, totalRows, currentPage, pageSize, initialFilters }: JobsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(initialFilters.search);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update URL search parameters
  const updateQueryParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "All" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to page 1 if filters or sort change, unless specifically updating page
    if (!updates.page) {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== initialFilters.search) {
        updateQueryParams({ search: searchValue });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  // Handle Sort Toggle
  const handleSort = (field: string) => {
    const isCurrentSort = initialFilters.sort === field;
    const newOrder = isCurrentSort && initialFilters.order === "asc" ? "desc" : "asc";
    updateQueryParams({ sort: field, order: newOrder });
  };

  const SortIcon = ({ field }: { field: string }) => {
    const isActive = initialFilters.sort === field;
    if (!isActive) return <ArrowUpDown size={14} className="text-foreground/20 group-hover:text-primary transition-colors" />;
    return initialFilters.order === "asc" ? (
      <ArrowUp size={14} className="text-primary" />
    ) : (
      <ArrowDown size={14} className="text-primary" />
    );
  };

  const columns = useMemo<ColumnDef<Job>[]>(
    () => [
      {
        accessorKey: "title",
        header: () => (
          <button
            onClick={() => handleSort("title")}
            className="flex items-center gap-2 group hover:text-primary transition-colors"
          >
            Job Title <SortIcon field="title" />
          </button>
        ),
        cell: (info) => (
          <div className="font-bold text-foreground">{info.getValue() as string}</div>
        ),
      },
      {
        accessorKey: "status",
        header: () => (
          <button
            onClick={() => handleSort("status")}
            className="flex items-center gap-2 group hover:text-primary transition-colors"
          >
            Status <SortIcon field="status" />
          </button>
        ),
        cell: (info) => {
          const status = info.getValue() as string;
          let config = {
            icon: <CheckCircle2 size={12} />,
            bg: "bg-emerald-500/10",
            text: "text-emerald-500",
            border: "border-emerald-500/20"
          };
          
          if (status === "Draft") {
            config = {
              icon: <Clock size={12} />,
              bg: "bg-amber-500/10",
              text: "text-amber-500",
              border: "border-amber-500/20"
            };
          } else if (status === "Closed") {
            config = {
              icon: <XCircle size={12} />,
              bg: "bg-rose-500/10",
              text: "text-rose-500",
              border: "border-rose-500/20"
            };
          }
          
          return (
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold border ${config.bg} ${config.text} ${config.border}`}>
              {config.icon}
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "type",
        header: () => (
          <button
            onClick={() => handleSort("type")}
            className="flex items-center gap-2 group hover:text-primary transition-colors"
          >
            Type <SortIcon field="type" />
          </button>
        ),
        cell: (info) => <div className="text-sm font-medium text-foreground/80">{info.getValue() as string}</div>,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (info) => (
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: (info) => <div className="text-sm text-foreground/60">{info.getValue() as string}</div>,
      },
      {
        accessorKey: "createdAt",
        header: () => (
          <button
            onClick={() => handleSort("createdAt")}
            className="flex items-center gap-2 group hover:text-primary transition-colors"
          >
            Posted <SortIcon field="createdAt" />
          </button>
        ),
        cell: ({ row }) => <div className="text-sm font-medium text-foreground/60">{row.original.postedAt}</div>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedJob(row.original);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground hover:bg-foreground/5 hover:border-primary/50 transition-all"
            >
              <Eye size={14} /> View
            </button>
            <button className="p-2 rounded-lg hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all">
              <MoreHorizontal size={16} />
            </button>
          </div>
        ),
      },
    ],
    [initialFilters]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  });

  const totalPages = Math.ceil(totalRows / pageSize);

  return (
    <div className="space-y-6">
      {/* Table Controls */}
      <div className="flex flex-col xl:flex-row gap-4 items-center justify-between px-2">
        <div className="relative w-full xl:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
          <input
            type="text"
            placeholder="Search job listings..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full rounded-2xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-1.5">
            <span className="text-[10px] uppercase font-black text-foreground/40 ml-1">Status:</span>
            <select 
              value={initialFilters.status || "All"}
              onChange={(e) => updateQueryParams({ status: e.target.value })}
              className="bg-transparent border-none text-sm font-bold text-foreground focus:ring-0 cursor-pointer"
            >
              <option value="All" className="bg-card text-foreground">All Statuses</option>
              <option value="Published" className="bg-card text-foreground">Published</option>
              <option value="Draft" className="bg-card text-foreground">Draft</option>
              <option value="Closed" className="bg-card text-foreground">Closed</option>
            </select>
          </div>

          {/* Job Type Filter */}
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-1.5">
            <span className="text-[10px] uppercase font-black text-foreground/40 ml-1">Type:</span>
            <select 
              value={initialFilters.type || "All"}
              onChange={(e) => updateQueryParams({ type: e.target.value })}
              className="bg-transparent border-none text-sm font-bold text-foreground focus:ring-0 cursor-pointer"
            >
              <option value="All" className="bg-card text-foreground">All Types</option>
              <option value="Full-time" className="bg-card text-foreground">Full-time</option>
              <option value="Part-time" className="bg-card text-foreground">Part-time</option>
              <option value="Internship" className="bg-card text-foreground">Internship</option>
              <option value="Contract" className="bg-card text-foreground">Contract</option>
              <option value="Remote" className="bg-card text-foreground">Remote</option>
            </select>
          </div>

          <button 
            onClick={() => {
              setSearchValue("");
              router.push(pathname);
            }}
            className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold text-foreground/70 hover:bg-foreground/5 transition-all ml-auto xl:ml-0"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xl dark:shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-border bg-foreground/[0.02]">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-4 text-xs font-black uppercase tracking-wider text-foreground/40">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-foreground/[0.01] transition-colors group">
                  {row.getVisibleCells().map((cell) => (
                    <th key={cell.id} className="px-6 py-5 font-normal">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {table.getRowModel().rows.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-foreground/5 text-foreground/20 mb-4">
              <Filter size={32} />
            </div>
            <p className="text-lg font-bold text-foreground">No jobs found matching your filters</p>
            <p className="text-sm text-foreground/40 mt-1">Try adjusting your filters or search term to see more results.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4 bg-foreground/[0.02]">
          <div className="text-sm text-foreground/40">
            Showing <span className="font-bold text-foreground">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-bold text-foreground">{Math.min(currentPage * pageSize, totalRows)}</span> of <span className="font-bold text-foreground">{totalRows}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQueryParams({ page: (currentPage - 1).toString() })}
              disabled={currentPage <= 1}
              className="p-2 rounded-xl border border-border bg-background text-foreground disabled:opacity-30 hover:bg-foreground/5 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1 px-2">
              <span className="text-sm font-bold text-foreground">{currentPage}</span>
              <span className="text-sm text-foreground/40">/ {totalPages || 1}</span>
            </div>
            <button
              onClick={() => updateQueryParams({ page: (currentPage + 1).toString() })}
              disabled={currentPage >= totalPages}
              className="p-2 rounded-xl border border-border bg-background text-foreground disabled:opacity-30 hover:bg-foreground/5 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <JobDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        job={selectedJob} 
      />
    </div>
  );
}

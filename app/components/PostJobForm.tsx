"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Tag, 
  Layout, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronLeft,
  Globe,
  Calendar,
  Settings,
  Trophy
} from "lucide-react";
import { jobSchema, type JobInput } from "@/lib/validations/job";
import Link from "next/link";

export default function PostJobForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      type: "Full-time",
      workArrangement: "Remote",
      category: "Frontend",
      experienceLevel: "Entry Level",
      currency: "USD",
      status: "Published",
      skills: [""],
      responsibilities: [""],
      requirements: [""],
    },
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills" as any,
  });

  const { fields: respFields, append: appendResp, remove: removeResp } = useFieldArray({
    control,
    name: "responsibilities" as any,
  });

  const { fields: reqFields, append: appendReq, remove: removeReq } = useFieldArray({
    control,
    name: "requirements" as any,
  });

  const onSubmit = async (data: JobInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Format salary string for legacy/display
      const salaryDisplay = data.salaryMin && data.salaryMax 
        ? `${data.currency} ${data.salaryMin.toLocaleString()} - ${data.salaryMax.toLocaleString()}`
        : "Competitive";
      
      const submissionData = {
        ...data,
        salary: salaryDisplay,
        expirationDate: data.expirationDate ? new Date(data.expirationDate).toISOString() : null,
      };

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post job");
      }

      router.push("/recruiter-dashboard/jobs");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputWrapper = ({ label, error, children, icon: Icon }: any) => (
    <div className="space-y-2">
      <label className="text-sm font-black uppercase tracking-wider text-foreground/60 flex items-center gap-2">
        {Icon && <Icon size={14} className="text-primary" />}
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs font-bold text-rose-500 flex items-center gap-1 mt-1">
          <AlertCircle size={12} /> {error.message}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link 
        href="/recruiter-dashboard/jobs"
        className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors font-bold mb-8 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Jobs
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Post a <span className="text-primary">New Job</span>
          </h1>
          <p className="mt-4 text-lg text-foreground/60 max-w-2xl">
            Create a professional job listing. Applications will be managed directly through the recruiter dashboard.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center gap-3 font-bold animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Section 1: Basic Information */}
        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Layout size={20} />
            </div>
            <h2 className="text-xl font-black text-foreground">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputWrapper label="Job Title" error={errors.title}>
              <input
                {...register("title")}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </InputWrapper>

            <InputWrapper label="Company Name" error={errors.company}>
              <input
                {...register("company")}
                placeholder="e.g. TechNova Solutions"
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </InputWrapper>

            <InputWrapper label="Job Category" error={errors.category} icon={Tag}>
              <select
                {...register("category")}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full Stack">Full Stack</option>
                <option value="DevOps">DevOps</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Science">Data Science</option>
                <option value="Mobile">Mobile</option>
                <option value="Security">Security</option>
                <option value="Other">Other</option>
              </select>
            </InputWrapper>

            <InputWrapper label="Experience Level" error={errors.experienceLevel} icon={Trophy}>
              <select
                {...register("experienceLevel")}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </InputWrapper>
          </div>
        </div>

        {/* Section 2: Compensation & Logistics */}
        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <DollarSign size={20} />
            </div>
            <h2 className="text-xl font-black text-foreground">Compensation & Logistics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputWrapper label="Currency" error={errors.currency}>
              <select
                {...register("currency")}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </InputWrapper>

            <InputWrapper label="Min Salary" error={errors.salaryMin}>
              <input
                type="number"
                {...register("salaryMin")}
                placeholder="50000"
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </InputWrapper>

            <InputWrapper label="Max Salary" error={errors.salaryMax}>
              <input
                type="number"
                {...register("salaryMax")}
                placeholder="80000"
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </InputWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputWrapper label="Location" error={errors.location} icon={MapPin}>
              <input
                {...register("location")}
                placeholder="e.g. New York, NY"
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </InputWrapper>

            <InputWrapper label="Work Arrangement" error={errors.workArrangement} icon={Globe}>
              <select
                {...register("workArrangement")}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </InputWrapper>

            <InputWrapper label="Job Type" error={errors.type} icon={Briefcase}>
              <select
                {...register("type")}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </InputWrapper>
          </div>
        </div>

        {/* Section 3: Detailed Content */}
        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <CheckCircle2 size={20} />
            </div>
            <h2 className="text-xl font-black text-foreground">Detailed Content</h2>
          </div>

          <InputWrapper label="About the Role" error={errors.description}>
            <textarea
              {...register("description")}
              placeholder="Provide a comprehensive description of the role and what it's like to work at your company..."
              rows={6}
              className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
            />
          </InputWrapper>

          {/* Dynamic Lists */}
          <div className="space-y-8">
            {/* Skills */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black uppercase tracking-wider text-foreground/60">Required Skills</label>
                <button
                  type="button"
                  onClick={() => appendSkill("")}
                  className="inline-flex items-center gap-2 text-xs font-black text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus size={14} /> Add Skill
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {skillFields.map((field, index) => (
                  <div key={field.id} className="relative flex items-center group">
                    <input
                      {...register(`skills.${index}` as any)}
                      placeholder="Skill"
                      className="rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all min-w-[120px]"
                    />
                    {skillFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={10} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black uppercase tracking-wider text-foreground/60">Responsibilities</label>
                <button
                  type="button"
                  onClick={() => appendResp("")}
                  className="inline-flex items-center gap-2 text-xs font-black text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus size={14} /> Add Responsibility
                </button>
              </div>
              <div className="space-y-3">
                {respFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-center group">
                    <input
                      {...register(`responsibilities.${index}` as any)}
                      placeholder="e.g. Design and develop scalable web applications"
                      className="w-full rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    />
                    {respFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeResp(index)}
                        className="p-2 text-foreground/20 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black uppercase tracking-wider text-foreground/60">Requirements</label>
                <button
                  type="button"
                  onClick={() => appendReq("")}
                  className="inline-flex items-center gap-2 text-xs font-black text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus size={14} /> Add Requirement
                </button>
              </div>
              <div className="space-y-3">
                {reqFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-center group">
                    <input
                      {...register(`requirements.${index}` as any)}
                      placeholder="e.g. 3+ years of experience with React and TypeScript"
                      className="w-full rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    />
                    {reqFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeReq(index)}
                        className="p-2 text-foreground/20 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Publishing Settings */}
        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Settings size={20} />
            </div>
            <h2 className="text-xl font-black text-foreground">Publishing Settings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputWrapper label="Listing Status" error={errors.status}>
              <select
                {...register("status")}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="Published">Published (Live immediately)</option>
                <option value="Draft">Draft (Save for later)</option>
              </select>
            </InputWrapper>

            <InputWrapper label="Expiration Date" error={errors.expirationDate} icon={Calendar}>
              <input
                type="date"
                {...register("expirationDate")}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </InputWrapper>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-border">
          <Link
            href="/recruiter-dashboard/jobs"
            className="px-10 py-5 rounded-2xl border border-border bg-background text-foreground/60 font-black hover:bg-foreground/5 hover:text-foreground transition-all active:scale-95"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-5 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Posting Listing...
              </>
            ) : (
              <>
                <CheckCircle2 size={20} />
                Publish Job Listing
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

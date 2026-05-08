"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
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
  Trophy,
  X,
  Eye,
  Building2,
  Clock,
  Sparkles
} from "lucide-react";
import { jobSchema, type JobInput } from "@/lib/validations/job";
import Link from "next/link";

interface PostJobFormProps {
  initialData?: JobInput & { id?: string };
  isEdit?: boolean;
}

// Smart Suggestion Input Component
const SuggestionInput = ({ 
  label, 
  error, 
  icon: Icon, 
  suggestions, 
  value, 
  onChange, 
  placeholder,
  name,
  register
}: any) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(e); // Update form state
    
    if (val.trim().length > 0) {
      const matches = suggestions.filter((s: string) => 
        s.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setFiltered(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (s: string) => {
    onChange({ target: { name, value: s } }); // Update react-hook-form
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-sm font-black uppercase tracking-wider text-foreground/60 flex items-center gap-2">
        {Icon && <Icon size={14} className="text-primary" />}
        {label}
      </label>
      <div className="relative">
        <input
          {...register(name)}
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (value && filtered.length > 0) setShowSuggestions(true);
          }}
          className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
        />
        {showSuggestions && (
          <div className="absolute z-[110] left-0 right-0 top-full mt-2 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 border-b border-border bg-foreground/[0.02] flex items-center gap-2 px-4 py-2">
              <Sparkles size={12} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Smart Suggestions</span>
            </div>
            <div className="max-h-48 overflow-y-auto custom-scrollbar">
              {filtered.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectSuggestion(s)}
                  className="w-full text-left px-4 py-3 text-sm font-bold text-foreground/70 hover:bg-primary hover:text-white transition-all flex items-center justify-between group"
                >
                  {s}
                  <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs font-bold text-rose-500 flex items-center gap-1 mt-1">
          <AlertCircle size={12} /> {error.message}
        </p>
      )}
    </div>
  );
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

export default function PostJobForm({ initialData, isEdit = false }: PostJobFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState({ locations: [], companies: [], skills: [] });
  
  // Local states for the "Add" input fields
  const [currentSkill, setCurrentSkill] = useState("");
  const [skillFiltered, setSkillFiltered] = useState<string[]>([]);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [currentResponsibility, setCurrentResponsibility] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
    defaultValues: initialData || {
      type: "Full-time",
      workArrangement: "Remote",
      category: "Frontend",
      experienceLevel: "Entry Level",
      currency: "USD",
      status: "Published",
      skills: [],
      responsibilities: [],
      requirements: [],
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    fetch("/api/suggestions")
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(err => console.error("Suggestions failed:", err));
  }, []);

  // Watch fields for live preview and list rendering
  const watchAllFields = watch();
  const skills = watch("skills") || [];
  const requirements = watch("requirements") || [];
  const responsibilities = watch("responsibilities") || [];

  const addSkill = (val?: string) => {
    const skillToAdd = val || currentSkill.trim();
    if (skillToAdd && !skills.includes(skillToAdd)) {
      setValue("skills", [...skills, skillToAdd], { shouldValidate: true });
      setCurrentSkill("");
      setShowSkillSuggestions(false);
    }
  };

  const handleSkillInput = (val: string) => {
    setCurrentSkill(val);
    if (val.trim().length > 0) {
      const matches = suggestions.skills.filter((s: string) => 
        s.toLowerCase().includes(val.toLowerCase()) && !skills.includes(s)
      ).slice(0, 5);
      setSkillFiltered(matches);
      setShowSkillSuggestions(matches.length > 0);
    } else {
      setShowSkillSuggestions(false);
    }
  };

  const removeSkill = (index: number) => {
    setValue("skills", skills.filter((_, i) => i !== index), { shouldValidate: true });
  };

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setValue("requirements", [...requirements, currentRequirement.trim()], { shouldValidate: true });
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setValue("requirements", requirements.filter((_, i) => i !== index), { shouldValidate: true });
  };

  const addResponsibility = () => {
    if (currentResponsibility.trim()) {
      setValue("responsibilities", [...responsibilities, currentResponsibility.trim()], { shouldValidate: true });
      setCurrentResponsibility("");
    }
  };

  const removeResponsibility = (index: number) => {
    setValue("responsibilities", responsibilities.filter((_, i) => i !== index), { shouldValidate: true });
  };

  const onSubmit = async (data: JobInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const salaryDisplay = data.salaryMin && data.salaryMax 
        ? `${data.currency} ${data.salaryMin.toLocaleString()} - ${data.salaryMax.toLocaleString()}`
        : "Competitive";
      
      const submissionData = {
        ...data,
        salary: salaryDisplay,
        expirationDate: data.expirationDate ? new Date(data.expirationDate).toISOString() : null,
      };

      const url = isEdit ? `/api/jobs/${initialData?.id}` : "/api/jobs";
      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to ${isEdit ? 'update' : 'post'} job`);
        } else {
          const text = await response.text();
          console.error("Non-JSON Error Response:", text);
          throw new Error(`Server Error (${response.status}): The server returned an unexpected response.`);
        }
      }

      router.push("/recruiter-dashboard/jobs");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4">
      <Link 
        href="/recruiter-dashboard/jobs"
        className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors font-bold mb-8 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Jobs
      </Link>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                {isEdit ? "Edit" : "Post a"} <span className="text-primary">{isEdit ? "Listing" : "New Job"}</span>
              </h1>
              <p className="mt-4 text-lg text-foreground/60 max-w-2xl">
                {isEdit ? "Update the details of your job listing below." : "Create a professional job listing. Applications will be managed directly through the recruiter dashboard."}
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
                    autoComplete="off"
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  />
                </InputWrapper>

                <SuggestionInput 
                  label="Company Name" 
                  name="company"
                  value={watchAllFields.company}
                  onChange={(e: any) => setValue("company", e.target.value, { shouldValidate: true })}
                  register={register}
                  suggestions={suggestions.companies}
                  error={errors.company}
                  placeholder="e.g. TechNova Solutions"
                />

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
                <SuggestionInput 
                  label="Location" 
                  name="location"
                  icon={MapPin}
                  value={watchAllFields.location}
                  onChange={(e: any) => setValue("location", e.target.value, { shouldValidate: true })}
                  register={register}
                  suggestions={suggestions.locations}
                  error={errors.location}
                  placeholder="e.g. New York, NY"
                />

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
                  placeholder="Provide a comprehensive description of the role..."
                  rows={6}
                  className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                />
              </InputWrapper>

              {/* Dynamic Lists */}
              <div className="space-y-12">
                {/* Skills Interactive */}
                <div className="space-y-4">
                  <label className="text-sm font-black uppercase tracking-wider text-foreground/60">Required Skills</label>
                  <div className="relative">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        autoComplete="off"
                        value={currentSkill}
                        onChange={(e) => handleSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        placeholder="Type a skill (e.g. React)..."
                        className="flex-1 rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => addSkill()}
                        className="px-6 rounded-2xl bg-primary/10 text-primary font-black text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                      >
                        <Plus size={18} /> Add
                      </button>
                    </div>
                    {showSkillSuggestions && (
                      <div className="absolute z-[110] left-0 right-0 top-full mt-2 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-2 border-b border-border bg-foreground/[0.02] flex items-center gap-2 px-4 py-2">
                          <Sparkles size={12} className="text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Suggested Skills</span>
                        </div>
                        {skillFiltered.map((s, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => addSkill(s)}
                            className="w-full text-left px-4 py-3 text-sm font-bold text-foreground/70 hover:bg-primary hover:text-white transition-all flex items-center justify-between group"
                          >
                            {s}
                            <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((skill, index) => (
                      <span key={`skill-${index}`} className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs font-bold text-foreground animate-in zoom-in-50 duration-200">
                        {skill}
                        <button type="button" onClick={() => removeSkill(index)} className="hover:text-rose-500 transition-colors">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    {skills.length === 0 && <p className="text-sm text-foreground/30 italic">No skills added yet.</p>}
                  </div>
                  {errors.skills && <p className="text-xs font-bold text-rose-500 mt-1">{errors.skills.message}</p>}
                </div>

                {/* Requirements Interactive */}
                <div className="space-y-4">
                  <label className="text-sm font-black uppercase tracking-wider text-foreground/60">Job Requirements</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      autoComplete="off"
                      value={currentRequirement}
                      onChange={(e) => setCurrentRequirement(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                      placeholder="Type a requirement (e.g. 5+ years exp)..."
                      className="flex-1 rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={addRequirement}
                      className="px-6 rounded-2xl bg-indigo-500/10 text-indigo-500 font-black text-sm hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-2"
                    >
                      <Plus size={18} /> Add
                    </button>
                  </div>
                  <ul className="space-y-3 pt-2">
                    {requirements.map((req, index) => (
                      <li key={`req-${index}`} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-foreground/[0.02] border border-border group animate-in slide-in-from-left-4 duration-200">
                        <span className="text-sm font-medium text-foreground/80">{req}</span>
                        <button type="button" onClick={() => removeRequirement(index)} className="text-foreground/20 hover:text-rose-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </li>
                    ))}
                    {requirements.length === 0 && <p className="text-sm text-foreground/30 italic">No requirements added yet.</p>}
                  </ul>
                  {errors.requirements && <p className="text-xs font-bold text-rose-500 mt-1">{errors.requirements.message}</p>}
                </div>

                {/* Responsibilities Interactive */}
                <div className="space-y-4">
                  <label className="text-sm font-black uppercase tracking-wider text-foreground/60">Key Responsibilities</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      autoComplete="off"
                      value={currentResponsibility}
                      onChange={(e) => setCurrentResponsibility(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addResponsibility())}
                      placeholder="Type a responsibility..."
                      className="flex-1 rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={addResponsibility}
                      className="px-6 rounded-2xl bg-amber-500/10 text-amber-500 font-black text-sm hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2"
                    >
                      <Plus size={18} /> Add
                    </button>
                  </div>
                  <ul className="space-y-3 pt-2">
                    {responsibilities.map((resp, index) => (
                      <li key={`resp-${index}`} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-foreground/[0.02] border border-border group animate-in slide-in-from-left-4 duration-200">
                        <span className="text-sm font-medium text-foreground/80">{resp}</span>
                        <button type="button" onClick={() => removeResponsibility(index)} className="text-foreground/20 hover:text-rose-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </li>
                    ))}
                    {responsibilities.length === 0 && <p className="text-sm text-foreground/30 italic">No responsibilities added yet.</p>}
                  </ul>
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
                    <option value="Closed">Closed (Remove from board)</option>
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
                    {isEdit ? "Saving..." : "Posting..."}
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    {isEdit ? "Save Changes" : "Publish Job Listing"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 xl:col-span-4 hidden lg:block">
          <div className="sticky top-12 space-y-6">
            <div className="flex items-center gap-2 px-2 text-primary font-black uppercase tracking-widest text-xs">
              <Eye size={16} /> Live Preview
            </div>
            
            <div className="rounded-[2.5rem] border border-border bg-card p-1 shadow-2xl overflow-hidden">
              <div className="bg-background rounded-[2.25rem] p-8 space-y-8 min-h-[600px] max-h-[85vh] overflow-y-auto custom-scrollbar">
                {/* Preview Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Building2 size={28} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-foreground leading-tight">
                        {watchAllFields.title || "Job Title Preview"}
                      </h3>
                      <p className="text-primary font-bold text-sm uppercase tracking-wide">
                        {watchAllFields.company || "Company Name"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black text-emerald-500 border border-emerald-500/20">
                      <DollarSign size={10} />
                      {watchAllFields.salaryMin && watchAllFields.salaryMax 
                        ? `${watchAllFields.currency} ${watchAllFields.salaryMin.toLocaleString()} - ${watchAllFields.salaryMax.toLocaleString()}`
                        : "Competitive"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black text-primary border border-primary/20">
                      <MapPin size={10} />
                      {watchAllFields.location || "Location"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-black text-amber-500 border border-amber-500/20">
                      <Clock size={10} />
                      {watchAllFields.type || "Full-time"}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border/50" />

                {/* About Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-foreground/40">About the Role</h4>
                  <p className="text-sm text-foreground/60 leading-relaxed whitespace-pre-wrap">
                    {watchAllFields.description || "Describe the role and your company's mission here..."}
                  </p>
                </div>

                {/* Skills Section */}
                {skills.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-foreground/40">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <span key={i} className="rounded-lg bg-foreground/5 px-2.5 py-1 text-[11px] font-bold text-foreground/80 border border-border">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements Section */}
                {requirements.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-foreground/40">Requirements</h4>
                    <ul className="space-y-2">
                      {requirements.map((req, i) => (
                        <li key={i} className="flex gap-2 text-sm text-foreground/60">
                          <span className="text-primary font-black select-none">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Responsibilities Section */}
                {responsibilities.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-foreground/40">Responsibilities</h4>
                    <ul className="space-y-2">
                      {responsibilities.map((resp, i) => (
                        <li key={i} className="flex gap-2 text-sm text-foreground/60">
                          <span className="text-amber-500 font-black select-none">•</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";

export default function ApplyJobModal({ 
  jobId, 
  jobTitle, 
  company 
}: { 
  jobId: string, 
  jobTitle: string, 
  company: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after animation (simulate)
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
      if (formRef.current) formRef.current.reset();
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget);
      
      const file = formData.get("resume") as File;
      if (!file || file.size === 0) {
        throw new Error("Please upload a resume.");
      }

      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit application. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-950"
      >
        Apply Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-950 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Apply for this role</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {jobTitle} at <span className="font-semibold text-primary">{company}</span>
                </p>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Thank you for applying to the {jobTitle} position at {company}. We have received your application and will be in touch soon.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="mt-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form id="apply-form" ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                      <p className="text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-gray-100 dark:border-gray-800 pb-2">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" id="name" name="name" required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Jane Doe" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address <span className="text-red-500">*</span></label>
                        <input type="email" id="email" name="email" required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="jane@example.com" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                        <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-gray-100 dark:border-gray-800 pb-2">Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile</label>
                        <input type="url" id="linkedin" name="linkedin" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="https://linkedin.com/in/..." />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio / Website</label>
                        <input type="url" id="portfolio" name="portfolio" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="https://..." />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-gray-100 dark:border-gray-800 pb-2">Documents</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resume / CV <span className="text-red-500">*</span></label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg hover:border-primary transition-colors bg-gray-50 dark:bg-gray-900/50">
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                              <label htmlFor="resume" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary dark:focus-within:ring-offset-gray-900">
                                <span>Upload a file</span>
                                <input id="resume" name="resume" type="file" className="sr-only" required accept=".pdf,.doc,.docx" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Letter</label>
                        <textarea id="coverLetter" name="coverLetter" rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="Briefly tell us why you're a great fit for this role..."></textarea>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            {status !== "success" && (
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 shrink-0 rounded-b-2xl flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-foreground font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  form="apply-form"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

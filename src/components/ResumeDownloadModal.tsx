import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ApiError, downloadResume, trackEvent } from "../lib/api";
import { fieldClass, labelClass } from "../lib/formStyles";
import { useToast } from "./Toast";
import { DownloadIcon } from "./icons";

const EMPTY = { name: "", email: "", company: "" };

export function ResumeDownloadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    trackEvent("resume_view");
    setError(null);
    const focusTimer = window.setTimeout(() => firstField.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const update = (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await downloadResume({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
      });
      toast({ title: "Résumé downloaded", description: "Thanks for stopping by — let's talk!" });
      setForm(EMPTY);
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't download right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] grid place-items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Download résumé"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md rounded-3xl border border-app bg-surface p-7 shadow-2xl shadow-black/20"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Résumé</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">A quick hello first</h3>
            <p className="mt-2 text-sm text-soft">
              Tell me who you are and the download starts right away.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className={labelClass} htmlFor="resume-name">Name</label>
                <input
                  id="resume-name"
                  ref={firstField}
                  className={fieldClass}
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Ada Lovelace"
                  required
                  minLength={2}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="resume-email">Email</label>
                <input
                  id="resume-email"
                  type="email"
                  className={fieldClass}
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="resume-company">Company <span className="normal-case">(optional)</span></label>
                <input
                  id="resume-company"
                  className={fieldClass}
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Where you work"
                />
              </div>

              {error && <p className="text-sm text-accent-3">{error}</p>}

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full px-4 py-2.5 text-sm font-medium text-soft transition-colors hover:text-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium disabled:opacity-60"
                >
                  <DownloadIcon className="h-[18px] w-[18px]" />
                  {submitting ? "Preparing…" : "Download résumé"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

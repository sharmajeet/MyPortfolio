import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { profile } from "../data";
import { ApiError, submitContact, trackEvent, trackLinkClick } from "../lib/api";
import { fieldClass, labelClass } from "../lib/formStyles";
import { MagneticButton } from "./MagneticButton";
import { useToast } from "./Toast";
import { GithubIcon, LinkedinIcon, ArrowIcon } from "./icons";

const EMPTY = { name: "", email: "", message: "" };

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".contact-word", {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  const update =
    (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitContact({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
      trackEvent("contact_submit");
      toast({ title: "Message sent", description: "Thanks — I'll get back to you soon!" });
      setForm(EMPTY);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't send right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={root} className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <p className="font-mono text-sm text-accent">07 · Contact</p>
      <div className="mt-6 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div>
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            <span className="block overflow-hidden">
              <span className="contact-word block">Let's build</span>
            </span>
            <span className="block overflow-hidden">
              <span className="contact-word block gradient-text">something great.</span>
            </span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-soft">
            Open to backend and cloud roles across India, and always up for a good engineering
            problem. Use the form, or reach me directly by email.
          </p>
          <MagneticButton
            href={`mailto:${profile.email}`}
            onClick={() => trackLinkClick(`mailto:${profile.email}`, "email")}
            className="btn-primary mt-8 gap-2 px-7 py-3.5 font-medium"
          >
            {profile.email} <ArrowIcon className="h-4 w-4" />
          </MagneticButton>
        </div>

        <div className="rounded-3xl border border-app bg-surface p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Send a message</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className={labelClass} htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                className={fieldClass}
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                required
                minLength={2}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                className={fieldClass}
                value={form.email}
                onChange={update("email")}
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className={`${fieldClass} min-h-28 resize-none`}
                value={form.message}
                onChange={update("message")}
                placeholder="What's on your mind?"
                required
                minLength={10}
              />
            </div>

            {error && <p className="text-sm text-accent-3">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>

          <div className="mt-6 flex gap-3 border-t border-app pt-6">
            <MagneticButton
              href={profile.linkedin}
              target="_blank"
              onClick={() => trackLinkClick(profile.linkedin, "linkedin")}
              className="flex-1 gap-2 border border-app px-4 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon className="h-5 w-5" /> LinkedIn
            </MagneticButton>
            <MagneticButton
              href={profile.github}
              target="_blank"
              onClick={() => trackLinkClick(profile.github, "github")}
              className="flex-1 gap-2 border border-app px-4 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon className="h-5 w-5" /> GitHub
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

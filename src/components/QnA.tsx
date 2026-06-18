import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { ApiError, getComments, submitComment, type PublicComment } from "../lib/api";
import { fieldClass, labelClass } from "../lib/formStyles";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useToast } from "./Toast";

const EMPTY = { name: "", email: "", message: "" };

export function QnA() {
  const { toast } = useToast();
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getComments()
      .then(setComments)
      .catch(() => {});
  }, []);

  const update =
    (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitComment({
        name: form.name.trim(),
        email: form.email.trim() || undefined,
        message: form.message.trim(),
      });
      toast({ title: "Question received", description: "It'll appear here once I review it." });
      setForm(EMPTY);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="qna" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="06"
        title="Ask Me Anything"
        subtitle="Curious about my stack, a project, or availability? Leave a question — approved ones show up here."
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Reveal>
          <form onSubmit={handleSubmit} className="rounded-3xl border border-app bg-surface p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="qna-name">Name</label>
                <input
                  id="qna-name"
                  className={fieldClass}
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  required
                  minLength={2}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="qna-email">Email <span className="normal-case">(optional)</span></label>
                <input
                  id="qna-email"
                  type="email"
                  className={fieldClass}
                  value={form.email}
                  onChange={update("email")}
                  placeholder="So I can reply"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass} htmlFor="qna-message">Question</label>
              <textarea
                id="qna-message"
                className={`${fieldClass} min-h-28 resize-none`}
                value={form.message}
                onChange={update("message")}
                placeholder="What would you like to know?"
                required
                minLength={2}
              />
            </div>

            {error && <p className="mt-3 text-sm text-accent-3">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-5 w-full rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit question"}
            </button>
          </form>
        </Reveal>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <Reveal>
              <p className="rounded-3xl border border-dashed border-app px-6 py-10 text-center text-sm text-soft">
                No questions answered yet — be the first to ask.
              </p>
            </Reveal>
          ) : (
            comments.map((comment, index) => (
              <Reveal key={comment.id} delay={index * 0.05}>
                <article className="rounded-2xl border border-app bg-surface p-6">
                  <p className="text-sm leading-relaxed">{comment.message}</p>
                  <div className="mt-4 flex items-center justify-between font-mono text-xs text-soft">
                    <span className="text-accent">— {comment.name}</span>
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                </article>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

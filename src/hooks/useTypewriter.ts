import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../lib/gsap";

export function useTypewriter(words: string[], typeMs = 75, deleteMs = 40, holdMs = 1600) {
  const [text, setText] = useState(words[0] ?? "");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const current = words[index % words.length];
    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      timeout = window.setTimeout(() => setText(next), deleting ? deleteMs : typeMs);
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs]);

  return text;
}

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "../data/portfolio";
import { DownloadIcon, CheckIcon } from "./icons";

type Phase = "idle" | "downloading" | "done";

const labels: Record<Phase, string> = {
  idle: "Resume",
  downloading: "Downloading",
  done: "Saved",
};

export function ResumeButton({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("downloading");
    window.setTimeout(() => setPhase("done"), 1100);
    window.setTimeout(() => setPhase("idle"), 2600);
  };

  return (
    <motion.a
      href={profile.resumeUrl}
      download="Jeet_Sharma_Resume.pdf"
      onClick={handleClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      layout
      aria-label="Download résumé"
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-app bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent ${className ?? ""}`}
    >
      <span className="relative grid h-[18px] w-[18px] place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "done" ? (
            <motion.span
              key="check"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
              className="absolute text-accent"
            >
              <CheckIcon className="h-[18px] w-[18px]" />
            </motion.span>
          ) : (
            <motion.span
              key="download"
              className="absolute"
              animate={phase === "downloading" ? { y: [0, 14, -14, 0], opacity: [1, 0, 0, 1] } : { y: 0, opacity: 1 }}
              transition={phase === "downloading" ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
            >
              <DownloadIcon className="h-[18px] w-[18px]" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phase}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {labels[phase]}
        </motion.span>
      </AnimatePresence>

      <AnimatePresence>
        {phase === "downloading" && (
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </motion.a>
  );
}

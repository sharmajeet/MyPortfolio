import { useState } from "react";
import { motion } from "motion/react";
import { ResumeDownloadModal } from "./ResumeDownloadModal";
import { DownloadIcon } from "./icons";

export function ResumeButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Download résumé"
        className={`inline-flex items-center gap-2 rounded-full border border-app bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent ${className ?? ""}`}
      >
        <DownloadIcon className="h-[18px] w-[18px]" />
        Resume
      </motion.button>
      <ResumeDownloadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

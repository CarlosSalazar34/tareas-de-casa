"use client";
import { motion } from "framer-motion";

interface TaskItemProps {
  title: string;
  isDone: boolean;
  onToggle: () => void;
}

export const TaskItem = ({ title, isDone, onToggle }: TaskItemProps) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      className="overflow-hidden last:shadow-none ios-separator"
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-pressed={isDone}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className="group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/20 dark:hover:bg-white/5"
      >
        {/* Circulo de completado, como en Recordatorios */}
        <span
          aria-hidden="true"
          className={`relative flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-200 ${
            isDone
              ? "border-accent bg-accent"
              : "border-label-tertiary group-hover:border-label-secondary"
          }`}
        >
          <motion.svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-3.5 w-3.5 text-accent-contrast"
            initial={false}
            animate={{ scale: isDone ? 1 : 0, opacity: isDone ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 700, damping: 22 }}
          >
            <path
              d="M4 10.5l4 4 8-9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </span>

        <span
          className={`min-w-0 flex-1 break-words text-[17px] leading-snug transition-all duration-200 ${
            isDone
              ? "text-label-secondary line-through decoration-label-tertiary"
              : "text-label"
          }`}
        >
          {title}
        </span>
      </motion.button>
    </motion.li>
  );
};

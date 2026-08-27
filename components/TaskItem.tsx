"use client";
import { motion } from "framer-motion";
import type { Task } from "@/utils/api";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const isDone = task.status === "completada";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      className="ios-separator group flex items-center overflow-hidden last:shadow-none transition-colors hover:bg-white/20 dark:hover:bg-white/5"
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-pressed={isDone}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className="flex min-w-0 flex-1 items-center gap-3 py-3.5 pl-4 pr-2 text-left"
      >
        {/* Circulo de completado, como en Recordatorios */}
        <span
          aria-hidden="true"
          className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-200 ${
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
          {task.title}
        </span>
      </motion.button>

      <motion.button
        type="button"
        onClick={onDelete}
        aria-label={`Eliminar ${task.title}`}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-label-tertiary transition-colors hover:bg-red-500/15 hover:text-red-500"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4.5 w-4.5">
          <path
            d="M5 7h14M10 7V5h4v2m-7 0 .8 12a1 1 0 0 0 1 .9h6.4a1 1 0 0 0 1-.9L17 7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </motion.li>
  );
};

"use client";
import { motion } from "framer-motion";

/** Barra de progreso: porcentaje de tareas completadas. */
export const TaskProgress = ({ value }: { value: number }) => (
  <div
    role="progressbar"
    aria-valuenow={Math.round(value)}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label="Progreso de tareas"
    className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-label-tertiary/25"
  >
    <motion.div
      className="h-full rounded-full bg-accent"
      initial={false}
      animate={{ width: `${value}%` }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    />
  </div>
);

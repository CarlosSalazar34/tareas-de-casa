"use client";
import { AnimatePresence } from "framer-motion";
import { TaskItem } from "@/components/TaskItem";
import { isTaskDone, type Task } from "@/utils/api";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

const Skeleton = () => (
  <div className="glass overflow-hidden rounded-[18px]" aria-label="Cargando tareas">
    {[0, 1, 2].map((i) => (
      <div key={i} className="ios-separator flex items-center gap-3 px-4 py-3.5">
        <span className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-label-tertiary/40" />
        <span
          className="h-4 animate-pulse rounded-full bg-label-tertiary/40"
          style={{ width: `${70 - i * 15}%` }}
        />
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="glass flex flex-col items-center rounded-[18px] px-6 py-14 text-center">
    <span
      aria-hidden="true"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-label-tertiary/20 text-label-secondary"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M9 11.5 11 13.5 15.5 9M4.5 6.5h15v13a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-13Zm4-3h7v3h-7v-3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <p className="mt-4 text-[17px] font-semibold">Aun no hay tareas</p>
    <p className="mt-1 max-w-xs text-[15px] text-label-secondary">
      Agrega la primera y repartanla entre todos.
    </p>
  </div>
);

/** Una tarjeta agrupada estilo iOS con las tareas que reciba. */
const TaskGroup = ({ tasks, onToggle, onDelete }: Omit<TaskListProps, "isLoading">) => (
  <ul className="glass overflow-hidden rounded-[18px]">
    <AnimatePresence initial={false}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </AnimatePresence>
  </ul>
);

export const TaskList = ({ tasks, isLoading, onToggle, onDelete }: TaskListProps) => {
  if (isLoading) return <Skeleton />;
  if (tasks.length === 0) return <EmptyState />;

  const pending = tasks.filter((task) => !isTaskDone(task));
  const done = tasks.filter(isTaskDone);

  return (
    <div className="space-y-7">
      {pending.length > 0 && (
        <TaskGroup tasks={pending} onToggle={onToggle} onDelete={onDelete} />
      )}

      {done.length > 0 && (
        <section>
          <h3 className="mb-2 px-4 text-[13px] font-medium uppercase tracking-[0.06em] text-label-secondary">
            Completadas
          </h3>
          <TaskGroup tasks={done} onToggle={onToggle} onDelete={onDelete} />
        </section>
      )}
    </div>
  );
};

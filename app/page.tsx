"use client";
import { motion } from "framer-motion";
import { NewTaskForm } from "@/components/NewTaskForm";
import { TaskList } from "@/components/TaskList";
import { TaskProgress } from "@/components/TaskProgress";
import { useDialog } from "@/hooks/useDialog";
import { useTasks } from "@/hooks/useTasks";
import { isTaskDone } from "@/utils/api";

/** Titulo y subtitulo del encabezado segun cuantas tareas quedan pendientes. */
const buildSummary = (isLoading: boolean, total: number, pending: number) => {
  if (isLoading) return { title: "Hoy", subtitle: "Cargando tareas…" };
  if (total === 0) return { title: "Hoy", subtitle: "Sin tareas por ahora" };
  if (pending === 0) return { title: "Todo listo", subtitle: "No queda nada pendiente" };

  return {
    title: "Hoy",
    subtitle: `${pending} ${pending === 1 ? "pendiente" : "pendientes"} de ${total}`,
  };
};

export default function Home() {
  const { setIsOpen } = useDialog();
  const { tasks, isLoading, addTask, toggleStatus, removeTask } = useTasks();

  const doneCount = tasks.filter(isTaskDone).length;
  const pendingCount = tasks.length - doneCount;
  const progress = tasks.length ? (doneCount / tasks.length) * 100 : 0;
  const { title, subtitle } = buildSummary(isLoading, tasks.length, pendingCount);

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-36 pt-6">
        {/* Large title, como en las apps nativas */}
        <h2 className="px-1 text-[34px] font-bold leading-tight tracking-[-0.03em]">{title}</h2>
        <p className="mt-1 px-1 text-[15px] text-label-secondary">{subtitle}</p>

        {tasks.length > 0 && <TaskProgress value={progress} />}

        <div className="mt-6">
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onToggle={toggleStatus}
            onDelete={removeTask}
          />
        </div>

        <NewTaskForm onSubmit={addTask} />
      </main>

      {/* Accion principal flotante, al alcance del pulgar */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-5 pt-10"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto w-full max-w-2xl">
          <motion.button
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
            onClick={() => setIsOpen(true)}
            className="glass-strong pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-[17px] font-semibold text-label"
          >
            <span aria-hidden="true" className="text-[20px] leading-none">+</span>
            Agregar tarea
          </motion.button>
        </div>
      </div>
    </div>
  );
}

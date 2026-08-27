"use client";
import { Dialog } from "@/components/Dialog";
import { TaskItem } from "@/components/TaskItem";
import { useDialog } from "@/hooks/useDialog";
import { createTask, updateTask } from "@/utils/api";
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { isOpen, setIsOpen } = useDialog();
  const { allTasks, setAllTasks, isLoading, refresh } = useTasks();
  const [task, setTask] = useState({
    title: "",
    status: "por_hacer"
  })

  const toggleForm = (event: React.SubmitEvent) => {
    event?.preventDefault();
    if(!task.title) return;
    createTask(task)
    .then(() => refresh());
    setTask((prev)=> {
      return { 
        ...prev,
        title: ""
      }
    });
    setIsOpen(false);
  }

  const toggleStatus = (id: string, isDone: boolean) => {
    const next = isDone ? "por_hacer" : "completada";
    // Actualizacion optimista: la UI responde antes que la red
    setAllTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: next } : item))
    );
    updateTask(id, next).catch(() => refresh());
  };

  const pending = allTasks.filter((item) => item.status !== "completada");
  const done = allTasks.filter((item) => item.status === "completada");
  const progress = allTasks.length ? (done.length / allTasks.length) * 100 : 0;

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-36 pt-6">
        {/* Large title, como en las apps nativas */}
        <h2 className="px-1 text-[34px] font-bold leading-tight tracking-[-0.03em]">
          {isLoading
            ? "Hoy"
            : pending.length === 0 && allTasks.length > 0
              ? "Todo listo"
              : "Hoy"}
        </h2>
        <p className="mt-1 px-1 text-[15px] text-label-secondary">
          {isLoading
            ? "Cargando tareas…"
            : allTasks.length === 0
              ? "Sin tareas por ahora"
              : pending.length === 0
                ? "No queda nada pendiente"
                : `${pending.length} ${pending.length === 1 ? "pendiente" : "pendientes"} de ${allTasks.length}`}
        </p>

        {/* Progreso */}
        {allTasks.length > 0 && (
          <div
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso de tareas"
            className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-label-tertiary/25"
          >
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            />
          </div>
        )}

        {/* Lista agrupada estilo iOS */}
        <div className="mt-6">
          {isLoading ? (
            <div className="glass overflow-hidden rounded-[18px]" aria-label="Cargando tareas">
              {[0, 1, 2].map((i) => (
                <div key={i} className="ios-separator flex items-center gap-3 px-4 py-3.5">
                  <span className="h-[22px] w-[22px] shrink-0 animate-pulse rounded-full bg-label-tertiary/40" />
                  <span
                    className="h-4 animate-pulse rounded-full bg-label-tertiary/40"
                    style={{ width: `${70 - i * 15}%` }}
                  />
                </div>
              ))}
            </div>
          ) : allTasks.length === 0 ? (
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
          ) : (
            <div className="space-y-7">
              {pending.length > 0 && (
                <ul className="glass overflow-hidden rounded-[18px]">
                  <AnimatePresence initial={false}>
                    {pending.map((item) => (
                      <TaskItem
                        key={item.id}
                        title={item.title}
                        isDone={false}
                        onToggle={() => toggleStatus(item.id, false)}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              )}

              {done.length > 0 && (
                <section>
                  <h3 className="mb-2 px-4 text-[13px] font-medium uppercase tracking-[0.06em] text-label-secondary">
                    Completadas
                  </h3>
                  <ul className="glass overflow-hidden rounded-[18px]">
                    <AnimatePresence initial={false}>
                      {done.map((item) => (
                        <TaskItem
                          key={item.id}
                          title={item.title}
                          isDone
                          onToggle={() => toggleStatus(item.id, true)}
                        />
                      ))}
                    </AnimatePresence>
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>

        <Dialog>
          <form className="flex flex-col" onSubmit={toggleForm}>
            <h2 className="text-[22px] font-bold tracking-[-0.02em]">Nueva tarea</h2>
            <p className="mt-1 text-[15px] text-label-secondary">
              Describe brevemente que hay que hacer.
            </p>
            <label htmlFor="task-title" className="sr-only">
              Nombre de la tarea
            </label>
            <input
              id="task-title"
              value={task.title}
              onChange={(event) => {
                setTask((prev) => ({
                  ...prev,
                  title: event.target.value
                }));
              }}
              type="text"
              required
              autoFocus
              autoComplete="off"
              placeholder="Ej. Sacar la basura"
              className="mt-5 w-full rounded-[14px] border border-separator bg-label-tertiary/15 px-4 py-3 text-[17px] text-label outline-none transition-all placeholder:text-label-tertiary focus:border-label-secondary focus-visible:outline-none"
            />
            <button
              type="submit"
              disabled={!task.title.trim()}
              className="mt-3 flex w-full items-center justify-center rounded-[14px] bg-accent px-4 py-3.5 text-[17px] font-semibold text-accent-contrast transition-all active:scale-[0.98] disabled:bg-fill-disabled disabled:text-label-secondary disabled:active:scale-100"
            >
              Agregar
            </button>
          </form>
        </Dialog>
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
            onClick={() => {
              setIsOpen(!isOpen);
            }}
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

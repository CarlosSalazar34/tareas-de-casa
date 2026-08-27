"use client";
import { useCallback, useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTaskStatus,
  type Task,
  type TaskStatus,
} from "@/utils/api";

/**
 * Estado de la lista de tareas y sus mutaciones.
 * Las mutaciones son optimistas: la UI cambia de inmediato y, si la red falla,
 * se recarga desde el servidor para volver al estado real.
 */
export const useTasks = () => {
  // null = todavia no llego la primera respuesta
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const refresh = useCallback(async () => {
    try {
      setTasks(await fetchTasks());
    } catch {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    // Carga inicial: el setState ocurre al resolverse el fetch, no en el render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const addTask = useCallback(
    async (title: string) => {
      await createTask({ title, status: "por_hacer" });
      await refresh();
    },
    [refresh]
  );

  const toggleStatus = useCallback(
    async (task: Task) => {
      const estado: TaskStatus =
        task.status === "completada" ? "por_hacer" : "completada";

      setTasks((prev) =>
        prev?.map((item) => (item.id === task.id ? { ...item, status: estado } : item)) ?? prev
      );

      try {
        await updateTaskStatus(task.id, estado);
      } catch {
        refresh();
      }
    },
    [refresh]
  );

  const removeTask = useCallback(
    async (id: string) => {
      setTasks((prev) => prev?.filter((item) => item.id !== id) ?? prev);

      try {
        await deleteTask(id);
      } catch {
        refresh();
      }
    },
    [refresh]
  );

  return {
    tasks: tasks ?? [],
    isLoading: tasks === null,
    addTask,
    toggleStatus,
    removeTask,
  };
};

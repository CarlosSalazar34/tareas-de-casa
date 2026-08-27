export type TaskStatus = "por_hacer" | "completada";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

/** Lo que la API necesita para crear una tarea (el id lo genera el backend). */
export type NewTask = Omit<Task, "id">;

/**
 * Todas las llamadas pasan por aqui: mismo header, mismo manejo de error.
 * Lanza si la respuesta no es 2xx para que el hook pueda revertir la UI.
 */
const request = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const response = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`La peticion a ${path} fallo (${response.status}).`);
  }

  return response.json() as Promise<T>;
};

export const fetchTasks = () => request<Task[]>("/tasks");

export const createTask = (task: NewTask) =>
  request<unknown>("/tasks/create", {
    method: "POST",
    body: JSON.stringify(task),
  });

export const updateTaskStatus = (id: string, estado: TaskStatus) =>
  request<unknown>("/tasks/complete", {
    method: "PATCH",
    body: JSON.stringify({ id, estado }),
  });

export const deleteTask = (id: string) =>
  request<unknown>("/tasks/delete", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

export const isTaskDone = (task: Task) => task.status === "completada";

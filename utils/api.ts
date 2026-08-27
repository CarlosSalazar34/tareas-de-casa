export interface Task {
    title: string;
    status: string;
}

export const createTask = async (task: Task): Promise<any>=> { 
    const response = await fetch("/api/tasks/create",
        {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...task})
        }
    )
    return await response.json();
}

export const updateTask = async (taskId: string, estado = "completada"): Promise<any> => { 
    const response = await fetch("/api/tasks/complete", {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: taskId, estado })
    })
    if (!response.ok) {
        throw new Error("No se pudo actualizar la tarea.")
    }
    return await response.json();
}
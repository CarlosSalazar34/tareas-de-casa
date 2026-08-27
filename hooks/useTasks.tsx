'use client';
import { useState, useEffect, useCallback } from "react";

interface TaskResponse { 
    id: string;
    title: string;
    status: string;
}

export const useTasks = ()=> {
    // null = todavia no llego la primera respuesta
    const [tasks, setTasks] = useState<TaskResponse[] | null>(null);

    const refresh = useCallback(async ()=> {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(Array.isArray(data) ? data : []);
    }, []);

    useEffect(()=> {
        // Carga inicial: el setState ocurre al resolverse el fetch, no en el render.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        refresh();
    }, [refresh])

    const setAllTasks = useCallback(
        (updater: (prev: TaskResponse[]) => TaskResponse[]) =>
            setTasks((prev) => updater(prev ?? [])),
        []
    );

    return { allTasks: tasks ?? [], setAllTasks, isLoading: tasks === null, refresh }
}

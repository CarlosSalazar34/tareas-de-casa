"use client";
import { useState } from "react";
import { Dialog } from "@/components/Dialog";
import { useDialog } from "@/hooks/useDialog";

interface NewTaskFormProps {
  onSubmit: (title: string) => void;
}

export const NewTaskForm = ({ onSubmit }: NewTaskFormProps) => {
  const { setIsOpen } = useDialog();
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setTitle("");
    setIsOpen(false);
  };

  return (
    <Dialog>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <h2 className="text-[22px] font-bold tracking-[-0.02em]">Nueva tarea</h2>
        <p className="mt-1 text-[15px] text-label-secondary">
          Describe brevemente que hay que hacer.
        </p>
        <label htmlFor="task-title" className="sr-only">
          Nombre de la tarea
        </label>
        <input
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          required
          autoFocus
          autoComplete="off"
          placeholder="Ej. Sacar la basura"
          className="mt-5 w-full rounded-[14px] border border-separator bg-label-tertiary/15 px-4 py-3 text-[17px] text-label outline-none transition-all placeholder:text-label-tertiary focus:border-label-secondary focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="mt-3 flex w-full items-center justify-center rounded-[14px] bg-accent px-4 py-3.5 text-[17px] font-semibold text-accent-contrast transition-all active:scale-[0.98] disabled:bg-fill-disabled disabled:text-label-secondary disabled:active:scale-100"
        >
          Agregar
        </button>
      </form>
    </Dialog>
  );
};

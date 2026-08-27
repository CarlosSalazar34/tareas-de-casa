export const Header = () => {
  return (
    <header className="sticky top-0 z-40">
      <div
        className="glass rounded-none border-x-0 border-t-0"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent text-accent-contrast shadow-[0_2px_8px_-3px_var(--glass-shadow)]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-[17px] font-semibold tracking-[-0.02em]">
              Tareas de la casa
            </h1>
            <p className="truncate text-[13px] text-label-secondary">
              Organicemos el dia en familia
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

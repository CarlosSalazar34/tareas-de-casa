"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useDialog } from "@/hooks/useDialog";


export const Dialog = ({ children }: {children: React.ReactNode}) => {
    const { isOpen, setIsOpen } = useDialog();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-center">
                    <motion.div
                        className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Dialogo"
                        tabIndex={-1}
                        className="glass-strong relative w-full max-w-md rounded-[28px] px-5 pb-8 pt-2.5 text-label sm:m-4 sm:rounded-[28px] sm:pb-6"
                        style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    >
                        <div className="relative flex flex-row items-center justify-center">
                            {/* Grabber de sheet iOS */}
                            <span
                                aria-hidden="true"
                                className="h-5 w-9 rounded-full bg-label-tertiary sm:invisible"
                            />
                            <button
                                type="button"
                                aria-label="Cerrar"
                                onClick={() => setIsOpen(false)}
                                className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-label-tertiary/25 text-label-secondary transition-all hover:bg-label-tertiary/40 active:scale-90"
                            >
                                <span aria-hidden="true" className="text-[17px] leading-none">&times;</span>
                            </button>
                        </div>
                        <div className="mt-4">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

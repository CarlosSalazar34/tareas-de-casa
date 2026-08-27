import { useContext } from "react";
import { DialogContext } from "@/context/DialogContext";

export const useDialog = ()=> { 
    const dialogContext = useContext(DialogContext);
    if (!dialogContext) throw new Error("Error al cargar el componente");
    return dialogContext;
}
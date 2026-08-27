"use client";
import { createContext, useState } from "react";

interface DialogContextProps { 
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DialogContext = createContext<null | DialogContextProps>(null)

export const DialogContextProvider = ({children}: {children: React.ReactNode})=> { 
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return <DialogContext.Provider value={{
        isOpen, setIsOpen
    }}>
        {children}
    </DialogContext.Provider>
}
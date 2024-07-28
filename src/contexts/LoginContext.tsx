import { createContext, ReactNode } from "react";

export const LoginContext = createContext({});

export function LoginContextComp({ children }: { children: ReactNode }) {
    return <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>;
}

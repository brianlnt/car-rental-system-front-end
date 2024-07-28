import { AlertColor } from "@mui/material";
import { createContext, ReactNode, useState } from "react";

type StateType = {
    loading: boolean;
    notification: Notification;
};

type Notification = {
    status: AlertColor;
    message: string;
};

const initStateValue: StateType = {
    loading: false,
    notification: { status: "success" as AlertColor, message: "" },
};

export type GlobalContextType = {
    loading: boolean;
    notification: {
        status: AlertColor;
        message: string;
    };
    updateLoading: Function;
    updateNofitication: Function;
};

const initGlobalContextValue = {
    ...initStateValue,
    updateLoading: (loading: boolean) => {},
    updateNotification: (notification: Notification) => {},
};

export const GlobalContext = createContext(initGlobalContextValue);

export function GlobalContextComp({ children }: { children: ReactNode }) {
    const [state, setState] = useState<StateType>(initStateValue);

    const updateLoading = (loading: boolean) => {
        setState((prev) => ({ ...prev, loading }));
    };

    const updateNotification = (notification: Notification) => {
        setState((prev) => ({ ...prev, notification }));
    };

    return (
        <GlobalContext.Provider
            value={{
                loading: state.loading,
                notification: state.notification,
                updateLoading,
                updateNotification,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client"

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

export const SocketProvider = ({ children }) => {
    // const socket = useMemo(() => io("localhost:8000"), []);
    const socket = useMemo(() => io("https://web-rtc-x8rp.vercel.app", { transports: ["websocket"] }), []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
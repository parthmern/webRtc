// appContext 💙 Context API
// from here u can use socket in all apps anywhere

import React, { useMemo } from 'react';
import {io} from "socket.io-client";

const socketContext = React.createContext(null);

export const useSocket = () => {
    return React.useContext(socketContext);
}

export const SocketProvider = (props) =>{

    const socket = useMemo(()=>{
        console.log("socket connecting .... to 8001 host (to server side)")
        return io("http://localhost:8001")
    })
    

    return(
        <socketContext.Provider value={{socket}} >
            {props.children}
        </socketContext.Provider>
    )
}
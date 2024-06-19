// appContext 💙 Context API
// from here u can use socket in all apps anywhere

import React, { useMemo } from 'react'

const socketContext = React.createContext(null);

export const SocketProvider = (props) =>{

    const socket = useMemo(()=>{
        return io("http://localhost:8001")
    })
    

    return(
        <socketContext.Provider value={{socket}} >
            {props.children}
        </socketContext.Provider>
    )
}
// context api for webRtc

import React, {useMemo } from "react";

const PeerContext = React.createContext(null);

export const PeerProvider = (props) => {

    // RTCPeerConnection
    const peer = useMemo(()=>{
        return(new RTCPeerConnection())
    }, [])

    console.log("peer =>", peer);

    // createOffer SDP
    const createOffer = async () =>{
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }

    return(
        <PeerContext.Provider value={{peer, createOffer}}>
            {props.children}
        </PeerContext.Provider>
    )
}
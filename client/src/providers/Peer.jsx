// context api for webRtc

import React, {useMemo } from "react";

const PeerContext = React.createContext(null);

export const usePeer = () => {
    return React.useContext(PeerContext);
}

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

    // create ans
    const createAnswer = async (offer) =>{
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer; 
    }

    // set remote ans
    const setRemoteAns = async (ans) => {
        await peer.setRemoteDescription(ans);

    }

    return(
        <PeerContext.Provider value={{peer, createOffer, createAnswer, setRemoteAns}}>
            {props.children}
        </PeerContext.Provider>
    )
}
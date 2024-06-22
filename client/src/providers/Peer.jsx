// context api for webRtc

import React, {useCallback, useEffect, useMemo, useState } from "react";

const PeerContext = React.createContext(null);

export const usePeer = () => {
    return React.useContext(PeerContext);
}

export const PeerProvider = (props) => {

    const [remoteStream, setRemoteStream] = useState(null);

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

    // send stream
    const sendStream = async (stream) =>{
        const tracks = stream.getTracks();
        
        for(const track of tracks){
            peer.addTrack(track, stream);
        }
    }

    const handleTrackEvent = useCallback( (ev)=>{
        const streams = ev.streams;
        setRemoteStream(streams[0]);
    }, []);

    

    useEffect(()=>{
        peer.addEventListener("track", handleTrackEvent);
        // peer.addEventListener("negotiationneeded", handleNegotiation);
        return ()=>{
            peer.removeEventListener("track", handleTrackEvent);
        }
    }, [handleTrackEvent, peer])

    return(
        <PeerContext.Provider value={{peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream}}>
            {props.children}
        </PeerContext.Provider>
    )
}
import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {useSocket} from '../providers/Socket';
import {usePeer} from '../providers/Peer';

const RoomPage = () => {

    const {peer, createOffer, createAnswer, setRemoteAns} = usePeer();

    const {roomId} = useParams();

    const {socket} = useSocket();

    const handleNewUserJoined = useCallback(
      async (data) =>{
        const {emailId} = data ;
        console.log("New user joined room with", emailId);
        const offer = await createOffer();
        console.log("offer =>", offer);
        socket.emit("call-user", {emailId, offer});
      }
    , [createOffer, socket]);

    const handleIncomingCall = useCallback(
      async (data) => {
        const {from, offer} = data ;
        console.log("incoming call from =>", from, "and offer=>", offer);

        const ans = await createAnswer(offer) ;
        socket.emit("call-accepted", {emailId : from, ans});

    }, []);

    const handleCallAccepted = useCallback(
      async (data) =>{

        const {ans} = data; 
        console.log("call got accepted =>", ans);
        await setRemoteAns(ans);
      
    }, [])

    useEffect(()=>{
      socket.on("user-joined", handleNewUserJoined);
      socket.on("incoming-call", handleIncomingCall);
      socket.on("call-accepted", handleCallAccepted);

      return () =>{
        socket.off("user-joined", handleNewUserJoined);
        socket.off("incoming-call", handleIncomingCall);
        socket.off("call-accepted", handleCallAccepted);
      }

    }, [handleNewUserJoined, handleIncomingCall, socket]);

  return (
    <div>
      <div>RoomPage</div>
      
      <div>{roomId}</div>

    </div>
  )
}

export default RoomPage;

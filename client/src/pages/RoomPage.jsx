import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {useSocket} from '../providers/Socket';

const RoomPage = () => {
    const {roomId} = useParams();

    const {socket} = useSocket();

    const handleNewUserJoined = async (data) =>{
      const {emailId} = data ;
      console.log("New user joined room with", emailId);
      const offer = await createOffer();
      socket.emit("call-user", {emailId, offer});
    }

    useEffect(()=>{
      socket.on("user-joined", handleNewUserJoined);
    }, [])

  return (
    <div>
      <div>RoomPage</div>
      
      <div>{roomId}</div>

    </div>
  )
}

export default RoomPage;

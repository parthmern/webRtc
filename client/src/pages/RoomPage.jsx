import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../providers/Socket';
import { usePeer } from '../providers/Peer';
import ReactPlayer from 'react-player';

const RoomPage = () => {
  const [myStream, setMyStream] = useState(null);
  const [remoteEmailId, setRemoteEmailId] = useState(null);

  const { peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream } = usePeer();
  const { roomId } = useParams();
  const { socket } = useSocket();

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log('New user joined room with', emailId);
      const offer = await createOffer();
      console.log('offer =>', offer);
      socket.emit('call-user', { emailId, offer });
      setRemoteEmailId(emailId);
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log('incoming call from =>', from, 'and offer=>', offer);
      const ans = await createAnswer(offer);
      socket.emit('call-accepted', { emailId: from, ans });
      setRemoteEmailId(from);
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log('call got accepted =>', ans);
      await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  useEffect(() => {
    socket.on('user-joined', handleNewUserJoined);
    socket.on('incoming-call', handleIncomingCall);
    socket.on('call-accepted', handleCallAccepted);

    return () => {
      socket.off('user-joined', handleNewUserJoined);
      socket.off('incoming-call', handleIncomingCall);
      socket.off('call-accepted', handleCallAccepted);
    };
  }, [handleNewUserJoined, handleIncomingCall, handleCallAccepted, socket]);

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setMyStream(stream);
    sendStream(stream);
  }, [sendStream]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  const handleNegotiation = useCallback(async () => {
    console.log('Negotiation needed .........');
    const localOffer = await peer.createOffer();
    await peer.setLocalDescription(localOffer);
    socket.emit('call-user', { emailId: remoteEmailId, offer: localOffer });
  }, [peer, remoteEmailId, socket]);

  useEffect(() => {
    peer.addEventListener('negotiationneeded', handleNegotiation);
    return () => {
      peer.removeEventListener('negotiationneeded', handleNegotiation);
    };
  }, [handleNegotiation, peer]);

  return (
    <div>
      <div>RoomPage</div>
      <div>{roomId}</div>
      <div>you are connected to {remoteEmailId}</div>
      <div>
        <ReactPlayer url={myStream} playing muted />
      </div>
      <div>
        <ReactPlayer url={remoteStream} playing />
      </div>
    </div>
  );
};

export default RoomPage;

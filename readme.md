```
RTCPeerConnection - WebRTC Explained

https://www.onsip.com/voip-resources/voip-fundamentals/rtcpeerconnection

RTCPeerConnection helps two web browsers share important details to start exchanging real-time audio and video. This imp details includes each browser's public IP address and port number. For them to communicate, three types of information are needed:

1- Session control information: This tells when to start, end, or change communication sessions.
2- Network data: It shares the IP address and port number of each browser so they can connect to each other.
3- Media data: This includes which audio and video formats both browsers support, so they can agree on how to send and receive media.


```

```
SDP (Session Description Protocol) Messages OR creating OFFER

https://getstream.io/resources/projects/webrtc/basics/sdp-messages/

https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer

After creating a peer connection, you should exchange SDP (Session Description Protocol), which is a standard format for describing multimedia communication sessions for a peer-to-peer connection.


```

![image](https://github.com/parthmern/webRtc/assets/125397720/d297c659-8ac4-41da-9b25-c6de895639de)

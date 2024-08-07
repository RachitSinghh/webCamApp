import { useState, useEffect, useRef, useCallback } from "react";

export function usePeer() {
  const [peerId, setPeerId] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer();

      peer.on("open", (id) => {
        setPeerId(id);
        peerInstance.current = peer;
        console.log("Peer opened with ID: ", id);
      });

      peer.on("call", (call) => {
        call.answer(localStream);
        call.on("stream", (incomingStream) => {
          console.log("Reciving remote stream: ", incomingStream);
          setRemoteStream((prev) => ({ ...prev, [call.peer]: incomingStream }));
        });
      });
    });

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [localStream]);

  const createMeeting = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      console.log("Local stream set for meeting creation.");
      if (!peerId) {
        await new Promise((resolve) => {
          const checkPeerId = setInterval(() => {
            if (peerId) {
              clearInterval(checkPeerId);
              resolve();
            }
          }, 100);
        });
      }
      return peerId;
    } catch (error) {
      console.error("Error accessing media devices.", error);
      throw error;
    }
  }, [peerId]);

  const joinMeeting = useCallback(async (remotePeerId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      console.log("Local stream set for Joining meeting.");
      if (!peerInstance.current) {
        console.error("Peer instance not initialized");
        return;
      }
      const call = peerInstance.current.call(remotePeerId, stream);
      call.on("stream", (incomingStream) => {
        console.log("Reciving remote stream from join: ", incomingStream);
        setRemoteStream(prev =>({...prev, [remotePeerId]: incomingStream}));
      });
    } catch (error) {
      console.error("Error joining meeting.", error);
    }
  }, []);

  return { peerId, createMeeting, joinMeeting, localStream, remoteStream };
}

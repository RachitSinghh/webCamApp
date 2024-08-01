import { useState, useEffect, useRef, useCallback } from 'react';

export function usePeer() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    import('peerjs').then(({ default: Peer }) => {
      const peer = new Peer();
      
      peer.on('open', (id) => {
        setPeerId(id);
        peerInstance.current = peer;
      });

      peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setLocalStream(stream);
            call.answer(stream);
            call.on('stream', (remoteStream) => {
              setRemoteStream(remoteStream);
            });
          })
          .catch((error) => console.error('Error accessing media devices.', error));
      });
    });

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCall = useCallback((remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        const call = peerInstance.current.call(remotePeerId, stream);
        call.on('stream', (remoteStream) => {
          setRemoteStream(remoteStream);
        });
      })
      .catch((error) => console.error('Error accessing media devices.', error));
  }, []);

  return { peerId, startCall, localStream, remoteStream };
}




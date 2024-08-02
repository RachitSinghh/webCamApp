// components/VideoChat.js
import { useRef, useEffect } from 'react';

export function VideoChat({ localStream, remoteStreams }) {
  const localVideoRef = useRef(null);


  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <div className="flex">
      <div className="mr-4">
        <h2>My Screen</h2>
        <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-auto"></video>
      </div>
      {remoteStreams && Object.entries(remoteStreams).length > 0 ? (
        Object.entries(remoteStreams).map(([peerId, stream]) => (
          <div key={peerId} className="w-1/2 p-2">
            <h2>Remote Video ({peerId})</h2>
            <RemoteVideo stream={stream} />
          </div>
        ))
      ) : (
        <div className="w-1/2 p-2">
          <h2>Waiting for remote participants...</h2>
        </div>
      )}
    </div>
  );
}

function RemoteVideo({stream}){
  const videoRef = useRef(null);

  useEffect(() =>{
    if(stream && videoRef){
      videoRef.current.srcObject = stream;
    }
  },[stream]);
  return <video ref={videoRef} autoPlay playsInline  className="w-full h-auto"></video>
}
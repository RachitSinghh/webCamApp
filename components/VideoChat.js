// components/VideoChat.js
import { useRef, useEffect } from 'react';

export function VideoChat({ localStream, remoteStream }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);


  //Cleanup video sources on component unmount
  useEffect(() =>{
    return () =>{
      if(localVideoRef.current){
        localVideoRef.current.srchObject = null;
      }
      if(remoteVideoRef.current){
        remoteVideoRef.current.srcObject = null;
      }
    }
  })
  return (
    <div className="flex justify-around mt-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Local Video</h3>
        {localStream ? (
          <video ref={localVideoRef} autoPlay muted playsInline className="w-64 h-48 bg-black" />
        ) : (
          <div className="w-64 h-48 bg-gray-200 flex items-center justify-center">No local stream</div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Remote Video</h3>
        {remoteStream ? (
          <video ref={remoteVideoRef} autoPlay playsInline className="w-64 h-48 bg-black" />
        ) : (
          <div className="w-64 h-48 bg-gray-200 flex items-center justify-center">Waiting for remote user</div>
        )}
      </div>
    </div>
  );
}
import { useRef, useEffect } from "react";

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

  return (
    <div className="flex justify-around mt-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Local Video</h3>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-64 h-48 bg-black"
        />
      </div>
      <div>
        <h3 className="text-lg font-semiBold mb-2">Remote Video</h3>
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-64 h-48 bg-black"
        />
      </div>
    </div>
  );
}

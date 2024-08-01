'use client'
import Image from "next/image";
import { useState } from "react";
import { CreateMeeting } from "../components/CreateMeeting"
import { JoinMeeting } from "../components/JoinMeeting";
import {VideoChat} from '../components/VideoChat';
import { usePeer } from "../lib/usePeer";


export default function Home() {
  const {peerId, startCall, localStream, remoteStream} = usePeer();
  const [remotePeerId, setRemotePeerId] = useState('');

  const handleCreateMeeting = (meetingId) =>{
    console.log('Created meeting with ID: ', meetingId);
  };

  const handleJoinMeeting = (joinId) =>{
      console.log('Joining meeting with ID: ', joinId);
      setRemotePeerId(joinId);
      startCall(joinId);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assignment WebRTC App</h1>
      
      <CreateMeeting onCreateMeeting ={handleCreateMeeting} />
      <JoinMeeting onJoin={handleJoinMeeting} />

      <VideoChat localStream={localStream} remoteStream={remoteStream} />

      { peerId && (
          <p className="mt-4">Your Peer ID: {peerId}</p>
        )}
        {remotePeerId && (
          <p className="mt-2">Connected to: {remotePeerId}</p>
        )}
     
    </div>
  );
}

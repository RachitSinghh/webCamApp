'use client'
import Image from "next/image";
import { useState } from "react";
import { CreateMeeting } from "../components/CreateMeeting"
import { JoinMeeting } from "../components/JoinMeeting";
import {VideoChat} from '../components/VideoChat';
import { usePeer } from "../lib/usePeer";


export default function Home() {
  const {peerId,createMeeting,joinMeeting, localStream, remoteStreams} = usePeer();
  const [remotePeerId, setRemotePeerId] = useState('');

  const handleCreateMeeting = async () => {
    try{
      const meetingId = await createMeeting();
      return meetingId;
    }catch(error){
      console.log('Error creating meeting: ', error);
    }
  };
// const handleCreateMeeting = async () =>{
//   return meetingId = await createMeeting();
//   return meetingId;
// }

  const handleJoinMeeting = async(joinId) =>{
    try{
      setRemotePeerId(joinId);
      await joinMeeting(joinId);
    }catch(err){
      console.error('Error joining meeting:',err)
    }
  }

  // const handleJoinMeeting = (joinId) =>{
  //   setRemotePeerId(joinId);
  //   joinMeeting(joinId);
  // }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">WebRTC Video Chat App</h1>
      
      <CreateMeeting onCreateMeeting={handleCreateMeeting} />
      <JoinMeeting onJoin={handleJoinMeeting} />
      
      <VideoChat localStream={localStream} remoteStream={remoteStreams} />
      
      {peerId && (
        <p className="mt-4">Your Peer ID: {peerId}</p>
      )}
      {remotePeerId && (
        <p className="mt-2">Connected to: {remotePeerId}</p>
      )}
    </div>
  );
}

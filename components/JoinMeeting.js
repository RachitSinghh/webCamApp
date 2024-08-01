// components/JoinMeeting.js
import { useState } from 'react';

export function JoinMeeting({ onJoin }) {
  const [joinId, setJoinId] = useState('');

 
  const handleJoin = async () => {
    if (joinId) {
      try {
        await onJoin(joinId);
      } catch (error) {
        console.error('Error joining meeting:', error);
      }
    }
  };


  return (
    <div className="mb-4">
      <input 
        type="text"
        value={joinId}
        onChange={(e) => setJoinId(e.target.value)}
        placeholder="Enter meeting ID to join"
        className="border p-2 mr-2"
      />
      <button 
        onClick={handleJoin}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Join Meeting
      </button>
    </div>
  );
}
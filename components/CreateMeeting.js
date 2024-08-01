import {useState} from 'react';

export function CreateMeeting({onCreateMeeting}) {
    const [meetingId,setMeetingId] = useState('');

    const handleCreateMeeting = async () => {
        try {
          const id = await onCreateMeeting();
          setMeetingId(id);
        } catch (error) {
          console.error('Error creating meeting:', error);
        }
      };


    return (
        <div className="mb-4">
            <button 
                onClick={handleCreateMeeting}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create Meeting
            </button>
            {
                meetingId && (
                    <p className="mt-2">Share this meeting ID: {meetingId}</p>
                )
            }
        </div>
    )
}
export function CreateMeeting({peerId,onCreateMeeting}) {
    const createMeeting =() =>{
        if(peerId){
            onCreateMeeting(peerId);
        }else{
            console.warn('Peer ID is not available yet');
        }
    };

    return (
        <div className="mb-4">
            <button 
                onClick={createMeeting}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create Meeting
            </button>
            {
                peerId && (
                    <p className="mt-2">Share this meeting ID: {peerId}</p>
                )
            }
        </div>
    )
}
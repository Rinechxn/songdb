import { useState } from 'react';

const AudioPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Dummy function to simulate play/pause - Integrate with actual audio logic
    const togglePlayPause = (): void => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-[#2a203acc] border border-t border-b-0 border-x-0 border-[#554175] p-4 flex items-center justify-between text-white">
            <div className="flex items-center">
                <button onClick={togglePlayPause} className="mr-4">
                    {isPlaying ? (
                        <div className='w-6 h-6'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                            </svg>

                        </div>
                    ) : (
                        <div className='w-6 h-6'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>

                        </div>
                    )}
                </button>
                <div>
                    <div className="text-sm font-semibold">Track Title</div>
                    <div className="text-xs">Artist Name</div>
                </div>
            </div>
            <div className="flex-1 mx-4">
                {/* Assuming the progress value is being managed via state, you might need to set it dynamically */}
                <input type="range" value={30} min={0} max={100} className="w-full" onChange={() => { }} />
            </div>
            <div className="text-xs">00:30 / 03:45</div>
        </div>
    );
}

export default AudioPlayer;

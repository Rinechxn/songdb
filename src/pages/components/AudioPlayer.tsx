// ./components/AudioPlayer.tsx
import { useEffect, useRef } from 'react';
import { useAudio } from '../../libs/AudioContext';
import { useState } from 'react';
import VolIcon from './icns/volumeicon';
import MuteIcon from './icns/muteicon';

const AudioPlayer: React.FC = () => {
    const { audioSrc, fileDetails } = useAudio();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1); // Volume state, 1 as 100%
    const lnk = 'https://sdbbeta.uppriez.net/' + audioSrc
    // Update isPlaying state based on audio play and pause
    useEffect(() => {
        if (audioSrc) {
            if (isPlaying) {
                audioRef.current?.play().catch((e) => {
                    console.error("Auto-play failed", e);
                    setIsPlaying(false); // Handle auto-play policy
                });
            } else {
                audioRef.current?.pause();
            }
        }
    }, [isPlaying, audioSrc]);

    // Handle time update and metadata loaded
    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => {
            setCurrentTime(audio?.currentTime || 0);
        };

        const updateDuration = () => {
            setDuration(audio?.duration || 0);
        };

        audio?.addEventListener('timeupdate', updateTime);
        audio?.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio?.removeEventListener('timeupdate', updateTime);
            audio?.removeEventListener('loadedmetadata', updateDuration);
        };
    }, [audioSrc]);

    const togglePlayPause = (): void => {
        setIsPlaying(!isPlaying);
    };

    // Update volume when the volume state changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = (e.target.valueAsNumber / 100) * duration;
        audioRef.current!.currentTime = time;
        setCurrentTime(time);
    };

    // Convert seconds into MM:SS format
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(e.target.valueAsNumber);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-[#2a203acc] border-t border-[#554175] p-4 flex items-center justify-between text-white">
            {/* Play/Pause & Track Info (Left) */}
            <div className="flex items-center space-x-4 md:pr-32">
                <button onClick={togglePlayPause} className="mr-4 active:scale-75 duration-200">
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
                <div className="flex flex-col min-w-0 max-w-48">
                    <span className="text-xs font-semibold truncate" title="Now Playing">Now Playing</span>
                    <span className="text-sm truncate" title={fileDetails.fileName}>{fileDetails.fileName}</span>
                </div>
            </div>

            {/* Seek Slider (Center, hidden on small screens) */}
            <div className="flex flex-1 items-center px-4">
                <div className="w-full">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={duration ? (currentTime / duration) * 100 : 0}
                        onChange={handleSeek}
                        className="hidden md:flex w-full"
                    />
                    <div className="text-xs text-center">{formatTime(currentTime)} / {formatTime(duration)}</div>
                </div>
            </div>

            {/* Volume Control (Right) */}
            <div className="hidden md:flex items-center space-x-2 pl-32">
                {volume === 0 ? <MuteIcon /> : <VolIcon />}
                <input
                    type="range"
                    min={0}
                    max={1}
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24"
                />
            </div>

            <audio ref={audioRef} src={lnk} onEnded={() => setIsPlaying(false)} />
        </div>
    );
}

export default AudioPlayer;

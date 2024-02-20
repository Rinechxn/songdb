// ./components/AudioPlayer.tsx
import { useEffect, useRef } from 'react';
import { useAudio } from '../../libs/AudioContext';
import { useState } from 'react';
import VolIcon from './icns/volumeicon';
import MuteIcon from './icns/muteicon';
import PlayIcon from './icns/playicon';
import PauseIcon from './icns/pauseicon';
import Hls from 'hls.js';

const AudioPlayer: React.FC = () => {
    const { audioSrc, fileDetails } = useAudio();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1); // Volume state, 1 as 100%
    const lnk = 'https://songapi.uppriez.net/' + audioSrc;
    // Update isPlaying state based on audio play and pause
    // HLS.js integration for non-native support
    useEffect(() => {
        if (Hls.isSupported() && audioRef.current) {
            const hls = new Hls();
            hls.loadSource(lnk);
            hls.attachMedia(audioRef.current);
        }
    }, [audioSrc]);

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

    // Play/Pause handling
    useEffect(() => {
        const playAudio = async () => {
            if (audioSrc && audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (e) {
                    console.error("Auto-play failed", e);
                    setIsPlaying(false); // Handle auto-play policy
                }
            }
        };

        if (isPlaying) {
            playAudio();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, audioSrc]);

    const togglePlayPause = () => setIsPlaying(!isPlaying);

    // Volume handling
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
    console.log(lnk)
    return (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-[#2a203acc] border-t border-[#554175] p-4 flex items-center justify-between text-white">
            {/* Play/Pause & Track Info (Left) */}
            <div className="flex items-center space-x-4 md:pr-32">
                <button onClick={togglePlayPause} className="mr-4 active:scale-75 duration-200">
                    {isPlaying ? (
                        <PauseIcon />
                    ) : (
                        <PlayIcon />
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

            <audio ref={audioRef} src={!Hls.isSupported() ? lnk : undefined} onEnded={() => setIsPlaying(false)} />
        </div>
    );
}

export default AudioPlayer;

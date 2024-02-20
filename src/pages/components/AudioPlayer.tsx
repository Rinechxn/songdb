// ./components/AudioPlayer.tsx
import { useEffect, useRef } from 'react';
import { useAudio } from '../../libs/AudioContext';
import { useState } from 'react';
import VolIcon from './icns/volumeicon';
import MuteIcon from './icns/muteicon';
import PlayIcon from './icns/playicon';
import PauseIcon from './icns/pauseicon';
import Hls from 'hls.js';

interface PlayerState {
    playing: boolean,
    time: number,
    duration: number
}

const AudioPlayer: React.FC = () => {
    const { audioSrc, fileDetails, setAudioSrc } = useAudio();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [st, sest] = useState(0)
    const [volume, setVolume] = useState<number>(1); // Volume state, 1 as 100%
    const [playerState, setPlayerState] = useState<PlayerState>({
        playing: false,
        time: -1,
        duration: -1
    })
    const lnk = 'https://songapi.uppriez.net/' + audioSrc;
    // Handle time update and metadata loaded
    useEffect(() => {
        if (audioSrc.length > 0) {
            reset()
            if (Hls.isSupported() && audioRef.current) {
                const hls = new Hls();
                hls.loadSource(lnk);
                hls.attachMedia(audioRef.current);
            }
        }
    }, [audioSrc]);

    useEffect(() => {
        if (st >= 20) {
            document.querySelector("html")?.classList.add("e")
        }
    }, [st])

    function togglePlayPause() {
        if (!audioRef.current!.paused) {
            audioRef.current!.pause()
        } else {
            audioRef.current!.play()
        }
        setPlayerState({ ...playerState, playing: !audioRef.current?.paused as boolean })
    }

    function reset() {
        setPlayerState({
            playing: false,
            time: -1,
            duration: -1
        })
        setAudioSrc("")
    }

    // Volume handling
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Convert seconds into MM:SS format
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    return (
        <div className="flex-col items-stretch fixed bottom-0 left-0 right-0 backdrop-blur-md bg-[#1a1a1af5] border-t border-[#646464bb] p-4 flex lg:flex-row lg:items-center justify-center text-white">
            {/* Play/Pause & Track Info (Left) */}
            <div className="flex items-center space-x-4 md:pr-32">
                <button disabled={!(playerState.duration > 0)} onClick={() => { togglePlayPause(); sest(st + 1); }} className="mr-4 active:scale-75 duration-200">
                    {playerState.playing ? (
                        <PauseIcon />
                    ) : (
                        <PlayIcon />
                    )}
                </button>
                <div className="flex flex-col min-w-0 max-w-48">
                    {playerState.duration > 0 ? <span className="text-[10px] font-semibold truncate uppercase" title="Now Playing">Now Playing</span> : null}
                    <span className="text-sm truncate" title={fileDetails.fileName}>{fileDetails.fileName}</span>
                </div>
            </div>

            {/* Seek Slider (Center, hidden on small screens) */}
            <div className="mt-5 lg:mt-0 flex flex-1 items-center px-4 justify-center">
                <div className="w-full flex flex-row items-center space-x-4 max-w-[600px]">
                    <div className="text-base text-right whitespace-nowrap">{playerState.duration > 0 ? formatTime(playerState.time) : "--:--"}</div>
                    <input
                        type="range"
                        min={0}
                        max={playerState.duration}
                        value={playerState.time}
                        onChange={(val) => audioRef.current!.currentTime = parseInt(val.target.value)}
                        disabled={!(playerState.duration > 0)}
                        className="md:flex w-full lg:min-w-[300px] ui-slider"
                    />
                    <div className="text-base text-left whitespace-nowrap opacity-50">{playerState.duration > 0 ? formatTime(playerState.duration) : "--:--"}</div>
                </div>
            </div>

            {/* Volume Control (Right) */}
            <div className="hidden lg:flex items-center space-x-2 pl-32">
                {volume === 0 ? <MuteIcon /> : <VolIcon />}
                <input
                    type="range"
                    min={0}
                    max={1}
                    step="0.01"
                    value={volume}
                    onChange={(evt) => setVolume(evt.target.valueAsNumber)}
                    className="w-24 ui-slider"
                />
            </div>

            <audio ref={audioRef} src={!Hls.isSupported() ? lnk : undefined}
                onPause={(evt) => setPlayerState({ ...playerState, playing: false })}
                onPlay={(evt) => setPlayerState({ ...playerState, playing: true })}
                onTimeUpdate={(evt) => setPlayerState({ ...playerState, time: evt.currentTarget.currentTime })}
                onLoadedMetadata={(evt) => {
                    setPlayerState({ ...playerState, playing: true, duration: evt.currentTarget.duration })
                    evt.currentTarget.play()
                }}
                onEnded={reset}
            />
        </div>
    );
}

export default AudioPlayer;

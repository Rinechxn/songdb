// @/components/AudioPlayer.tsx
import { useEffect, useRef } from 'react';
import { useAudio } from '@/libs/AudioContext';
import { useState } from 'react';
import VolIcon from './icons/volumeicon';
import MuteIcon from './icons/muteicon';
import PlayIcon from './icons/playicon';
import PauseIcon from './icons/pauseicon';
import RepeatIcon from './icons/repeaticon';
import RepeatOneIcon from './icons/repeatoneicon';
// import SkipLeftIcon from './icons/skipleft';
// import SkipRightIcon from './icons/skipright';
// import ShuffleIcon from './icons/shuffleicon';
import WaveFormIcon from "./icons/waveformicon";
import Hls from 'hls.js';

interface PlayerState {
    playing: boolean,
    time: number,
    duration: number
}

enum RepeatMode {
    None,
    RepeatAll,
    RepeatOne,
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
    const [repeatMode, setRepeatMode] = useState<RepeatMode>(RepeatMode.None);
    // const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');

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

    function reset(repeat: boolean = false) {
        if (repeat) {
            audioRef.current!.currentTime = 0;
            audioRef.current!.play();
            setPlayerState(prevState => ({
                ...prevState,
                playing: true,
                time: 0, // Reset time to 0 when repeating
            }));
        } else {
            setAudioSrc("");
            setPlayerState({
                playing: false,
                time: -1,
                duration: -1,
            });
        }
    }

    function handlePrevTrack() {

        console.log('Previous track');
        // Example: setAudioSrc(prevTrackSrc);
    }

    // Placeholder for next track handler
    function handleNextTrack() {

        console.log('Next track');
        // Example: setAudioSrc(nextTrackSrc);
    }

    function handleRepeatClick() {
        setRepeatMode((prevMode) => {
            const newMode = (prevMode + 1) % 3;

            // Update tooltip content based on the new repeat mode
            const repeatMessages = ["Repeat Off", "Repeat All", "Repeat One"];
            setTooltipContent(repeatMessages[newMode]);

            // Show tooltip and hide it after 3 seconds
            setTooltipVisible(true);
            setTimeout(() => setTooltipVisible(false), 3000);

            return newMode;
        });
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
        <div className="flex-col items-stretch pb-16 lg:pb-4 fixed bottom-0 left-0 right-0 backdrop-blur-md bg-[#1a1a1af5] border-t border-[#303030bb] p-4 flex lg:flex-row lg:items-center justify-center text-white">
            {/* Play/Pause & Track Info (Left) */}
            <div className="flex items-center flex-col lg:flex-row">
                <div className="flex items-center space-x-4 md:pr-4 pb-4 lg:pb-0">
                    {/* <button className='active:scale-75 duration-200 w-7'>
                        <SkipLeftIcon />
                    </button> */}
                    <button disabled={!(playerState.duration > 0)} onClick={() => { togglePlayPause(); sest(st + 1); }} className="mr-4 active:scale-75 duration-200">
                        {playerState.playing ? (
                            <PauseIcon />
                        ) : (
                            <PlayIcon />
                        )}
                    </button>

                    {/* Repeat Button (Repeat off / Repeat On / Repeat one /) */}
                    <div className=" relative flex items-center">
                        <button onClick={handleRepeatClick} className={`mr-1 active:scale-75 duration-200 w-5 ${repeatMode === RepeatMode.None ? 'opacity-50' : ''}`}>
                            {repeatMode === RepeatMode.RepeatAll ? <RepeatIcon /> : repeatMode === RepeatMode.RepeatOne ? <RepeatOneIcon /> : <RepeatIcon />}
                        </button>
                        <div className={`absolute -mt-16 w-auto duration-150 bg-black text-white p-2 rounded shadow-lg text-xs ${tooltipVisible ? '' : 'hidden'}`}>
                            {tooltipContent}
                        </div>
                    </div>
{/* 
                    <button className=' active:scale-75 duration-200 w-6'>
                        <ShuffleIcon />
                    </button>

                    <button className=' active:scale-75 duration-200 w-7'>
                        <SkipRightIcon />
                    </button> */}
                </div>

                <div className='flex space-x-2' >
                    {playerState.duration > 0 ? <WaveFormIcon /> : null}
                    <div className="flex flex-col  min-w-0 max-w-72">
                        {playerState.duration > 0 ? <span className="text-[10px] font-semibold truncate uppercase" title="Now Playing">Now Playing</span> : null}
                        {playerState.duration > 0 ? <span className="text-sm truncate" title={fileDetails.fileName}>{fileDetails.trackName}</span> : null}
                        
                    </div>
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
                onEnded={() => reset(repeatMode === RepeatMode.RepeatOne)}
            />
        </div>
    );
}

export default AudioPlayer;

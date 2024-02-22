import { useEffect, useRef } from 'react';
import { useAudio } from '@/libs/AudioContext';
import { useState } from 'react';
import VolIcon from './icns/volumeicon';
import MuteIcon from './icns/muteicon';
import PlayIcon from './icns/playicon';
import PauseIcon from './icns/pauseicon';
import RepeatIcon from './icns/repeaticon';
import RepeatOneIcon from './icns/repeatoneicon';
import SkipLeftIcon from './icns/skipleft';
import SkipRightIcon from './icns/skipright';
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


const PlayerScreen: React.FC = () => {
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
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
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
        <>

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

            <div className="flex items-center justify-center space-x-4 pt-8">
                <button onClick={handlePrevTrack} className='active:scale-75 duration-200 w-7'>
                    <SkipLeftIcon />
                </button>
                <button disabled={!(playerState.duration > 0)} onClick={() => { togglePlayPause(); sest(st + 1); }} className="mr-4 active:scale-75 duration-200">
                    {playerState.playing ? (
                        <PauseIcon />
                    ) : (
                        <PlayIcon />
                    )}
                </button>

                {/* Repeat Button (Repeat off / Repeat On / Repeat one /) */}
                <div className="relative flex items-center">
                    <button onClick={handleRepeatClick} className={`active:scale-75 duration-200 w-5 ${repeatMode === RepeatMode.None ? 'opacity-50' : ''}`}>
                        {repeatMode === RepeatMode.RepeatAll ? <RepeatIcon /> : repeatMode === RepeatMode.RepeatOne ? <RepeatOneIcon /> : <RepeatIcon />}
                    </button>
                    <div className={`absolute -mt-16 w-auto duration-150 bg-black text-white p-2 rounded shadow-lg text-xs ${tooltipVisible ? '' : 'hidden'}`}>
                        {tooltipContent}
                    </div>
                </div>


                <button onClick={handleNextTrack} className='mr-4 active:scale-75 duration-200 w-7'>
                    <SkipRightIcon />
                </button>

            </div>

            {/* Volume Control (Right) */}
            <div className='flex items-center justify-center pt-8 w-full'>
                <div className="w-64 flex items-center justify-center space-x-2 ">
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
            </div>

        </>
    );
}

export default PlayerScreen;
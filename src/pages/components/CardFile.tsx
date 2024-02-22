// /components/CardFile.tsx
import React, { useEffect, useState } from 'react';
import bytesToSize from "@/utils/bytetosize";
import WaveFormIcon from "./icns/waveformicon";
import DownloadButton from "./icns/downloadbtn";
import StarIcon from './icns/star'
import LoadScreen from "./LoadingScreen";
import { useAudio } from '@/libs/AudioContext';
import { useDownload } from '@/libs/DownloadContext';
import PlaySolidIcon from './icns/playsolid';

interface CardFileProps {
    data?: {
        file_name: string;
        track_name: string;
        file_path: string;
        unique_id: string;
        size: number;
        duration: string;
    };
}

const CardFile: React.FC<CardFileProps> = ({ data }) => {
    const { setAudioSrc, setFileDetails, fileDetails } = useAudio();
    const { startDownload, finishDownload } = useDownload();
    const [updatedFav, setUpdatedFav] = useState(false)
    const apisrc = 'https://' + process.env.NEXT_PUBLIC_DB_API
    if (!data) {
        return <LoadScreen />; // Fixed component name
    }

    function updateFav(data: CardFileProps['data']) {
        if (typeof window !== "undefined" && data) { // Check if data is not undefined
            const favorite = localStorage.getItem("favorite");
            const parsed = favorite ? JSON.parse(favorite) : {};
            localStorage.setItem("favorite", JSON.stringify({
                ...parsed,
                [data.unique_id]: parsed[data.unique_id] ? !parsed[data.unique_id] : true
            }));
            setUpdatedFav(JSON.parse(localStorage.getItem("favorite")!)[data.unique_id]);
        }
    }
    

    useEffect(() => {
        if (typeof window !== "undefined") {
            const parsed = JSON.parse(localStorage.getItem("favorite")!)
            setUpdatedFav(parsed[data.unique_id])
        }
    }, [data, updatedFav])

    // const { playAudio } = useAudio();
    const handlePlay = () => {
        const hlsStreamUrl = 'streaming/' + data.unique_id + '/manifest.m3u8';
        setAudioSrc(hlsStreamUrl);
        setFileDetails({ fileName: data.file_name, filePath: data.file_path, trackName: data.track_name });
        // setIsPlaying(true); // Update playing status
    };

    const handleDownloadClick = async () => {
        if (!data) return;

        // Mark the start of the download
        startDownload(data.file_name, data.size);

        const fileUrl = apisrc + '/audiodownload/wav_formats/' + data.file_name;
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = data.file_name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);

            // Since we can't track progress, immediately mark the download as finished
            finishDownload();
        } catch (error) {
            // console.error('Download failed:', error);
            // Handle download error
            finishDownload(); // Ensure to call finishDownload even if an error occurs
        }
    };

    // Convert seconds into MM:SS format
    const formatTime = (timeString: string) => {
        const time = parseFloat(timeString); // Convert string to float
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>

            <section className="p-4 bg-[#1a1a1a] hover:bg-[#646464] duration-150 border border-y border-x-0 border-[#555555] flex items-center justify-between space-x-3">
                <button onClick={handlePlay} >
                    <div className="flex items-center space-x-2">
                        <div  className=''>
                            {fileDetails.fileName == data.file_name ? <WaveFormIcon /> : <PlaySolidIcon/>}
                        </div>
                        <div className="flex flex-col justify-start min-w-0 max-w-[12rem] md:max-w-[29rem] lg:max-w-[32rem] xl:max-w-full">
                            <p className="text-left truncate font-medium ">{fileDetails.fileName == data.file_name ? <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 pe-2 rounded dark:bg-green-900 dark:text-green-300 animate-pulse">Playing</span> : null}{data.track_name}</p>
                            <p className="text-left text-sm text-white/40 truncate">{data.file_path}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 text-sm pt-2">
                        <p>Size: {bytesToSize(data.size)}</p>
                        <p>Duration: {formatTime(data.duration)}</p>
                    </div>
                </button>

                <div className='flex space-x-3'>
                    <button onClick={() => data && updateFav(data)} className="flex"> {/* Use onClick with custom handler */}
                        <div className="bg-white p-2 rounded-full hover:opacity-40 duration-150">
                            {!updatedFav ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d2691e" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                            </svg>}
                        </div>
                    </button>
                    <button onClick={handleDownloadClick} className="flex"> {/* Use onClick with custom handler */}
                        <DownloadButton />
                    </button>
                </div>
            </section>
        </>
    );
};

export default CardFile;

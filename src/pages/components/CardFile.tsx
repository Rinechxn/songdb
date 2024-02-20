// /components/CardFile.tsx
import React from 'react';
import bytesToSize from "@/utils/bytetosize";
import WaveFormIcon from "./icns/waveformicon";
import DownloadButton from "./icns/downloadbtn";
import LoadScreen from "./loading";
import { useAudio } from '../../libs/AudioContext';
import { useDownload } from '../../libs/DownloadContext';

interface CardFileProps {
    data?: {
        file_name: string;
        file_path: string;
        unique_id: string;
        size: number;
        duration: string;
    };
}

const CardFile: React.FC<CardFileProps> = ({ data }) => {
    const { setAudioSrc, setFileDetails } = useAudio();
    const { startDownload, finishDownload } = useDownload();
    const apisrc = 'https://' + process.env.NEXT_PUBLIC_DB_API 
    if (!data) {
        return <LoadScreen />; // Fixed component name
    }
    // const { playAudio } = useAudio();
    const handlePlay = () => {
        // Construct the HLS stream URL using the unique_id
        const hlsStreamUrl = 'streaming/' + data.unique_id + '/manifest.m3u8';
    
        // Set the audio source URL to the HLS stream path
        setAudioSrc(hlsStreamUrl);
    
        // Update file details for display
        setFileDetails({ fileName: data.file_name, filePath: data.file_path });
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
            console.error('Download failed:', error);
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

            <section className="p-4 bg-[#2a203a] hover:bg-[#554175] duration-150 border border-y border-x-0 border-[#554175] flex items-center justify-between space-x-3">
                <button onClick={handlePlay}>

                    <div className="flex items-center space-x-2">
                        <div>
                            <WaveFormIcon />
                        </div>
                        <div className="flex flex-col justify-start min-w-0 max-w-[17rem] lg:max-w-[36rem] xl:max-w-full">
                            <p className="text-left truncate font-medium">{data.file_name}</p>
                            <p className="text-left text-sm text-white/40 truncate">{data.file_path}</p>
                        </div>
                    </div>


                    <div className="flex space-x-2 text-sm pt-2">
                        <p>Size: {bytesToSize(data.size)}</p>
                        <p>Duration: {formatTime(data.duration)}</p>
                    </div>
                </button>

                <button onClick={handleDownloadClick} className="flex"> {/* Use onClick with custom handler */}
                    <DownloadButton />
                </button>
            </section>
        </>
    );
};

export default CardFile;

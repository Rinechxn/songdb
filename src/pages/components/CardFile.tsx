// /components/CardFile.tsx
import React from 'react';
import bytesToSize from "@/utils/bytetosize";
import WaveFormIcon from "./icns/waveformicon";
import DownloadButton from "./icns/downloadbtn";
import LoadScreen from "./loading";
import { useAudio } from '../../libs/AudioContext';

interface CardFileProps {
    data?: {
        file_name: string;
        file_path: string;
        size: number;
        duration: string;
    };
}

const CardFile: React.FC<CardFileProps> = ({ data }) => {
    const { setAudioSrc, setFileDetails } = useAudio();
    if (!data) {
        return <LoadScreen />; // Fixed component name
    }
    // const { playAudio } = useAudio();
    const handlePlay = () => {
        setAudioSrc(data.file_path); // Assuming this sets the actual audio source URL
        setFileDetails({ fileName: data.file_name, filePath: data.file_path });
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

                <a href={`https://sdbbeta.uppriez.net/${data.file_path}`} download={data.file_name} target='about:blank' className="flex">
                    <DownloadButton />
                </a>
            </section>
        </>
    );
};

export default CardFile;

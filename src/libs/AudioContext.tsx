import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
    audioSrc: string;
    fileDetails: {
        fileName: string;
        filePath: string;
    };
    setAudioSrc: (src: string) => void;
    setFileDetails: (details: { fileName: string; filePath: string }) => void;
 
  
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
    children: ReactNode;
}



export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
    const [audioSrc, setAudioSrc] = useState('');
    const [fileDetails, setFileDetails] = useState({ fileName: '', filePath: '' });
    console.log(fileDetails, audioSrc)
    const value = {
        audioSrc,
        fileDetails,
        setAudioSrc,
        setFileDetails,
    };
    const [volume, setVolume] = useState(1); // Default volume is 100%
    const [isMuted, setIsMuted] = useState(false); // Track mute state

    const toggleMute = () => {
        setIsMuted(!isMuted);
        setVolume(isMuted ? 1 : 0); // Toggle volume between 0 and 1
    };

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

// Hook for easy context consumption
export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};

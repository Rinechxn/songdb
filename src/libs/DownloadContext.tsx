// /libs/DownloadContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DownloadContextType {
    progress: number;
    fileSize: number; // Add file size here
    fileName: string;
    isDownloading: boolean;
    startDownload: (fileName: string, fileSize: number) => void;
    updateProgress: (progress: number) => void;
    finishDownload: () => void;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export const DownloadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState(0);
    const [fileSize, setFileSize] = useState(0); // State for file size
    const [fileName, setFileName] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);

    const startDownload = (fileName: string, fileSize: number) => {
        setIsDownloading(true);
        setFileName(fileName);
        setFileSize(fileSize); // Set the file size when download starts
        setProgress(0); // Optionally reset progress here
    };

    const updateProgress = (progress: number) => {
        console.log(`Updating progress: ${progress}%`);
        setProgress(progress);
    };

    const finishDownload = () => {
        setIsDownloading(false);
        setProgress(0);
        setFileName('');
        setFileSize(0); // Optionally reset file size here
    };

    return (
        <DownloadContext.Provider value={{ progress, fileSize, fileName, isDownloading, startDownload, updateProgress, finishDownload }}>
            {children}
        </DownloadContext.Provider>
    );
};

export const useDownload = () => {
    const context = useContext(DownloadContext);
    if (context === undefined) {
        throw new Error('useDownload must be used within a DownloadProvider');
    }
    return context;
};

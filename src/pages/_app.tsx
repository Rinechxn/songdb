// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "./components/Nav";
import AudioPlayer from "./components/AudioPlayer";
import Sidebar from "./components/Sidebar";
import DownloadStatus from "./components/DownloadStatus";
import { motion, AnimatePresence } from 'framer-motion';
import { AudioProvider } from '../libs/AudioContext';
import { ErrorProvider } from "@/libs/ErrorContext";
import ErrorDisplay from "./components/ErrorDisplay";
import { DownloadProvider, useDownload } from "@/libs/DownloadContext"; // Ensure correct import path for useDownload



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorProvider>
      <AudioProvider>
        <DownloadProvider>
          <ErrorDisplay/>
          <Nav />
          <div className="flex">
            <Sidebar />
            <div className="lg:pl-[318px] min-h-screen flex-1 overflow-x-auto"> {/* Adjust `ml-64` based on the sidebar's width */}
              <Component {...pageProps} />
            </div>
          </div>
          <PlayerOrStatus />
        </DownloadProvider>
      </AudioProvider>
    </ErrorProvider>

  );
}

const PlayerOrStatus = () => {
  const { isDownloading } = useDownload();

  return (
    <AnimatePresence>
      {isDownloading ? (
        <motion.div
          key="downloadStatus"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <DownloadStatus />
        </motion.div>
      ) : (
        <motion.div
          key="audioPlayer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <AudioPlayer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

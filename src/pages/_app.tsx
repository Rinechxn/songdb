// _app.tsx
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Nav from "@/components/Nav/Nav";
import AudioPlayer from "@/components/AudioPlayer";
import Sidebar from "@/components/Nav/Sidebar";
import DownloadStatus from "@/components/DownloadStatus";
import { motion, AnimatePresence } from 'framer-motion';
import { AudioProvider } from '@/libs/AudioContext';
import { ErrorProvider } from "@/libs/ErrorContext";
import ErrorDisplay from "@/components/ErrorDisplay";
import { DownloadProvider, useDownload } from "@/libs/DownloadContext";
import { GeistFont, LineSeedSansTH, InterFont } from "../assets/fonts"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorProvider>
      <AudioProvider>
        <DownloadProvider>
          <ErrorDisplay />
          <div className={`${InterFont.variable} ${LineSeedSansTH.variable} font-sans`}>
            <div className="flex">
              <Sidebar />
              <div className="lg:pl-[318px] min-h-screen flex-1 overflow-x-auto"> {/* Adjust `ml-64` based on the sidebar's width */}
                <Component {...pageProps} />
              </div>
            </div>
            <div>
              <PlayerOrStatus />
            </div>
            <div>
              <Nav />
            </div>
          </div>
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
          transition={{ duration: 0.125, ease: "easeInOut" }}
        >
          <DownloadStatus />
        </motion.div>
      ) : (
        <motion.div
          key="audioPlayer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.125, ease: "easeInOut" }}
        >
          <AudioPlayer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

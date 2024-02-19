import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "./components/Nav";
import AudioPlayer from "./components/AudioPlayer";
import Sidebar from "./components/Sidebar";
import DownloadStatus from "./components/DownloadStatus";
import { motion } from 'framer-motion'
import { AudioProvider } from '../libs/AudioContext';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AudioProvider>
        <Nav />
        <div className="flex">
          <Sidebar />
          <div className="lg:pl-[318px] min-h-screen flex-1  overflow-x-auto"> {/* Adjust `ml-64` based on the sidebar's width */}
            <Component {...pageProps} />
          </div>
        </div>
        <AudioPlayer />
        {/* <DownloadStatus /> */}
      </AudioProvider>
    </>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "./components/Nav";
import AudioPlayer from "./components/AudioPlayer";
import Sidebar from "./components/Sidebar";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <div className="flex">
        <Sidebar />
        <div className="lg:pl-[318px] min-h-screen flex-1  overflow-x-auto"> {/* Adjust `ml-64` based on the sidebar's width */}
          <Component {...pageProps} />
        </div>
      </div>
      {/* <AudioPlayer /> */}
    </>
  );
}

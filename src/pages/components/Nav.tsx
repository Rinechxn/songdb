import Link from "next/link";
import DiscordIcon from "./icns/discord";
import BugIcon from "./icns/bugicon";
import GithubIcon from "./icns/ghicon";
// import VolIcon from "./icns/volumeicon";
// import MuteIcon from "./icns/muteicon";
import HomeIcon from "./icns/homeicon";
// import { useAudio } from './Audio/AudioContext';
function Nav() {
    // const { isMuted, toggleMute } = useAudio();
    return (
        <>
            <nav className="fixed lg:hidden flex items-center justify-between w-screen p-4">
                <div className=" bg-[#31215c]/50 border border-[#472f66] backdrop-blur-lg rounded-full px-4 py-1 flex  items-center justify-center space-x-4">
                    <Link href={"/"}>
                        <div className="w-6 h-6 fill-white">
                            <HomeIcon />
                        </div>
                    </Link>
                    <Link href="https://discord.gg/Ab6Akh8rQq" target="_blank" className="flex space-x-2 py-2 items-center">
                        <div className="w-6 h-6 mt-1 fill-white">
                            <DiscordIcon />
                        </div>
                    </Link>
                    <Link href="https://github.com/Rinechxn/songdb/issues" target="_blank" className="flex space-x-2 py-2 items-center">
                        <div className="w-6 h-6 fill-white">
                            <BugIcon />
                        </div>
                    </Link>
                    <Link href="https://github.com/Rinechxn/songdb" target="_blank" className="flex space-x-2 py-2 items-center">
                        <div className="w-6 h-6 fill-white">
                            <GithubIcon />
                        </div>
                    </Link>

                </div>
                {/* <div className="bg-[#31215c]/50 border border-[#472f66] backdrop-blur-lg rounded-full px-4 py-1 flex items-center justify-center space-x-4 active:scale-75 duration-100">
                    <button onClick={toggleMute} className="p-2">
                        {isMuted ? <MuteIcon /> : <VolIcon />}
                    </button>
                </div> */}
            </nav>
        </>
    );
}

export default Nav;
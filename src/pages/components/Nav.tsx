import Link from "next/link";
import DiscordIcon from "./icns/discord";
import BugIcon from "./icns/bugicon";
import GithubIcon from "./icns/ghicon";
import StarIcon from "./icns/star";
import HomeIcon from "./icns/homeicon";

function Nav() {

    return (
        <>
            <nav className="fixed lg:hidden bottom-0 left-0 right-0 flex items-center justify-between w-screen">
                <div className="  w-full  px-4 py-1 flex  items-center justify-center space-x-8">

                    <Link href={"/"} className="flex flex-col py-2 items-center justify-center opacity-80 duration-150 hover:opacity-100">
                        <div className="w-6 h-6 fill-white">
                            <StarIcon />
                        </div>
                        <b className="text-[10px]">Favorites</b>
                    </Link>
                    <Link href="https://discord.gg/Ab6Akh8rQq" target="_blank" className="flex flex-col py-2 items-center justify-center opacity-80 duration-150 hover:opacity-100">
                        <div className="w-6 h-6  fill-white">
                            <DiscordIcon />
                        </div>
                        <b className="text-[10px]">Discord</b>
                    </Link>
                    <Link href={"/"} className="flex flex-col py-2 items-center justify-center opacity-80 duration-150 hover:opacity-100">
                        <div className="w-6 h-6 fill-white">
                            <HomeIcon />
                        </div>
                        <b className="text-[10px]">Home</b>
                    </Link>
                    <Link href="https://github.com/Rinechxn/songdb/issues" target="_blank" className="flex flex-col py-2 items-center justify-center opacity-80 duration-150 hover:opacity-100">
                        <div className="w-6 h-6 fill-white">
                            <BugIcon />
                        </div>
                        <b className="text-[10px]">Report Bug</b>
                    </Link>
                    <Link href="https://github.com/Rinechxn/songdb" target="_blank" className="flex flex-col py-2 items-center justify-center opacity-80 duration-150 hover:opacity-100">
                        <div className="w-6 h-6 fill-white">
                            <GithubIcon />
                        </div>
                        <b className="text-[10px]">Github</b>
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
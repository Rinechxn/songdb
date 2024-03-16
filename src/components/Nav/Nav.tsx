import Link from "next/link";
import { NavItems } from "@/assets/data/nav";

function Nav() {

    return (
        <>
            <nav className="fixed lg:hidden bottom-0 left-0 right-0 flex items-center justify-between w-screen">
                <div className="  w-full  px-4 py-1 flex  items-center justify-center space-x-8">
                    {NavItems.map((v) => (
                        <Link href={v.path} target="_blank" className="flex flex-col py-2 items-center justify-center opacity-80 duration-150 hover:opacity-100 w-full">
                            <div className="w-6 h-6 fill-white">
                                <v.icon />
                            </div>
                            <b className="text-[10px]">{v.name}</b>
                        </Link>
                    ))}
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
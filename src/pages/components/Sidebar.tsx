import Link from "next/link";
import HomeIcon from "./icns/homeicon";
import DiscordIcon from "./icns/discord";

function Sidebar() {
    return (
        <div className="hidden p-6 lg:flex fixed top-0 left-0 h-screen bg-[#1e1922] border-r-2 border-[#0b090c] w-64">
            <div className="flex flex-col">
                <Link href="#" className="flex space-x-2 py-2 items-center">
                    <div>
                        <HomeIcon />
                    </div>
                    <b>Home</b>
                </Link>
                <Link href="https://discord.gg/Ab6Akh8rQq" target="_blank" className="flex space-x-2 py-2 items-center">
                    <div className="w-6 h-6 mt-1 fill-white">
                        <DiscordIcon />
                    </div>
                    <b>Discord Community</b>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
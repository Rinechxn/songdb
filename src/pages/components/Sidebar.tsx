import Link from "next/link";
import HomeIcon from "./icns/homeicon";
import DiscordIcon from "./icns/discord";
import SearchIcon from "./icns/searchicon";
import BugIcon from "./icns/bugicon";
import GithubIcon from "./icns/ghicon";
import appdata from '../../../package.json'
function Sidebar() {
    return (
        <div className="hidden p-4 lg:flex fixed top-0 left-0 h-screen bg-[#1e1922] border-r-2 border-[#0b090c] w-auto">
            <div className="flex flex-col">
                <form action="" className="pb-4 flex items-center space-x-1">
                    <input type="text" className="placeholder:text-white/50 rounded-full p-2 bg-[#0e0a11]" placeholder="Search.." />
                    <button className="p-2 bg-[#fff] rounded-full">
                        <SearchIcon />
                    </button>
                </form>
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
                <Link href="https://github.com/Rinechxn/songdb/issues" target="_blank" className="flex space-x-2 py-2 items-center">
                    <div className="w-6 h-6 fill-white">
                        <BugIcon />
                    </div>
                    <b>Bug Report</b>
                </Link>
                <Link href="https://github.com/Rinechxn/songdb" target="_blank" className="flex space-x-2 py-2 items-center">
                    <div className="w-6 h-6 fill-white">
                        <GithubIcon />
                    </div>
                    <b>View on GitHub</b>
                </Link>
                <br />
                {/* <Link href={'/'} className="p-2 bg-[#2a1c3a] rounded-full flex items-center justify-center">
                    <p>Login with StageHub Accounts</p>
                </Link> */}
                <div className="text-[12px] text-white/30">
                    <b>Powered By Uppriez Development</b>
                    <p>Version {appdata.version}</p>
                    <p>Next.js Version {appdata.dependencies.next}</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
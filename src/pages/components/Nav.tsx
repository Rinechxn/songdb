import Link from "next/link";
import DiscordIcon from "./icns/discord";
import BugIcon from "./icns/bugicon";
import GithubIcon from "./icns/ghicon";

function Nav() {
    return (
        <>
            <nav className="fixed lg:hidden m-4">
                <div className=" bg-[#31215c]/50 border border-[#472f66] backdrop-blur-lg rounded-full px-4 py-1 flex  items-center justify-center space-x-4">
                    <Link href={"/"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
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
            </nav>
        </>
    );
}

export default Nav;
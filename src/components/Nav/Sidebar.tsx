'use client'
import Link from "next/link";
import { AboutVersion } from "@/assets/data/packageversion";
import { NavItems } from "@/assets/data/nav";
function Sidebar() {
    return (
        <div className="hidden p-8 lg:flex fixed top-0 left-0 h-screen bg-[#0c0c0c] border-r-2 border-[#000000] w-[320px]">
            <div className="flex flex-col">
                {NavItems.map((v) => (
                    <Link href={v.path} target="_blank" className={`flex space-x-2 px-2 py-2 w-full rounded-lg items-center duration-100 hover:bg-white/40`}>
                        <div>
                            <v.icon />
                        </div>
                        <p>{v.name}</p>
                    </Link>
                ))}
                <br />
                <div className="text-[12px] text-white/30">
                    <b>Powered By Uppriez Development</b>
                    <p>Version {AboutVersion.version}</p>
                    <p>Next.js Version {AboutVersion.nextVersion}</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
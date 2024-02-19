// /components/CardFile.tsx
import bytesToSize from "@/utils/bytetosize";
import WaveFormIcon from "./icns/waveformicon";
import DownloadButton from "./icns/downloadbtn";

function CardFile({ data }: any) {
    if (!data) {
        // Optionally, return null or some placeholder to indicate that 'data' is not available
        return (
            <>
                <section className="p-4  bg-[#2a203a] border border-y border-x-0 border-[#554175] flex items-center justify-center space-x-3">
                    <b>Loading....</b>
                </section>
            </>
        );
    }
    return (
        <>
            <section className="p-4  bg-[#2a203a] border border-y border-x-0 border-[#554175] flex items-center justify-between space-x-3">
                <div className="">
                    <div className="flex items-center space-x-2">
                        <WaveFormIcon />
                        <div className="flex flex-col min-w-32 max-w-[14rem] lg:max-w-full -space-y-1">
                            <b className="truncate">{data.file_name}</b>
                            <p className="text-sm text-white/40 truncate">{data.file_path}</p>
                        </div>


                    </div>
                    <div className="flex space-x-2 text-sm pt-2">
                        <p>Size: {bytesToSize(data.size)}</p>
                        <p>Duration: {data.duration}</p>
                    </div>
                </div>
                <a href={"https://sdbbeta.uppriez.net/" + data.file_path}>
                    <DownloadButton/>
                </a>
            </section>
        </>
    );
}

export default CardFile;
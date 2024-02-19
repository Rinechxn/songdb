function DownloadStatus() {
    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-[#2a203acc] border border-t border-b-0 border-x-0 border-[#554175] p-4 flex flex-col  justify-center text-white">
                <div className="flex items-end justify-between w-full lg:w-64">
                    <div className="flex flex-col -space-y-1">
                        <b className="text-sm">Downloading....</b>
                        <p className="text-sm text-white/50">FIlename.wav</p>
                    </div>
                    <div>
                        <p className="text-sm">0.00 MB / 128.24 MB</p>
                    </div>
                </div>
                <div className="w-full lg:w-64">
                    <div className="h-1 w-full bg-[#554175]">
                        <div className="h-1 bg-[#ba8fff]" style={{ width: "1%" }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DownloadStatus;
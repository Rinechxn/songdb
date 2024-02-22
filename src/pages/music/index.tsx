
import Head from "next/head";
import BackButton from "../components/icns/backbutton";
import ShareIcon from "../components/icns/shareicon";
import PlayerScreen from "../components/PlayerScreen";

interface CoverImageProps {
    imageUrl: string;
}

function FileDownloads() {
    return (
        <>
            <Head>
                <title>StageHub Player - Test</title>
            </Head>
            <div className="p-4 w-screen h-screen flex items-center flex-col">
                <div className="fixed w-full px-4">
                    <div className="flex w-full items-center justify-between">
                        <button className=" p-2 ">
                            <BackButton />
                        </button>
                        <p>Audio Player</p>
                        <button className="p-2">
                            <ShareIcon />
                        </button>
                    </div>
                </div>
                <div className="pt-16 px-2">
                    <section className="relative rounded-lg overflow-hidden">
                        <img src="CoverTest.png" alt="" className="relative rounded-lg z-10" />
                    </section>
                    <div className=" flex flex-col pt-8 items-center justify-center">
                        <b className="text-2xl">Music Name</b>
                        <p className="text-white/50">Path</p>
                    </div>
                    <div>
                        <PlayerScreen />
                    </div>
                </div>
            </div>
        </>
    );
}

export default FileDownloads;
'use client'
import React, { useEffect, useState, lazy } from "react";
// import ReactDOMServer from 'react-dom/server';
import axios, { AxiosError, AxiosResponse } from 'axios';
const CardFile = lazy(() => import("./components/CardFile"));
const LoadScreen = lazy(() => import("./components/LoadingScreen"));
import Head from "next/head";
import SearchIcon from "./components/icns/searchicon";
import ShuffleIcon from "./components/icns/shuffleicon";
export interface ResponseData {
  message: "success" | "failed" | "บลา ๆๆ";
  data: Data[];
}

export interface Data {
  file_name: string;
  file_path: string;
  track_name: string;
  unique_id: string;
  size: number;
  duration: string;
}

export enum Format {
  WAV = "WAV",
  MP3 = "MP3",
  DSD = "DSD"
}

export default function Home() {
  const [data, setData] = useState<Data[]>()
  const [olddata, setOldData] = useState<Data[]>()
  const [error, setError] = useState<string | null>(null);
  const [favParsed, setFavParsed] = useState<{ [key: string]: boolean; }>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("favorite")) {
        localStorage.setItem("favorite", JSON.stringify({}))
      }
      if (!data && !error) { // Check for error state as well
        const url = 'https://' + process.env.NEXT_PUBLIC_DB_API as string;
        const apiroute = '/songs/wav_formats';
        const apiurl = url + apiroute;
        axios.get<unknown, AxiosResponse<ResponseData>>(apiurl)
          .then((res) => {
            setData(res.data.data);
            setOldData(res.data.data);
            res.data.data.forEach((dat) => {
              const parsed = JSON.parse(localStorage.getItem("favorite")!)
              if (!parsed[dat.unique_id]) {
                localStorage.setItem("favorite", JSON.stringify({
                  ...parsed,
                  [dat.unique_id]: false
                }))
                setFavParsed(JSON.parse(localStorage.getItem("favorite")!))
              }
            })
          })
          .catch((err: AxiosError) => {
            setError(err.message); // Set error message on catch
          });
      }
    }
  }, [data, error]);
  if (error) {
    // Render error state
    return (
      <div className="flex items-center justify-start w-full h-screen bg-[#0e0e0e] p-4">
        <div className="container mx-auto text-left w-[64rem]">
          <h1 className="text-3xl font-semibold text-red-500">An Error Occurred</h1>
          <p className="mt-4 text-lg text-white/60">We're sorry, something went wrong.</p>
          <div className="mt-6 bg-[#242424]">
            <p className="inline-block bg-black px-6 py-3 text-sm font-left text-white">
              Error Details:
            </p>
            <pre className="mt-2 text-sm text-left text-white  overflow-x-auto p-4">
              {JSON.stringify({ message: error }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return data ? (
    <>
      <Head>
        <title>NEIX's Song Databases</title>
        <meta
          name="NEIX's Song Databases"
          content="All stored audio files are accessible for all purposes and can be used immediately without the need to contact us."
        />
        <meta
          property="og:image"
          content="/seo.png"
        />
      </Head>

      <main className="py-32 w-full flex flex-col justify-center bg-[#252525]">
        <div className="p-4 py-8 flex flex-col  space-y-1">
          <b className="text-4xl">NEiX's Song Database</b>
          <p>
            All stored audio files are accessible for all purposes and can be used immediately without the need to contact us.</p>
        </div>
        <div className="pb-4 px-4 w-full flex items-center space-x-1">
          <form action="w-full">
            <input type="text" onInput={(evt) => {
              setData(olddata!.filter(v => {
                return v.file_name.toLowerCase().includes(evt.currentTarget.value.toLowerCase())
              }))
            }} className="placeholder:text-white/50 w-full outline-none rounded-full p-2 px-4 bg-[#181818]" placeholder="Search.." />

          </form>
          {/* <button className="p-2  fill-black rounded-full flex space-x-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6"><path d="M18 17.8832V16L23 19L18 22V19.9095C14.9224 19.4698 12.2513 17.4584 11.0029 14.5453L11 14.5386L10.9971 14.5453C9.57893 17.8544 6.32508 20 2.72483 20H2V18H2.72483C5.52503 18 8.05579 16.3312 9.15885 13.7574L9.91203 12L9.15885 10.2426C8.05579 7.66878 5.52503 6 2.72483 6H2V4H2.72483C6.32508 4 9.57893 6.14557 10.9971 9.45473L11 9.46141L11.0029 9.45473C12.2513 6.5416 14.9224 4.53022 18 4.09051V2L23 5L18 8V6.11684C15.7266 6.53763 13.7737 8.0667 12.8412 10.2426L12.088 12L12.8412 13.7574C13.7737 15.9333 15.7266 17.4624 18 17.8832Z"></path></svg>
            <p>Shuffle</p>
          </button> */}
        </div>

        <div className="flex flex-col -space-y-1">
          {data && data.sort((a: Data, b: Data) => {
            const av = typeof favParsed[a.unique_id] == "boolean" ? favParsed[a.unique_id] : false
            const bv = typeof favParsed[b.unique_id] == "boolean" ? favParsed[b.unique_id] : false
            return Number(bv) - Number(av)
          }).map((v: Data) => <>
            <CardFile data={v} />
          </>)}
        </div>
      </main>
    </>
  ) : (
    <>
      <LoadScreen />
    </>
  )
}


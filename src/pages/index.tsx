'use client'
import React, { useEffect, useState, lazy } from "react";
// import ReactDOMServer from 'react-dom/server';
import axios, { AxiosError, AxiosResponse } from 'axios';
const CardFile = lazy(() => import("./components/CardFile"));
const LoadScreen = lazy(() => import("./components/Loading"));
import Head from "next/head";
import SearchIcon from "./components/icns/searchicon";
export interface ResponseData {
  message: "success" | "failed" | "บลา ๆๆ";
  data: Data[];
}

export interface Data {
  file_name: string;
  file_path: string;
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
        <form action="" className="pb-4 px-4 flex items-center space-x-1">
          <input type="text" onInput={(evt) => {
            setData(olddata!.filter(v => {
              return v.file_name.toLowerCase().includes(evt.currentTarget.value.toLowerCase())
            }))
          }} className="placeholder:text-white/50 w-full rounded-full p-2 bg-[#181818]" placeholder="Search.." />
          {/* <button className="p-2 bg-[#fff] rounded-full">
            <SearchIcon />
          </button> */}
        </form>
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


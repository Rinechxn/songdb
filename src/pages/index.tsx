'use client'
import React, { useEffect, useState, lazy } from "react";
import ReactDOMServer from 'react-dom/server';
import axios, { AxiosError, AxiosResponse } from 'axios';
const CardFile = lazy(() => import("./components/CardFile"));
const LoadScreen = lazy(() => import("./components/loading"));
// import SearchIcon from "./components/icns/searchicon";
export interface ResponseData {
  message: "success" | "failed" | "บลา ๆๆ";
  data: Data[];
}

export interface Data {
  id: number;
  file_name: string;
  file_path: string;
  format: Format;
  size: string;
  duration: string;
}

export enum Format {
  WAV = "WAV",
  MP3 = "MP3",
  DSD = "DSD"
}

export default function Home() {
  const [data, setData] = useState<Data[]>()
  useEffect(() => {
    if (!data) {
      const url = 'https://' + process.env.NEXT_PUBLIC_DB_API as string
      const apiroute = '/songs/wav'
      const apiurl = url + apiroute
      axios.get<unknown, AxiosResponse<ResponseData>>(apiurl)
        .then((res) => {
          setData(res.data.data)
        })
        .catch((err: AxiosError) => {
          ErrorHandle(err)
        })
    }
  }, [])
  return data ? (
    <>
      <main className="py-32 w-full flex flex-col justify-center bg-[#1e1922]">
        <title>NEIX's Song Databases</title>
        <div className="p-4 py-8 flex flex-col  space-y-1">
          <b className="text-4xl">NEiX's Song Database</b>
          <p>
            All stored audio files are accessible for all purposes and can be used immediately without the need to contact us.</p>
        </div>

        <div className="flex flex-col -space-y-1">
          {data && data.map((v: any) => <>
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

export function ErrorHandle(err: AxiosError) {
  console.error(err)
  document.querySelector("html")!.innerHTML = ReactDOMServer.renderToString(
    <p aria-readonly style={{
      width: "100%",
      height: "100%",
      overflow: "auto",
      position: "fixed",
    }}>{JSON.stringify(err.toJSON(), null, 2)}</p>
  )
}
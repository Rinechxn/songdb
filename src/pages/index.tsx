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
  const [error, setError] = useState<string | null>(null); 
  useEffect(() => {
    if (!data && !error) { // Check for error state as well
      const url = 'https://' + process.env.NEXT_PUBLIC_DB_API as string;
      const apiroute = '/songs/wav_formats';
      const apiurl = url + apiroute;
      axios.get<unknown, AxiosResponse<ResponseData>>(apiurl)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err: AxiosError) => {
          setError(err.message); // Set error message on catch
        });
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

// export function ErrorHandle(err: AxiosError) {
//   console.error(err);

//   // Determine the appropriate message
//   const message = err.message;

//   const errorDisplay = (
//     <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
//       <div className="container mx-auto text-center">
//         <h1 className="text-3xl font-semibold text-red-500">An Error Occurred</h1>
//         <p className="mt-4 text-lg text-gray-700">We're sorry, something went wrong.</p>
//         <div className="mt-6">
//           <p className="inline-block px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-md">
//             Error Details:
//           </p>
//           <pre className="mt-2 text-sm text-left text-gray-600 bg-gray-50 rounded-lg overflow-x-auto p-4">
//             {JSON.stringify({ message }, null, 2)}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );

//   document.querySelector("html")!.innerHTML = ReactDOMServer.renderToString(errorDisplay);
// }
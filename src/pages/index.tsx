import Image from "next/image";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import CardFile from "./components/CardFile";
import axios from "axios";


export default function Home() {
  const [data, setData] = useState<null | any[]>(null)
  useEffect(() => {
    const url = 'http://' + process.env.NEXT_PUBLIC_DB_API
    const apiport = ':4000'
    const apiroute = '/songs/wav'
    const apiurl = url + apiport + apiroute
    axios.get(apiurl as string).then((res) => setData(res.data.data))
  })
  return (
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
  );
}

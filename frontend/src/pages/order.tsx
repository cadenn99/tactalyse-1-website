import Header from "@/components/Header";
import Head from 'next/head';
import { Report } from "../../typings";
import { useEffect, useState } from "react"
import Image from 'next/image'
import Background from "@/components/Background";



interface Props {
  sampleReports: Report[]
}

export default function order({ sampleReports }: Props) {
  const [report, setReport] = useState<Report | null>(null)

  useEffect(() => {
    setReport(
      sampleReports[Math.floor(Math.random() * sampleReports.length)]
    )
  }, [sampleReports])


  return (
    <div className="relative flex w-screen h-screen flex-col md:items-center md:justify-center lg:h-[100vh]">
      <Head>
        <title>Order</title>
        <meta name="description" content="Orderpage for football report generation by Tactalyse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>
      
      <div className="relative items-start py-10"> {/* FIXME: Not happy with the positioning of this one */}
        <Image
          width={500}
          height={200}
          src={`${report?.graph_path || "/failed_report_loading.png"}`}
          blurDataURL="/failed_report_loading.png"
          placeholder="blur"
          alt="example report"  //FIXME: incorporate this into Report datatype? 
        />
      </div>
      <div className="flex inset-y-0 right-0 w-16 text-black">
        placeholder Text
      </div>
    </div>
  )
}
//TODO: add logic to only show form for a pdf request when logged in

export const getServerSideProps = async () => {
  return {
    props: {
      sampleReports: [{player: "T. Cleverly", position: "Midfielder", graph_path: "/sampleReports/sample_tCleverly_Midfielder.png" }, 
      {player: "R. Bennett & B. Wilmot", position: "Centerback", graph_path: "/sampleReports/sample_comparison_R.Bennett_B.Wilmot.png" }] //TODO: figure this out
    }
  }
}
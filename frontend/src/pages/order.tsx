import Header from "@/components/Header";
import Head from 'next/head';
import { Report } from "../../typings";
import { useEffect, useState } from "react"
import Image from 'next/image'
import Background from "@/components/Background";
import { Avatar, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";



interface Props {
  sampleReports: Report[]
}

enum Position {
  Midfielder = "midfielder",
  Goalkeeper = "goalkeeper",
}

enum League {

}

interface Inputs {
  name: string,
  position: Position,
  league: League,
}

export default function order({ sampleReports }: Props) {
  const [report, setReport] = useState<Report | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setLoading(true)

    setLoading(false)
  }

  // useEffect(() => {
  //   setReport(
  //     sampleReports[Math.floor(Math.random() * sampleReports.length)]
  //   )
  // }, [sampleReports])


  return (
    <div className="grid grid-cols-2 grid-rows-1 w-screen h-screen flex-col md:items-center md:justify-center lg:h-[100vh]">
      <Head>
        <title>Order</title>
        <meta name="description" content="Orderpage for football report generation by Tactalyse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>

      <div className="cols-start-1 cols-end-1 grid grid-cols-1 md:grid-cols-2">
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
      {/* example cards here */}
      </div>

      <div className="cols-start-2 cols-end-2 min-w-[50vw]">
        <form className="relative mt-24 space-y-8 rounded bg-red-100/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
          <input type="text" placeholder="Name" className="input" {...register('name', {required: true})}/> 
          {/* <input type="text" placeholder="Position" className="input" {...register('position', {required: true})}/>  */}
          <select className="input" {...register('position', {required: true})} >
            <option value="midfielder">Midfielder</option>
            <option value="goalkeeper">Goalkeeper</option>
            <option value="???">???</option>
          </select>
          {/* <input type="text" placeholder="League" className="input" {...register('league', {required: true})}/>  */}
          <select className="input" {...register('league', {required: true})} >
            <option value="?">?</option>
            <option value="??">??</option>
            <option value="???">???</option>
          </select>          
          <button onClick={handleSubmit(onSubmit)} type="submit" className="w-full rounded bg-[#ff2301] py-3 font-semibold">Submit</button>
        </form>
        {/* Form input here */}
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
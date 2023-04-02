import Background from "@/components/Background";
import Header from "@/components/Header";
import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function NoAccess() {
  return (
    <>
      <h1>You don't have access to this page.</h1>
      <div>Either log in with a privileged account or</div>
      <Link className="hover:underline" href="/">Go back home?</Link>
    </>
  )
}

interface Inputs {
  playerName: string,
  playerFile: FileList,
  leagueFile: FileList,
  
}

function Access() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const {data: session} = useSession()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setLoading(true)
    const formData = new FormData();

    formData.append("player", document.getElementById(values.playerFile).files[0])
    formData.append("league", document.getElementById(values.leagueFile).files[0])
    await fetch("/backend/checkout/noPayment", {
      method: "POST",
      body: JSON.stringify({  //FIXME: this doesnt work; figure out multipart/form-data in nextjs soon
        playerName: values.playerName,
        playerFile: values.playerFile,
        leagueFile: values.leagueFile
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.accessToken || ""}`
      },
    })
    .then(((res) => {
      console.log(res.status)
      setLoading(false)
      switch (res.status) {
        case 500:
          router.push("/serverError")
          break;
        case 200:
          setSuccess(true)
          res.json()
          .then((data) => {
            router.replace(data.checkOutUrl)
          })
          .catch((e) => {
            // router.replace('/serverError')
            console.log(e)
          })
          .finally(() => {
            setLoading(false)
            setError("our backend ran into a problem")
          })
          break;
        default:
          setError(res.statusText)
          setLoading(false)
      }
    }))
    .catch((e) => {
      console.log(e)
      router.push("/serverError")
    })
    .finally(() => {
      setLoading(false)
    });
  }

  return (
      <main className="flex flex-row gap-10 align-middle">
        <form className="form text-center">
          <input type="text" placeholder="Name" className="input" {...register('playerName', {required: true})}/> 
          { errors.playerName && <p className="error">Please enter the name of the player you want a report on.</p>}
          <input type="file" className="input" {...register('playerFile', {required: true})}/>
          { errors.playerFile && <p className="error">Please select the excel file containing player data.</p>}
          <input type="file" className="input" {...register('leagueFile', {required: true})}/>
          { errors.leagueFile && <p className="error">Please select the excel file containing league data.</p>}
          <button onClick={handleSubmit(onSubmit)} type="submit" className="w-full rounded bg-[#ff2301] py-3 font-semibold">Submit</button>
          { success && <p>Success! expect to receive the generated report in your inbox soon.</p> } {/*  TODO: styling */}
        </form>
      </main>
  )
}

export default function componentSwitcher() {
  const { data: session} = useSession()
  
  return (
    <div className="toplevel">
      <Head>
        <title>Tactalyse</title>
        <meta name="description" content="Generate page for Tactalyse employees" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>
      <main>
        { session?.user.isEmployee && <Access/> || <NoAccess/>}
      </main>
    </div>
  )
}
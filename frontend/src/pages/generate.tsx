import Background from "@/components/Background";
import Header from "@/components/Header";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

/**
 * This function loads when the user is not logged in.
 * @returns HTML for if there is no session state or the user is not an employee.
 */
function NoAccess() {
  return (
    <>
      <h1>You don't have access to this page.</h1>
      <div>Either log in with a privileged account or</div>
      <Link className="hover:underline" href="/">Go back home?</Link>
    </>
  )
}

/**
 * This interface represents the Inputs visible on this page.
 */
interface Inputs {
  playerName: string,
  playerFile: FileList,
  leagueFile: FileList,
  
}

/**
 * This function loads the appropriate things when the user is a (logged in) employee.
 * @returns HTMl for if there is session state and the user is an employee.
 */
function Access() {
  /**
   * Constants for handling inputs.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  
  /**
   * Constants for managing state.
   */
  const {data: session} = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  /**
   * Constant for submitting to backend and dealing with the response.
   * @param values inputs of the form Inputs.
   */
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setLoading(true)
    const formData = new FormData();

    formData.append("email", `${session?.user.email || ""}`)
    formData.append("playerName", values.playerName)
    formData.append("player", values.playerFile[0])
    formData.append("league", values.leagueFile[0])
    await fetch("/backend/checkout/noPayment", {
      method: "POST",
      body: formData,
      headers: {
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
          break;
        default:
          setError(res.statusText)  //TODO: expand on this
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

  //TODO: edit when Caden implements the generate endpoint

  return (
      <main className="flex flex-row gap-10 align-middle">
        <form className="form text-center">
          <input type="text" placeholder="Player Name" className="input" {...register('playerName', {required: true})}/> 
          { errors.playerName && <p className="error">Please enter the name of the player you want a report on.</p>}
          <input type="file" className="input" {...register('playerFile', {required: true})}/>
          { errors.playerFile && <p className="error">Please select the excel file containing player data.</p>}
          <input type="file" className="input" {...register('leagueFile', {required: true})}/>
          { errors.leagueFile && <p className="error">Please select the excel file containing league data.</p>}
          <button onClick={handleSubmit(onSubmit)} type="submit" className="w-full rounded bg-[#ff2301] py-3 font-semibold">Submit</button>
          { success && <p>Success! expect to receive the generated report in your inbox soon.</p> }
          { loading && <p className="p-1 text-[14px] font-light text-orange-400">Loading...</p> } {/*TODO: add loading icon/gif thing */}
          { error && <p className="error">{error}</p> } {/*  TODO: styling */}
        </form>
      </main>
  )
}

/**
 * This function loads the appropriate page depending on whether the user is an employee or not.
 * @returns HTMl for this page.
 */
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
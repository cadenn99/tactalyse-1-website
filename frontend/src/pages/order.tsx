import Header from "@/components/Header";
import Head from 'next/head';
import { useState } from "react"
import Background from "@/components/Background";
import { SubmitHandler, useForm } from "react-hook-form";
import router from "next/router";
import { useSession } from "next-auth/react";
import { CarouselImage, ReportInput } from "../../types/types";
import Carousel from "@/components/Carousel";

/**
 * Tgus function loads and returns the appropriate code for a logged in user.
 * @returns 
 */
function LoggedIn() {
  /**
   * These variables are used to interact with the input forms.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportInput>()
  const {data: session} = useSession()

  /**
   * These variables are used to handle state on this page.
   */
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  /**
   * This constant submits input values to our backend and appropriately deals with the response.
   * @param values input values following the form of the Inputs interface.
   */
  const onSubmit: SubmitHandler<ReportInput> = async (values) => {
    setLoading(true)
    setSuccess(false)
    setError(null)
    await fetch("/backend/checkout/pay", {
      method: "POST",
      body: JSON.stringify({
        playerName: values.id
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.accessToken || ""}`
      },
    })
    .then(((res) => {
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
            router.replace('/serverError')
          })
          .finally(() => {
            setLoading(false)
            setError("our backend ran into a problem")
          })
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

  return (
    <div className="toplevel">
      <Head>
        <title>Order</title>
        <meta name="description" content="Orderpage for football report generation by Tactalyse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>

      <main className="container">
        <div className="left-column w-fill min-w-[30vw] min-h-[40vh]">
          <Carousel images={generateImages()}/>
        </div>

        <form className="right-column form text-center">
          <input type="text" placeholder="Name" className="input" {...register('id', {required: true})}/> 
          { errors.id && <p className="error">Please enter the name of the player you want a report on.</p>}
          <button onClick={handleSubmit(onSubmit)} type="submit" className="w-full rounded bg-[#ff2301] py-3 font-semibold">Submit</button>
          { success && <p>Success! you'll be redirected to the payment page soon.</p> }
          { loading && <p className="p-1 text-[14px] font-light text-orange-400">Loading...</p> } {/*TODO: add loading icon/gif thing */}
        </form>
      </main>
    </div>
  )
}

/**
 * This function loads and returns the appropriate code for when there is no session state.
 * @returns 
 */
function NotLoggedIn() {
  return (
    <div className="toplevel">
      <Head>
      <title>Order</title>
        <meta name="description" content="Orderpage for football report generation by Tactalyse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>
      <main className="container">
        <div className="left-column w-fill min-w-[30vw] min-h-[40vh]">
          <Carousel images={generateImages()}/>
        </div>

        <div className="form right-column text-[gray] text-center">
          <p>Looks like you're not logged in!
          Interested in diagrams like these?</p>
          <p>
            <a className="hover:underline text-gray-700" href="/auth/login">Log in</a>{' '}or {' '}
            <a className="hover:underline text-gray-700" href="/auth/register">Sign up</a>!
          </p>
        </div>
      </main>
    </div>
  )
}

//Todo: this functionality is used a lot throughout the project; define a custom function to take replace it
/**
 * This function loads the appropriate function depending on session state.
 * @returns HTML for the /order page.
 */
export default function ComponentSwitcher() {
  const {data: session} = useSession()

  if (session) {
    return LoggedIn()
  } else {
    return NotLoggedIn()
  }
}

/**
 * This function generates the array of sample reports.
 * @returns array of type CarouselImage.
 */
function generateImages() {
  const foo: CarouselImage = {id:0, image:"/sampleReports/tCleverly_Midfielder.png", alt:"Sample report showing the statistics of T. Cleverly"}
  const bar: CarouselImage = {id:1, image:"/sampleReports/comparison_R.Bennett_B.Wilmot.png", alt:"Sample report comparing R.Bennett and B.Wilmot"}
  const bar2: CarouselImage = {id:2, image:"/sampleReports/Millwal_ J._Cooper.png", alt:"Sample report showing the statistics of Millwal J. Cooper"}

  return [foo, bar, bar2]
}
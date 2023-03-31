import Header from "@/components/Header";
import Head from 'next/head';
import { useEffect, useState } from "react"
import Background from "@/components/Background";
import { SubmitHandler, useForm } from "react-hook-form";
import router from "next/router";
import Carousel, { CarouselImage } from "@/components/Carousel";
import { useSession } from "next-auth/react";

// Currently unused Enums, might be useful for block-2 depending on tact-2's api
// enum Position {
//   Midfielder = "midfielder",
//   Goalkeeper = "goalkeeper",
// }

// enum League {
//    World_Championship = "wc",
//    European_Championship = "eu",
//    North_American_League = "na",
// }

interface Inputs {
  name: string,
  // position: Position,
  // league: League,
}

function LoggedIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setLoading(true)
    await fetch("/api/completeOrder", {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        // position: values.position,
        // league: values.league
      }),
      headers: {
        "content-type": "application/json",
      },
    })
    .then(((res) => {
      console.log(res.status)
      console.log(res.json()) //TODO: check with backend, then rmeove
      setLoading(false)
      switch (res.status) {
        case 500:
          router.push("/serverError")
          break;
        case 200:
          setSuccess(true)
          break;
        default:
          res.json()
          .then((data) => {
            setError(data.message)
            setLoading(false)
          })
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

      <main className="w-fill min-w-[50vw]">
        <Carousel images={generateImages()}/>

        <form className="form">
          <input type="text" placeholder="Name" className="input" {...register('name', {required: true})}/> 
          { errors.name && <p className="error">Please enter the name of the player you want a report on.</p>}
          <button onClick={handleSubmit(onSubmit)} type="submit" className="w-full rounded bg-[#ff2301] py-3 font-semibold">Submit</button>
        </form>
      </main>
    </div>
  )
}

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
      <main className="w-fill min-w-[50vw]">
        <Carousel images={generateImages()}/>

        <div className="form text-[gray] text-center">
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
export default function COmponentSwitcher() {
  const {data: session} = useSession()

  if (session) {
    return LoggedIn()
  } else {
    return NotLoggedIn()
  }
}

/**
 * This function generates the array of sample reports.
 * @returns array of type CarouselImage
 */
function generateImages() {
  const foo: CarouselImage = {id:0, image:"/sampleReports/tCleverly_Midfielder.png", alt:"Sample report showing the statistics of T. Cleverly"}
  const bar: CarouselImage = {id:1, image:"/sampleReports/comparison_R.Bennett_B.Wilmot.png", alt:"Sample report comparing R.Bennett and B.Wilmot"}

  return [foo, bar]
}


// This code is completely nonfunctional at moment; TODO: clean up (and incorporate whats useful) after i get confirmation on API inputs
    // <select className="input" {...register('position', {required: true})} >
    //   <option value="midfielder">Midfielder</option>
    //   <option value="goalkeeper">Goalkeeper</option>
    //   <option value="???">???</option>
    // </select>
    // { errors.position && <p className="error">Please enter the position of the player.</p> }
    // <select className="input" {...register('league', {required: true})} >
    //   <option value="wc">World Championships</option>
    //   <option value="eu">European Championships</option>
    //   <option value="na">North American League</option>
    //   {/* I dont know jack about football, TODO get somebody else to fill the appropriate leagues and positions in */}
    // </select>          
    // { errors.league && <p className="error">Please enter the league the player plays in.</p>}

//TODO: add logic to only show form for a pdf request when logged in
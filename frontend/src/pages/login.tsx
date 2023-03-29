import Header from "@/components/Header"
import Head from 'next/head'
import Image from 'next/image'
import router from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface Inputs {
  email: string
  password: string
}


export default function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)

    await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        data
      }),
      headers: {
        "content-type": "application/json",
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
          router.push("/")
          //TODO: store JWT token as cookie??
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
    }) //TODO: error handling
    .finally(() => {
      setLoading(false)
    });
  }

  return (
    <div className="relative flex w-screen h-screen flex-col md:items-center md:justify-center lg:h-[100vh]">
      <Head>
        <title>Tactalyse</title>
        <meta name="description" content="Login page for the Tactalyse PDF generation service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Image
        src="/Background.png"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt="The Tactalyse logo"
      />

      <form className="relative mt-24 space-y-8 rounded bg-red-100/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <div className="space-y-2">
            <label className="inline-block w-full">
              <input type="email" placeholder="Email" className="input" {...register('email', {required: true})} />
              { errors.email && <p className="p-1 text-[13px] font-light  text-orange-500">Please enter a valid email.</p>}
            </label>
            <label className="inline-block w-full">
              <input type="password" placeholder="Password" className="input" {...register('password', {required: true, minLength: 8})} />
              { errors.password && <p className="p-1 text-[13px] font-light  text-orange-500">Please enter a password of at least 8 characters.</p>}
            </label>
          </div>
          { loading && <p className="p-1 text-[14px] font-light text-orange-400">Loading...</p> } {/*TODO: add loading icon/gif thing */}
          { error != null && <p className="p-1 text-[15px] font-semibold text-orange-600">{error}</p>}

          <button onClick={handleSubmit(onSubmit)} type="submit" className="w-full rounded bg-[#ff2301] py-3 font-semibold">Sign In</button>

          <div className="text-[gray]">
            Don't have an account yet?{' '}
          <button className="text-[#303030] hover:underline" onClick={() => router.push('/register')}> Sign up here</button>
      </div>
      </form>
    </div>
  )
}
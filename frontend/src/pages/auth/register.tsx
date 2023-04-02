import Background from "@/components/Background"
import Header from "@/components/Header"
import { useSession, signIn, getSession } from "next-auth/react"
import Head from 'next/head'
import router from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Alert } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid"

interface Inputs {
  email: string
  password: string
  confirmPassword: string
}


function LoggedIn() {
  return (
    <h1>you're already logged in, stupid</h1> //TODO: style this page
  )
}

function NotLoggedIn() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setLoading(true)
    await fetch("/backend/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: values.email, 
        password: values.password
      }),
      headers: {
        "content-type": "application/json",
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
          setError(null)
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
    <form className="form">
        <h1 className="text-4xl font-semibold">Sign Up</h1>
        <div className="space-y-2">
          <label className="inline-block w-full">
            <input type="email" placeholder="Email" className="input" {...register('email', {required: true})} />
            { errors.email && <p className="error">Please enter a valid email.</p>}
          </label>
          <label className="inline-block w-full">
            <input type="password" placeholder="Password" className="input" {...register('password', {required: true, minLength: 8})} />
            { errors.password && <p className="error">Please enter a password of at least 8 characters.</p>}
          </label>
          <label className="inline-block w-full">
            <input type="password" placeholder="Confirmation Password" className="input" {...register('confirmPassword', {required: true, minLength: 8})} />
          </label>
           { watch("password") !== watch("confirmPassword") && getValues("confirmPassword") && <p className="error">Passwords don't match!</p>}
        </div>
        { loading && <p className="p-1 text-[14px] font-light text-orange-400">Loading...</p> } {/*TODO: add loading icon/gif thing */}
        { error != null && <p className="error">{error}</p>}

        <button onClick={handleSubmit(onSubmit)} type="submit" className="w-full rounded bg-[#ff2301] py-3 font-semibold">Sign Up</button>

        {success && <Alert className="max-w-screen-md" icon={<CheckCircleIcon className="mt-px h-6 w-6" />}>Signup successful! You can now login on the Sign in page</Alert>}
    </form>
  )
}

export default function componentSwitcher() {
  const { data: session} = useSession()

  return (
    <div className="toplevel">
      <Head>
        <title>Tactalyse</title>
        <meta name="description" content="Register page for the Tactalyse PDF generation service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>
      { session && <LoggedIn/> || <NotLoggedIn/>}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}
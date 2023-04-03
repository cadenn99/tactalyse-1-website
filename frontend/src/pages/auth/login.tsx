import Background from "@/components/Background"
import Header from "@/components/Header"
import { useSession, signIn, getSession } from "next-auth/react"
import Head from 'next/head'
import router from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginInput } from "../../../types/types"

/**
 * This function loads when the user is already logged in.
 * @returns HTML for people who shouldn't be here.
 */
function LoggedIn() {
  return (
    <h1>you're already logged in, stupid</h1> //TODO: style this page
  )
}

/**
 * This function loads when there is no session state yet.
 * @returns HTML for people who want to log in.
 */
function NotLoggedIn() {
  /**
   * Constants for dealing with the inputs on this page.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>()

  /**
   * Constants for managing state on this page.
   */
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  /**
   * constant that deals with backend and its' response.
   * @param values input of the form Inputs
   */
  const onSubmit: SubmitHandler<LoginInput> = async (values) => {
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    })
    if (res?.error) {
      switch (res?.error) {
        case "fetch failed":
          router.replace('/serverError')
          break
        default:
          setError(res.error)
      }
    } else {
      setError(null)
    }
    if (res?.url) router.push(res.url)
    setLoading(false)
  }

  return (
    <form className="relative mt-24 space-y-8 rounded bg-red-100/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-2">
          <label className="inline-block w-full">
            <input type="email" placeholder="Email" className="input" {...register('email', {required: true})} />
            { errors.email && <p className="error">Please enter a valid email.</p>}
          </label>
          <label className="inline-block w-full">
            <input type="password" placeholder="Password" className="input" {...register('password', {required: true, minLength: 8})} />
            { errors.password && <p className="error">Your password should be at least 8 characters long.</p>}
          </label>
        </div>
        { loading && <p className="p-1 text-[14px] font-light text-orange-400">Loading...</p> } {/*TODO: add loading icon/gif thing */}
        { error != null && <p className="error">{error}</p>}

        <button onClick={handleSubmit(onSubmit)} type="submit" className="w-full rounded bg-[#ff2301] py-3 font-semibold">Sign In</button>

        <div className="text-[gray]">
          Don't have an account yet?{' '}
          <button className="text-[#303030] hover:underline" onClick={() => router.push('/auth/register')}> Sign up here</button>
        </div>
    </form>
  )
}

/**
 * This function loads the appropriate function depending on session state.
 * @returns HTML for this page.
 */
export default function componentSwitcher() {
  const { data: session} = useSession()
  
  return (
    <div className="toplevel">
      <Head>
        <title>Tactalyse</title>
        <meta name="description" content="Login page for the Tactalyse PDF generation service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>
      <main>
        { session && <LoggedIn/> || <NotLoggedIn/>}
      </main>
    </div>
  )
}
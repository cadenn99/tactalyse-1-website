import Background from "@/components/Background";
import Header from "@/components/Header";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

function NotLoggedIn() {
  return (
    <>
      <h1>You're not logged in.</h1>
      <Link className="hover:underline" href="/">Go back home?</Link>
    </>
  )
}

function LoggedIn( { user }) {
  return (
    <>
      <h1>Welcome {user?.email}</h1>
      { user?.isEmployee && <p>This is an employee account.</p>  }
    </>
  )
  /* TODO: Figure out session stuff from nextauth */
}

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
      { session && <LoggedIn user={session.user}/> || <NotLoggedIn/>}
    </div>
  )
}
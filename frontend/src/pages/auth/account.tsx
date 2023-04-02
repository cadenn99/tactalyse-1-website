import Background from "@/components/Background";
import Header from "@/components/Header";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

/**
 * This function returns the appropriate HTML when there is no session state available.
 * @returns HTML for people who aren't logged in.
 */
function NotLoggedIn() {
  return (
    <>
      <h1>You're not logged in.</h1>
      <Link className="hover:underline" href="/">Go back home?</Link>
    </>
  )
}

/** This function returns the appropriate HTMl when there is session state.
 * @returns HTML for people who are logged in.
 */
function LoggedIn( { user }) {
  return (
    <>
      <h1>Welcome {user?.email}</h1>
      { user?.isEmployee && <p>This is an employee account.</p>  }
    </>
  )
}


/**
 * This function configures metadata for the page. It also loads the appropriate function depending on session state.
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
      { session && <LoggedIn user={session.user}/> || <NotLoggedIn/>}
    </div>
  )
}
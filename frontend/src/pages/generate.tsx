import Background from "@/components/Background";
import Header from "@/components/Header";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

function NoAccess() {
  return (
    <>
      <h1>You don't have access to this page.</h1>
      <div>Either log in with a privileged account or</div>
      <Link className="hover:underline" href="/">Go back home?</Link>
    </>
  )
}

function Access() {
  return (
    <>
      <h1>Welcome</h1>
    </>
  )
  // TODO: styling, inputformat (name, league, position, excel sheets)
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
      { session?.user.isEmployee && <Access/> || <NoAccess/>}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}
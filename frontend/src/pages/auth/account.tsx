import Background from "@/components/Background";
import Header from "@/components/Header";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

export default function Account() {
  const { data: session} = useSession()
 
  return (
    <div className="relative flex w-screen h-screen flex-col md:items-center md:justify-center lg:h-[100vh]">
      <Head>
        <title>Tactalyse</title>
        <meta name="description" content="Login page for the Tactalyse PDF generation service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>
      <h1>Welcome {session?.user?.email}</h1> {/* TODO: Figure out session stuff from nextauth */}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}
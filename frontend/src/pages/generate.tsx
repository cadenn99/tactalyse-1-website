import Background from "@/components/Background";
import Header from "@/components/Header";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";


//maps to the noPayment endpoint; employee pdf generation
export default function Generate() {
  const {data: session } = useSession()

  

  return (
    <div className="toplevel">
      <Head>
      <title>Tactalyse PDFs</title>
        <meta name="description" content="Employee only page for football report generation by Tactalyse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>


    </div>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}
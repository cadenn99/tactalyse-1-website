import Background from "@/components/Background";
import Header from "@/components/Header";
import Head from "next/head";



export default function Page() {
  return (
    <div className="toplevel">
      <Head>
      <title>Tactalyse</title>
        <meta name="description" content="confirmation page for a Tactalyse order" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>
      
      <main>
        <p>
          The order has gone through successfully! Expect a confirmation email soon!
        </p>
      </main>
    </div>
  )
}

//TODO: Style this page i guess
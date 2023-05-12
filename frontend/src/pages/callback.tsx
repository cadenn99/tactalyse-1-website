import Header from "@/components/general/Header";
import Head from "next/head";

/**
 * This function contains HTMl that is loaded after a user completes a payment.
 * @returns HTML for the /callback page.
 */
export default function Page() {
  return (
    <div className="toplevel">
      <Head>
        <title>Tactalyse</title>
        <meta
          name="description"
          content="confirmation page for a Tactalyse order"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <p>
          The order has gone through successfully! Expect a confirmation email
          soon.
        </p>
      </main>
    </div>
  );
}

//TODO: Style this page i guess

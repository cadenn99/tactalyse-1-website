import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Background from "../components/Background";
import Banner from "@/components/Banner";
import Benefits from "@/components/Benefits";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import Footer from "@/components/Footer";
import TimeLineProcess from "@/components/TimeLineProcess";
import Pricing from "@/components/Pricing";
/**
 * This function loads the home page.
 * @returns HTMl for the / page.
 */
export default function Home() {
  return (
    <div className="px-2 bg-gray-100">
      <Head>
        <title>Tactalyse PDFs</title>
        <meta
          name="description"
          content="Homepage for football report generation by Tactalyse"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Background /> */}

      <main className="max-w-7xl mx-auto mt-0 flex flex-col gap-10">
        {/*className={styles.main} */}
        <Banner />

        <Benefits />

        <TimeLineProcess />

        <Pricing />

        <FrequentlyAskedQuestions />

        <Footer />
      </main>
    </div>
  );
}

/* TODO: style this page, with like an accordion component or something
 * - What is the product
 * - How does it work
 * - Faq maybe?
 */

/* General TODO:
 * Replace all HTTP request calls with axios equivalents for better edgecase handling.
 * See about extracting the ComponentSwitcher function into a High Order Component.
 * That thing about routing/rewriting to the backend.
 * A few of the LoggedIn/NoAccess pages are basically identical; extract to one thing
 */

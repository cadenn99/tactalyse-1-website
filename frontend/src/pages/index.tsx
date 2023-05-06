import React from "react";
import Head from "next/head";
import Header from "../components/Header";
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
    <div className="px-2">
      <Head>
        <title>Home | Tactalyse</title>
      </Head>
      <Header />

      <main className="max-w-7xl mx-auto mt-0 flex flex-col gap-10 min-h-screen">
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

/* General TODO:
 * Replace all HTTP request calls with axios equivalents for better edgecase handling.
 * See about extracting the ComponentSwitcher function into a High Order Component.
 * That thing about routing/rewriting to the backend.
 * A few of the LoggedIn/NoAccess pages are basically identical; extract to one thing
 */

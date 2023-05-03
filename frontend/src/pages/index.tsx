import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Background from "../components/Background";
import Banner from "@/components/Banner";

/**
 * This function loads the home page.
 * @returns HTMl for the / page.
 */
export default function Home() {
  return (
    <div className="h-screen lg:h-[100vh] px-2">
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

      <main className="max-w-7xl mx-auto mt-10">
        {/*className={styles.main} */}
        <Banner />
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

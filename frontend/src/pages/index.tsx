import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../components/Header'
import Background from '@/components/Background'

/**
 * This function loads the home page.
 * @returns HTMl for the / page.
 */
export default function Home() {
  return (
    <div className="relative h-screen lg:h-[100vh]">
      <Head>
        <title>Tactalyse PDFs</title>
        <meta name="description" content="Homepage for football report generation by Tactalyse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>

      <main className={styles.main}>
        This is the landing page for the Tactalyse PDF report service.
        <p>This page itself is still a work in progress, but the site is fully functional!</p>
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
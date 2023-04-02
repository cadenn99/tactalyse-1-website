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
        Text goes here describing the product (and workflow?)
        Styling also goes here do this later TODO
      </main>
    </div>
  );
}


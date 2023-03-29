import React from 'react';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="relative h-screen lg:h-[140vh]">
      <Head>
        <title>Tactalyse PDF Generation</title>
        <meta name="description" content="Homepage for football report generation by Tactalyse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>

      <main className={styles.main}>
          Text goes here describing the product (and workflow?)
          Styling also goes here do this later TODO
      </main>
      {/*Model*/}
    </div>
  );
}


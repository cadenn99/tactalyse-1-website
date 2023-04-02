import Header from "@/components/Header";
import Head from "next/head";
import React from 'react';
import Background from "@/components/Background";

/**
 * This page is loaded whenever our backend reports some internal error.
 * @returns HTML informing the user about the error in the backend.
 */
export default function error() {
  return (
    <div className="toplevel">
      <Head>
       <title>Tactalyse PDFs</title>
        <meta name="description" content="Errorpage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Background/>
      <div className="">
        <h1>
          Something went wrong with our backend T_T
        </h1>
        <p>We are doing our best to fix the issue. Please come back later</p>
      </div>
    </div>
  )
  // TODO: spend some more time on styling this page
}
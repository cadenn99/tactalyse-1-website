import Header from "@/components/Header";
import Head from "next/head";
import React from 'react';
import Image from 'next/image'
import Background from "@/components/Background";

export default function error() {
  return (
    <div className="relative flex w-screen h-screen flex-col md:items-center md:justify-center lg:h-[100vh]">
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
  // FIXME: spend some more time on this page
}
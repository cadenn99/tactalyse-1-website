import Header from "@/components/Header";
import Head from "next/head";
import React from 'react';
import Image from 'next/image'

export default function error() {
  return (
    <div className="relative flex w-screen h-screen flex-col md:items-center md:justify-center lg:h-[40vh]">
      <Head>
      
      </Head>
      <Header/>
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
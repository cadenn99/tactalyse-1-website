import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import Head from "next/head";
import React from "react";
import { BsFillChatLeftFill } from "react-icons/bs";

function contact() {
  return (
    <div className="px-2">
      <Head>
        <title>Order | Tactalyse</title>
      </Head>
      <Header />
      <main
        className="max-w-7xl mx-auto mt-0 flex flex-col gap-5"
        style={{ minHeight: "calc(100vh - 88px)" }}
      >
        <div
          className="min-h-[100px] bg-red-500 flex items-center bg-cover bg-no-repeat rounded-md p-10 justify-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url('./soccer_1.png')",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-white text-3xl flex gap-2 items-center">
            <BsFillChatLeftFill /> Contact
          </h1>
        </div>
        <div className="flex gap-5 flex-col lg:flex-row items-center justify-center h-full">
          <ContactForm />
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default contact;

import Footer from "@/components/Footer";
import Generator from "@/components/Generator";
import FulFillOrder from "@/components/Generator";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import Head from "next/head";
import React from "react";
import { BiPackage } from "react-icons/bi";

function handleOrders() {
  return (
    <div>
      <Head>
        <title>Fulfillment | Tactalyse</title>
      </Head>
      <ProtectedRoute employeeOnly={true}>
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
            <h1 className="text-white text-3xl gap-2 flex">
              <BiPackage />
              Handle orders
            </h1>
          </div>
          <div className="flex gap-1">
            <Generator />
          </div>

          <Footer />
        </main>
      </ProtectedRoute>
    </div>
  );
}

export default handleOrders;

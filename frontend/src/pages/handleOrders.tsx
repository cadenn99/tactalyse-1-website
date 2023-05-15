import Footer from "@/components/general/Footer";
import Generator from "@/components/handleOrders/Generator";
import FulFillOrder from "@/components/handleOrders/Generator";
import Header from "@/components/general/Header";
import ProtectedRoute from "@/components/general/ProtectedRoute";
import Head from "next/head";
import React from "react";
import { BiPackage } from "react-icons/bi";
import OutstandingOrders from "@/components/handleOrders/OutstandingOrders";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Spinner } from "flowbite-react";

function HandleOrders() {
  const { data: session } = useSession();
  const { data, error } = useSWR(
    session
      ? {
          url: process.env.NEXT_PUBLIC_BACKEND_URL +"/employee/unfilfilled-orders",
          authorization: `Bearer ${session?.accessToken}`,
        }
      : null,
    fetcher
  );

  if (error) return console.log(error);

  return (
    <div className="px-2">
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
          <div className="flex flex-col-reverse gap-5 md:flex-row">
            {data ? (
              <OutstandingOrders orders={data?.unfilfilledOrders || []} />
            ) : (
              <Spinner />
            )}
            <Generator />
          </div>

          <Footer />
        </main>
      </ProtectedRoute>
    </div>
  );
}

export default HandleOrders;

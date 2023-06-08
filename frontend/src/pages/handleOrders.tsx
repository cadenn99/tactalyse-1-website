"use client";
import Footer from "@/components/general/Footer";
import Generator from "@/components/handleOrders/Generator";
import Header from "@/components/general/Header";
import ProtectedRoute from "@/components/general/ProtectedRoute";
import Head from "next/head";
import React, { useContext, useState } from "react";
import { BiHelpCircle, BiPackage } from "react-icons/bi";
import OutstandingOrders from "@/components/handleOrders/OutstandingOrders";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Spinner } from "flowbite-react";
import { useDark } from "@/hooks/useDark";
import { ToastContext } from "@/contexts/ToastContext";
import { HiX } from "react-icons/hi";
import InfoModal from "@/components/handleOrders/InfoModal";

function HandleOrders() {
  const [modal, setModal] = useState(false);
  useDark();
  const { data: session } = useSession();
  const toast = useContext(ToastContext);
  const { data, error } = useSWR(
    session
      ? {
          url:
            process.env.NEXT_PUBLIC_BACKEND_URL +
            "/employee/unfilfilled-orders",
          authorization: `Bearer ${session?.accessToken}`,
        }
      : null,
    fetcher
  );

  if (error)
    return toast?.setToast({
      message: error.message,
      error: true,
      icon: <HiX className="h-5 w-5" />,
    });

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
          <div className="ml-auto dark:text-white px-3">
            <BiHelpCircle
              className="h-5 w-5 hover:cursor-pointer"
              onClick={() => setModal(true)}
            />
            <InfoModal show={modal} setShow={setModal} />
          </div>
          <div className="flex flex-col-reverse gap-5 md:flex-row">
            {data ? (
              <OutstandingOrders
                orders={data?.unfilfilledOrders || []}
                className="flex flex-col w-full md:w-[50%] self-start gap-5"
              />
            ) : (
              <div className="w-full md:w-[50%] flex items-center justify-center" data-testid="OutstandingOrders">
                <Spinner color={"gray"} size={"md"} />
              </div>
            )}

            <Generator className="w-full md:w-[50%] ml-auto self-start" />
          </div>

          <Footer />
        </main>
      </ProtectedRoute>
    </div>
  );
}

export default HandleOrders;

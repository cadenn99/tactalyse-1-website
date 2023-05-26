import Header from "@/components/general/Header";
import Head from "next/head";
import Footer from "@/components/general/Footer";
import ExampleReports from "@/components/order/ExampleReports";
import Purchase from "@/components/order/Purchase";
import ProtectedRoute from "@/components/general/ProtectedRoute";
import Disclaimer from "@/components/order/Disclaimer";
import { AiOutlineShopping } from "react-icons/ai";
import { useDark } from "@/hooks/useDark";

/**
 * This function loads the appropriate function depending on session state.
 * @returns HTML for the /order page.
 */
export default function Order() {
  useDark();
  return (
    <div className="px-2">
      <Head>
        <title>Order | Tactalyse</title>
      </Head>

      <ProtectedRoute customerOnly={true}>
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
              <AiOutlineShopping /> Buy report
            </h1>
          </div>
          <div className="flex gap-5 flex-col-reverse lg:flex-row">
            <ExampleReports />

            <div className="flex gap-5 flex-col w-full lg:w-[50%]">
              <Disclaimer />
              <Purchase />
            </div>
          </div>

          <Footer />
        </main>
      </ProtectedRoute>
    </div>
  );
}

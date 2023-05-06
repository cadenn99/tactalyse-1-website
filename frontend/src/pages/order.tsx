import { useSessionHook } from "./hooks/useSessionHook";
import Header from "@/components/Header";
import Head from "next/head";

import Footer from "@/components/Footer";
import ExampleReports from "@/components/ExampleReports";
import Purchase from "@/components/Purchase";
/**
 * This function loads the appropriate function depending on session state.
 * @returns HTML for the /order page.
 */
export default function ComponentSwitcher() {
  const [_, __] = useSessionHook();

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
          className="min-h-[150px] bg-red-500 flex items-center bg-cover bg-no-repeat rounded-md p-10 justify-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url('./soccer_1.png')",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-white text-3xl">Order your report</h1>
        </div>
        <div className="flex gap-5 flex-col-reverse lg:flex-row">
          <ExampleReports />
          <Purchase />
        </div>

        <Footer />
      </main>
    </div>
  );
}

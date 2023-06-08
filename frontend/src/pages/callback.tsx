import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import ProtectedRoute from "@/components/general/ProtectedRoute";
import { Card } from "flowbite-react";
import Head from "next/head";
import { AiOutlineCheckCircle } from "react-icons/ai";

/**
 * This function contains HTMl that is loaded after a user completes a payment.
 * @returns HTML for the /callback page.
 */
export default function Callback() {
  return (
    <div>
      <Head>
        <title>Tactalyse</title>
      </Head>
      <ProtectedRoute customerOnly={true}>
        <Header />

        <main
          className="max-w-7xl mx-auto mt-0 flex flex-col gap-5"
          style={{ minHeight: "calc(100vh - 88px)" }}
        >
          <Card className="max-w-[400px] mx-auto w-full my-auto flex flex-col items-center">
            <div className="bg-green-400/10 self-start rounded-full p-5 mx-auto">
              <AiOutlineCheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <div className="text-center dark:text-white">
              Thank you for your order! You will receive your report within 24
              hours.
            </div>
          </Card>
          <Footer />
        </main>
      </ProtectedRoute>
    </div>
  );
}

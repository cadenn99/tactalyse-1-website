import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import ProtectedRoute from "@/components/general/ProtectedRoute";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Orders from "@/components/dashboard/Orders";
import { useContext } from "react";
import { HiX } from "react-icons/hi";
import { ToastContext } from "@/contexts/ToastContext";

function Dashboard() {
  const { data: session } = useSession();
  const toast = useContext(ToastContext);

  const { data, error } = useSWR(
    session && !session.user.isEmployee
      ? {
          url: process.env.NEXT_PUBLIC_BACKEND_URL + "/content/order-history",
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
        <title>Dashboard | Tactalyse</title>
      </Head>
      <ProtectedRoute customerOnly={true}>
        <Header />
        <main
          className="max-w-7xl mx-auto mt-0 flex flex-col gap-5"
          style={{ minHeight: "calc(100vh - 88px)" }}
        >
          <h1 className="text-4xl dark:text-white px-5 flex justify-between items-end">
            Dashboard
            <span className="text-sm text-slate-500">
              ID: {session?.user.id}
            </span>
          </h1>

          <Orders orders={data?.orders ?? []} />

          <Footer />
        </main>
      </ProtectedRoute>
    </div>
  );
}

export default Dashboard;

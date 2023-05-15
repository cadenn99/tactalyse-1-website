import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import ProtectedRoute from "@/components/general/ProtectedRoute";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Orders from "@/components/dashboard/customer/Orders";
import Stats from "@/components/dashboard/employee/Stats";
import StatsCard from "@/components/dashboard/employee/StatsCard";
import { BiPackage } from "react-icons/bi";

export default function Dashboard() {
  const { data: session } = useSession();

  /**
   * Hook for fetching user order-history
   */
  const { data: dataUser, error: errorUser } = useSWR(
    session && !session.user.isEmployee
      ? {
          url: process.env.NEXT_PUBLIC_BACKEND_URL + "/content/order-history",
          authorization: `Bearer ${session?.accessToken}`,
        }
      : null,
    fetcher
  );

  /**
   * Hook for fetching employee stats
   */
  const { data: dataEmployee, error: errorEmployee } = useSWR(
    session && session.user.isEmployee ? null : null,
    fetcher
  );

  if (errorUser || errorEmployee)
    return console.log(errorUser || errorEmployee);

  return (
    <div className="px-2">
      <Head>
        <title>Dashboard | Tactalyse</title>
      </Head>
      <ProtectedRoute employeeOnly={false}>
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

          {!session?.user.isEmployee && (
            <Orders orders={dataUser?.orders ?? []} />
          )}
          {session?.user.isEmployee && (
            <Stats>
              <StatsCard
                icon={<BiPackage className="dark:text-white text-4xl" />}
              >
                20 orders
              </StatsCard>
              <StatsCard
                icon={<BiPackage className="dark:text-white text-4xl" />}
              >
                Some cool stat
              </StatsCard>
              <StatsCard
                icon={<BiPackage className="dark:text-white text-4xl" />}
              >
                Another one
              </StatsCard>
              <StatsCard
                icon={<BiPackage className="dark:text-white text-4xl" />}
              >
                And another one
              </StatsCard>
            </Stats>
          )}
          <Footer />
        </main>
      </ProtectedRoute>
    </div>
  );
}

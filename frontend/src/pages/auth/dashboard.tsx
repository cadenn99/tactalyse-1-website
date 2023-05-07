import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { Badge, Card, Pagination, Table } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { HiCheck, HiClock } from "react-icons/hi";
import { OrderInterface } from "../../../types/types";

export default function Dashboard() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(1);

  useEffect(() => {
    setLoading(true);
    if (!session) return;
    axios({
      url: "http://localhost:5000/content/order-history",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [session]);

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

          <Card className="w-full lg:w-[50%] relative flex flex-col justify-center">
            <h2 className="text-center text-2xl dark:text-white">Orders</h2>
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Report ID</Table.HeadCell>
                <Table.HeadCell className="hidden xs:table-cell">
                  Player Name
                </Table.HeadCell>
                <Table.HeadCell className="hidden sm:table-cell">
                  Order Date
                </Table.HeadCell>
                <Table.HeadCell>Order Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {!loading &&
                  orders
                    .sort(
                      (a: OrderInterface, b: OrderInterface) =>
                        b.creationTimestamp - a.creationTimestamp
                    )
                    .filter((item: OrderInterface) => item.completedPayment)
                    .slice((pageNumber - 1) * 5, (pageNumber - 1) * 5 + 5)
                    .map((i: OrderInterface) => (
                      <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:cursor-pointer"
                        key={i._id}
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white truncate">
                          {i._id.slice(0, 8)}...
                        </Table.Cell>
                        <Table.Cell className="hidden xs:table-cell">
                          {i.playerName}
                        </Table.Cell>
                        <Table.Cell className="hidden sm:table-cell">
                          {new Date(i.creationTimestamp).getDate() +
                            "/" +
                            (new Date(i.creationTimestamp).getMonth() + 1) +
                            "/" +
                            new Date(i.creationTimestamp).getFullYear()}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex">
                            <Badge
                              color={
                                i.status === "processing" ? "red" : "green"
                              }
                              icon={
                                i.status === "processing" ? HiClock : HiCheck
                              }
                              className="self-start pr-3"
                            >
                              <span className="capitalize tracking-wider">
                                {i.status}
                              </span>
                            </Badge>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
              </Table.Body>
            </Table>
            <Pagination
              currentPage={pageNumber}
              layout="navigation"
              onPageChange={(e) => {
                if (
                  e * 5 -
                    orders.filter(
                      (item: OrderInterface) => item.completedPayment
                    ).length >=
                  5
                )
                  return;
                setPageNumber(e);
              }}
              totalPages={
                orders.filter((item: OrderInterface) => item.completedPayment)
                  .length
              }
              className="mx-auto"
            />
          </Card>
          <Footer />
        </main>
      </ProtectedRoute>
    </div>
  );
}

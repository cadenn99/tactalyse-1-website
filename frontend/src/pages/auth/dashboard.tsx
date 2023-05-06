import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { Badge, Card, Table } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { HiClock } from "react-icons/hi";
import { OrderInterface } from "../../../types/types";

export default function Dashboard() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
      <ProtectedRoute>
        <Header />
        <main
          className="max-w-7xl mx-auto mt-0 flex flex-col gap-5"
          style={{ minHeight: "calc(100vh - 88px)" }}
        >
          <h1 className="text-4xl dark:text-white px-5">Dashboard</h1>

          <Card className="w-full lg:w-[50%] relative">
            <h2 className="text-center text-2xl dark:text-white">Orders</h2>
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Report ID</Table.HeadCell>
                <Table.HeadCell>Player Name</Table.HeadCell>
                <Table.HeadCell className="hidden sm:block">
                  Order Date
                </Table.HeadCell>
                <Table.HeadCell>Order Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {!loading &&
                  orders.map((i: OrderInterface) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:cursor-pointer"
                      key={i._id}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white truncate">
                        {i._id.slice(0, 8)}...
                      </Table.Cell>
                      <Table.Cell>{i.playerName}</Table.Cell>
                      <Table.Cell className="hidden sm:block">
                        {new Date(i.creationTimestamp).getDate() +
                          "/" +
                          (new Date(i.creationTimestamp).getMonth() + 1) +
                          "/" +
                          new Date(i.creationTimestamp).getFullYear()}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge color={"red"} icon={HiClock}>
                          Processing
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Card>
          <Footer />
        </main>
      </ProtectedRoute>
    </div>
  );
}

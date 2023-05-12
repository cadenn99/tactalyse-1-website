import { Badge, Card, Pagination, Table } from "flowbite-react";
import React, { useState } from "react";
import { HiClock, HiCheck } from "react-icons/hi";
import { OrderInterface } from "../../../../types/types";

interface Props {
  orders: OrderInterface[];
}
function Orders({ orders }: Props) {
  const [pageNumber, setPageNumber] = useState(1);

  return (
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
          {orders
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
                      color={i.status === "processing" ? "red" : "green"}
                      icon={i.status === "processing" ? HiClock : HiCheck}
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
              orders.filter((item: OrderInterface) => item.completedPayment)
                .length >=
            5
          )
            return;
          setPageNumber(e);
        }}
        totalPages={
          orders.filter((item: OrderInterface) => item.completedPayment).length
        }
        className="mx-auto"
      />
    </Card>
  );
}

export default Orders;

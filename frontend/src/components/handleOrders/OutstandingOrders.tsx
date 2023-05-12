import { Card, Pagination, Table } from "flowbite-react";
import React, { useState } from "react";
import { OrderInterface } from "../../../types/types";
import { TfiReload } from "react-icons/tfi";

interface Props {
  orders: OrderInterface[];
}

function OutstandingOrders({ orders }: Props) {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Card className="w-full md:w-[50%] self-start">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl dark:text-white">Outstanding Orders</h2>
      </div>
      <div className="w-full">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Player Name</Table.HeadCell>
            <Table.HeadCell className="hidden sm:table-cell">
              Order Date
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders
              .sort(
                (a: OrderInterface, b: OrderInterface) =>
                  a.creationTimestamp - b.creationTimestamp
              )
              .slice((pageNumber - 1) * 5, (pageNumber - 1) * 5 + 5)
              .map((order: OrderInterface) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:cursor-pointer"
                  key={order._id}
                >
                  <Table.Cell
                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white truncate"
                    onClick={() => navigator.clipboard.writeText(order.orderId)}
                  >
                    {order?.orderId.slice(0, 8)}...
                  </Table.Cell>
                  <Table.Cell
                    className="table-cell"
                    onClick={() =>
                      navigator.clipboard.writeText(order.playerName)
                    }
                  >
                    {order.playerName}
                  </Table.Cell>
                  <Table.Cell className="hidden sm:table-cell">
                    {new Date(order.creationTimestamp).getDate() +
                      "/" +
                      (new Date(order.creationTimestamp).getMonth() + 1) +
                      "/" +
                      new Date(order.creationTimestamp).getFullYear()}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        <Pagination
          currentPage={pageNumber}
          layout="navigation"
          onPageChange={(e) => {
            if (e * 5 - orders.length >= 5) return;
            setPageNumber(e);
          }}
          totalPages={orders.length}
          className="flex justify-center mt-5"
        />
      </div>
    </Card>
  );
}

export default OutstandingOrders;

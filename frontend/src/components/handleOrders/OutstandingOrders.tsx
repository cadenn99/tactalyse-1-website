import { Card, Pagination, Table, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { OrderInterface } from "../../../types/types";

interface Props {
  orders: OrderInterface[];
  className?: string;
}

function OutstandingOrders({ orders, className }: Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [tooltip, setTooltip] = useState("Copy to clipboard");

  return (
    <Card className={className} data-testid="OutstandingOrders">
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
                  <Tooltip content={tooltip} placement="left">
                    <Table.Cell
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white truncate"
                      onClick={() => {
                        setTooltip("Copied!");
                        navigator.clipboard.writeText(order.orderId);
                      }}
                      onMouseLeave={() => setTooltip("Copy to clipboard")}
                    >
                      {order?.orderId.slice(0, 8)}...
                    </Table.Cell>
                  </Tooltip>
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

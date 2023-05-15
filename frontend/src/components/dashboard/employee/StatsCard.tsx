import { Card } from "flowbite-react";
import React from "react";

interface Props {
  children: React.ReactNode;
  icon: React.ReactNode;
}
function StatsCard({ children, icon }: Props) {
  return (
    <Card>
      <div className="flex justify-between w-full items-center">
        {icon}
        <h2 className="dark:text-white font-md">{children}</h2>
      </div>
    </Card>
  );
}

export default StatsCard;

import { Button, Card } from "flowbite-react";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

function Pricing() {
  return (
    <div
      className="flex flex-col items-center py-5 -mt-5"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,35,1,0.3) 0%, rgba(243,244,246,1) 40%)",
      }}
    >
      <h1 className="text-3xl text-center font-bold">Pricing</h1>
      <Card className="mt-8 max-w-xs">
        <h5 className="text-gray-500 mb-4 font-medium ">Tactical Report</h5>
        <div className="flex gap-2">
          <span className="flex items-end font-bold">€</span>
          <span className="text-7xl font-bold">49,-</span>
        </div>
        <ul role="list" className="mt-8 space-y-2">
          <li className="flex gap-5 items-center">
            <AiFillCheckCircle className="text-[#FF2301]/70" />
            <span>Detailed tactical report</span>
          </li>
          <li className="flex gap-5 items-center">
            <AiFillCheckCircle className="text-[#FF2301]/70" />
            <span>24/7 support</span>
          </li>
          <li className="flex gap-5 items-center">
            <AiFillCheckCircle className="text-[#FF2301]/70" />
            <span>Some other thing</span>
          </li>
        </ul>
        <Button className="mt-5 !bg-[#FF2301] hover:!bg-[#FF2301]/70">
          Get report
        </Button>
      </Card>
    </div>
  );
}

export default Pricing;

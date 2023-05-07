import { Button, Card } from "flowbite-react";
import { useRouter } from "next/router";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

function Pricing() {
  const { push } = useRouter();
  return (
    <div
      className="flex flex-col items-center py-5 -mt-5"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,35,1,0.3) 0%, rgba(255,35,1,0.0) 40%)",
      }}
      id="pricing"
    >
      <h1 className="text-3xl text-center font-bold dark:text-white">
        Pricing
      </h1>
      <Card className="mt-8 max-w-xs">
        <h5 className="text-gray-500 mb-4 font-medium ">Tactical Report</h5>
        <div className="flex gap-2">
          <span className="flex items-end font-bold dark:text-white">€</span>
          <span className="text-7xl font-bold dark:text-white">49,-</span>
        </div>
        <ul role="list" className="mt-8 space-y-2">
          <li className="flex gap-5 items-center">
            <AiFillCheckCircle className="text-[#FF2301]/70" />
            <span className="dark:text-[#848C99]">
              Detailed tactical report
            </span>
          </li>
          <li className="flex gap-5 items-center">
            <AiFillCheckCircle className="text-[#FF2301]/70" />
            <span className="dark:text-[#848C99]">24/7 support</span>
          </li>
          <li className="flex gap-5 items-center">
            <AiFillCheckCircle className="text-[#FF2301]/70" />
            <span className="dark:text-[#848C99]">Some other thing</span>
          </li>
        </ul>
        <Button className="mt-5 !bg-[#FF2301] hover:!bg-[#FF2301]/70">
          <span
            className="flex justify-center w-full"
            onClick={() => push("/order")}
          >
            Get report
          </span>
        </Button>
      </Card>
    </div>
  );
}

export default Pricing;

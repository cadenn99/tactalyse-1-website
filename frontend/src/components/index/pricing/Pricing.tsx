import { useRouter } from "next/router";
import React from "react";


interface Props {
  children: JSX.Element | JSX.Element[];
}

function Pricing({ children }: Props) {
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
      <div className="flex flex-col md:flex-row gap-10">{children}</div>
    </div>
  );
}

export default Pricing;

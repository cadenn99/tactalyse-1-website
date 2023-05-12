import { Card } from "flowbite-react";
import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import { FaHandshake } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

interface Props {
  children: JSX.Element | JSX.Element[];
}

function Benefits({ children }: Props) {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold dark:text-white">
        Why choose Tactalyse?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-5">
        {children}
      </div>
    </div>
  );
}

export default Benefits;

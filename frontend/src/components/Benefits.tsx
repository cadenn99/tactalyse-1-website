import { Card } from "flowbite-react";
import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import { FaHandshake } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
function Benefits() {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold dark:text-white">
        Why choose Tactalyse?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-5">
        <Card className="hover:scale-[101%]">
          <div className="flex flex-col items-center gap-5 font-semibold">
            <CgGym className="w-10 h-10 dark:text-white" />
            <h5 className="text-center font-normal dark:text-[#848C99]">
              Improved player development
            </h5>
          </div>
        </Card>
        <Card className="hover:scale-[101%]">
          <div className="flex flex-col items-center gap-5 font-semibold">
            <FaHandshake className="w-10 h-10 dark:text-white" />
            <h5 className="text-center font-normal dark:text-[#848C99]">
              Better team cohesion
            </h5>
          </div>
        </Card>
        <Card className="hover:scale-[101%]">
          <div className="flex flex-col items-center gap-5 font-semibold">
            <TbPigMoney className="w-10 h-10 dark:text-white" />
            <h5 className="text-center font-normal dark:text-[#848C99]">
              Increased revenue
            </h5>
          </div>
        </Card>
        <Card className="hover:scale-[101%]">
          <div className="flex flex-col items-center gap-5 font-semibold">
            <BsPeopleFill className="w-10 h-10 dark:text-white" />
            <h5 className="text-center font-normal dark:text-[#848C99]">
              Objective analysis
            </h5>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Benefits;

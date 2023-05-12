import { Card } from "flowbite-react";
import React from "react";
import { IconType } from "react-icons";
import { CgGym } from "react-icons/cg";

interface Props {
  icon: JSX.Element;
  text: string;
}

function BenefitCard({ icon, text }: Props) {
  return (
    <Card className="hover:scale-[101%]">
      <div className="flex flex-col items-center gap-5 font-semibold">
        {icon}
        <h5 className="text-center font-normal dark:text-[#848C99]">{text}</h5>
      </div>
    </Card>
  );
}

export default BenefitCard;

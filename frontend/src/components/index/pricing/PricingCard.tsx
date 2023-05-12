import { Button, Card } from "flowbite-react";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { ImPriceTag } from "react-icons/im";
interface Props {
  title: string;
  price?: string;
  enterprise?: boolean;
  reasons: string[];
  cta: () => void;
  ctaText: string;
}

function PricingCard({
  title,
  price,
  enterprise,
  reasons,
  cta,
  ctaText,
}: Props) {
  return (
    <Card className="mt-8 max-w-xs w-[250px]">
      <h5 className="text-gray-500 mb-4 font-medium ">{title}</h5>
      {price && (
        <div className="flex gap-2">
          <span className="flex items-end font-bold dark:text-white">€</span>
          <span className="text-7xl font-bold dark:text-white">{price}</span>
        </div>
      )}
      {enterprise && (
        <div className="flex gap-2 flex-col">
          <span className="text-4xl font-bold dark:text-white">
            Custom pricing
          </span>
        </div>
      )}
      <ul role="list" className="mt-8 space-y-2">
        {reasons.map((item, index) => (
          <li className="flex gap-5 items-center" key={index}>
            <AiFillCheckCircle className="text-[#FF2301]/70" />
            <span className="dark:text-[#848C99]">{item}</span>
          </li>
        ))}
      </ul>
      <Button className="mt-5 !bg-[#FF2301] hover:!bg-[#FF2301]/70">
        <span className="flex justify-center w-full" onClick={cta}>
          {ctaText}
        </span>
      </Button>
    </Card>
  );
}

export default PricingCard;

import { Button } from "flowbite-react";
import React from "react";

function Banner() {
  return (
    <div
      className="h-[50vh] min-h-[400px] bg-red-500 flex items-center bg-cover bg-no-repeat rounded-md p-10"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)), url('./soccer_1.png')",
        backgroundPosition: "bottom",
      }}
    >
      <div className="flex flex-col items-center sm:items-start">
        <h2 className="text-center text-2xl sm:text-left sm:text-3xl leading-1 text-white">
          We are here for you
        </h2>
        <h1 className="text-center text-5xl sm:text-left sm:text-7xl font-bold text-[#FF2301]">
          Join the elite
        </h1>
        <p className="text-center text-sm sm:text-md sm:text-left max-w-[500px] mt-5 text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <Button className="mt-8 rounded-md !bg-[#FF2301] hover:!bg-[#FF2301]/70 max-w-[200px]">
          Order now
        </Button>
      </div>
    </div>
  );
}

export default Banner;

import { Alert, Card } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { AiFillWarning } from "react-icons/ai";

function Disclaimer() {
  return (
    <Alert color="failure" withBorderAccent={true} icon={AiFillWarning}>
      Orders take up to 24 hours to be processed, read more
      <Link href={"/#process"} className="ml-1 underline">
        here
      </Link>
    </Alert>
  );
}

export default Disclaimer;

import React from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

function Stats({ children }: Props) {
  return <div className="grid grid-cols-4 gap-2">{children}</div>;
}

export default Stats;

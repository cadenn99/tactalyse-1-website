import { Card, Tabs } from "flowbite-react";
import React from "react";

function ExampleReports() {
  return (
    <Card className="w-full lg:w-[50%] self-start">
      <h2 className="text-2xl dark:text-white">Example reports</h2>
      <Tabs.Group style="default" className="flex">
        <Tabs.Item title="Player 1">
          <embed
            className="w-full h-[400px] rounded-md"
            type="application/pdf"
            src="/report_1.pdf"
          />
        </Tabs.Item>
        <Tabs.Item title="Player 2">
          <embed
            className="w-full h-[400px] rounded-md"
            type="application/pdf"
            src="/report_1.pdf"
          />
        </Tabs.Item>
        <Tabs.Item title="Player 3">
          <embed
            className="w-full h-[400px] rounded-md"
            type="application/pdf"
            src="/report_1.pdf"
          />
        </Tabs.Item>
      </Tabs.Group>
    </Card>
  );
}

export default ExampleReports;

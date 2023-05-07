import { Card, Timeline } from "flowbite-react";
import React from "react";
import { MdAccountCircle, MdPayment } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

function TimeLineProcess() {
  return (
    <div id="process">
      <h1 className="text-3xl text-center font-bold dark:text-white">
        How does it work?
      </h1>
      <Card className="mt-5">
        <Timeline horizontal={true} className="">
          <Timeline.Item>
            <Timeline.Point icon={MdAccountCircle} color="red-500" />
            <Timeline.Content>
              <Timeline.Title>Create an account</Timeline.Title>
              <Timeline.Body>
                Create your account on the sign up page
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point icon={MdPayment} color="red-500" />
            <Timeline.Content>
              <Timeline.Title>Purchase a report</Timeline.Title>
              <Timeline.Body>
                After an account has been created you are able to purchase a
                report
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point icon={AiOutlineMail} color="red-500" />
            <Timeline.Content>
              <Timeline.Title>Receive report</Timeline.Title>
              <Timeline.Body>
                You will receive your report within 24 hours of purchasing in
                your email inbox
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  );
}

export default TimeLineProcess;

import { Button, Modal, Tabs } from "flowbite-react";
import React from "react";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function InfoModal({ show = false, setShow }: Props) {
  return (
    <Modal show={show} size={"md"} onClose={() => setShow(false)}>
      <Modal.Header>How to fulfill an order</Modal.Header>
      <Modal.Body className="dark:text-white">
        <Tabs.Group style="default" className="w-full">
          <Tabs.Item title="Order">
            <ol className="flex flex-col gap-2 mb-5">
              <li>
                1. Copy the order ID by clicking on it in the outstanding orders
                section, it will be copied to clipboard.
              </li>
              <li>
                2. Toggle the switch for &apos;Fulfillinf an order?&apos; to
                active.
              </li>
              <li>3. Paste the order id and complete the rest of the form</li>
            </ol>
            <p>
              Note: Make sure the player name matches the player name in the
              spreadsheet
            </p>
          </Tabs.Item>
          <Tabs.Item title="Non-Order">
            <ol className="flex flex-col gap-2 mb-5">
              <li>
                1. Leave the switch for &apos;Fulfilling an order?&apos;
                untoggled.
              </li>
              <li>2. Input an email of the receiver of the report.</li>
              <li>3. Complete the rest of the form</li>
            </ol>
            <p>
              Note: Make sure the player name matches the player name in the
              spreadsheet
            </p>
          </Tabs.Item>
        </Tabs.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)} className="w-full">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;

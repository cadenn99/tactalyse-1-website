import { Modal } from "flowbite-react";
import React from "react";

interface Props {
  show: boolean;
}
function InfoModal({ show = false }: Props) {
  return (
    <Modal show size={"md"}>
      <Modal.Header>Some Header</Modal.Header>
      <Modal.Body className="dark:text-white">Lorem</Modal.Body>
    </Modal>
  );
}

export default InfoModal;

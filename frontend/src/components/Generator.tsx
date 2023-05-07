import {
  Card,
  ToggleSwitch,
  TextInput,
  Label,
  FileInput,
  Button,
} from "flowbite-react";
import React, { useState } from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { BsCalendarDate, BsFillPersonFill } from "react-icons/bs";

function Generator() {
  const [orderID, setOrderID] = useState(false);
  const [tactalysePlayer, setTactalysePlayer] = useState(false);
  return (
    <Card className="w-[50%] ml-auto">
      <h2 className="text-2xl dark:text-white">Generate Reports</h2>
      <ToggleSwitch
        checked={orderID}
        label="Fulfilling an order?"
        onChange={() => setOrderID(!orderID)}
      />
      <ToggleSwitch
        checked={tactalysePlayer}
        label="Tactalyse player?"
        onChange={() => setTactalysePlayer(!tactalysePlayer)}
      />
      {orderID && (
        <TextInput
          id="orderid"
          type="text"
          icon={AiOutlineBarcode}
          placeholder="Order id..."
          required={true}
        />
      )}
      {tactalysePlayer && (
        <div className="flex gap-2">
          <TextInput
            id="startDate"
            type="date"
            placeholder="Start date..."
            required={true}
            addon="Start"
            className="w-[50%]"
          />
          <TextInput
            id="endDate"
            type="date"
            placeholder="End date..."
            required={true}
            addon="End"
            className="w-[50%]"
          />
        </div>
      )}
      <TextInput icon={BsFillPersonFill} placeholder="Player name" />
      <Label htmlFor="file" value="League file" />
      <FileInput id="file" />
      <Label htmlFor="file" value="Player file" />
      <FileInput id="file" />
      <Button>Generate</Button>
    </Card>
  );
}

export default Generator;

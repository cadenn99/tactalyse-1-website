"use client";
import { ToastContext } from "@/contexts/ToastContext";
import { formHookToFormData } from "@/utils/FormToFormData";
import { generateReport } from "@/utils/api/requests";
import {
  Card,
  ToggleSwitch,
  TextInput,
  Label,
  FileInput,
  Button,
  Alert,
  Spinner,
} from "flowbite-react";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineBarcode } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { HiCheck, HiX } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

interface FormValues {
  id?: string;
  email?: string;
  startDate?: Date;
  endDate?: Date;
  playerName: string;
  player: File;
  league: File;
}

function Generator() {
  const [orderID, setOrderID] = useState(false);
  const [tactalysePlayer, setTactalysePlayer] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useContext(ToastContext);
  const { register, handleSubmit, resetField } = useForm<FormValues>();
  const { data: session } = useSession();

  /**
   * Function for converting useForm to FormData and posting the data
   *
   * @param data FormValues
   */
  const submitForm = async (data: FormValues) => {
    if (loading) return;

    try {
      setLoading(true);

      const form = formHookToFormData({ form: new FormData(), data });

      await generateReport(form, session!, orderID);

      toast?.setToast({
        message: "Emailed Report!",
        error: false,
        icon: <HiCheck className="h-5 w-5" />,
      });
    } catch (err: any) {
      toast?.setToast({
        message: err.message,
        error: true,
        icon: <HiX className="h-5 w-5" />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full md:w-[50%] ml-auto self-start">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-4"
        noValidate
      >
        <h2 className="text-2xl dark:text-white">Generate Reports</h2>
        <ToggleSwitch
          checked={orderID}
          label="Fulfilling an order?"
          onChange={() => {
            setOrderID(!orderID);
            resetField(orderID ? "id" : "email");
          }}
          className="self-start"
        />
        <ToggleSwitch
          checked={tactalysePlayer}
          label="Tactalyse player?"
          onChange={() => setTactalysePlayer(!tactalysePlayer)}
          className="self-start"
        />
        {orderID ? (
          <TextInput
            id="orderid"
            type="text"
            icon={AiOutlineBarcode}
            placeholder="Order id..."
            required={true}
            {...register("id")}
          />
        ) : (
          <TextInput
            id="email"
            type="text"
            icon={MdEmail}
            placeholder="Email"
            required={true}
            {...register("email")}
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
              {...register("startDate")}
            />
            <TextInput
              id="endDate"
              type="date"
              placeholder="End date..."
              required={true}
              addon="End"
              className="w-[50%]"
              {...register("endDate")}
            />
          </div>
        )}
        <TextInput
          icon={BsFillPersonFill}
          placeholder="Player name"
          type="text"
          {...register("playerName")}
        />
        <Label htmlFor="file" value="League file" />
        <FileInput id="file" {...register("league")} />
        <Label htmlFor="file" value="Player file" />
        <FileInput id="file" {...register("player")} />
        <Button
          type="submit"
          isProcessing={loading}
          processingSpinner={<Spinner color={"gray"} size={"sm"}></Spinner>}
        >
          Generate
        </Button>
      </form>
    </Card>
  );
}

export default Generator;

import { Alert, Button, Card, Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillPersonFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { formHookToFormData } from "@/utils/FormToFormData";
import { purchaseReport } from "@/utils/api/requests";
import { errorHandler } from "@/utils/ErrorHandler";
import { HiCheckCircle } from "react-icons/hi";

interface FormValues {
  playerName: string;
}

function Purchase() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [requestState, setRequestState] = useState({
    error: false,
    message: "",
  });
  const { data: session } = useSession();

  const submitForm = async (data: FormValues) => {
    setLoading(true);

    const report = await purchaseReport(data, session!);

    setLoading(false);

    errorHandler({ response: report, changeError: setRequestState });
  };

  return (
    <Card className="w-full self-start">
      {requestState.message !== "" && (
        <Alert color="success" icon={HiCheckCircle}>
          <span>
            <span className="font-medium">{requestState.message}</span>
          </span>
        </Alert>
      )}
      <form
        className="w-full gap-2 flex flex-col"
        noValidate
        onSubmit={handleSubmit(submitForm)}
      >
        <h2 className="dark:text-white text-2xl">Purchase report</h2>
        <TextInput
          id="email"
          type="text"
          sizing={"md"}
          icon={BsFillPersonFill}
          placeholder="Playername"
          {...register("playerName")}
        />
        <div className="flex gap-3 items-end justify-end">
          <span className="text-[#9CA3AF]">Total:</span>
          <span className="text-[#9CA3AF] text-3xl">€49,-</span>
        </div>
        <Button
          type="submit"
          isProcessing={loading}
          processingSpinner={<Spinner color={"gray"} size={"sm"}></Spinner>}
          disabled={session?.user.isEmployee ?? false}
          className="w-full"
        >
          Purchase
        </Button>
      </form>
    </Card>
  );
}

export default Purchase;

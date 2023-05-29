import { Button, Card, Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillPersonFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { purchaseReport } from "@/utils/api/requests";
import { HiCheck, HiX } from "react-icons/hi";
import { ToastContext } from "@/contexts/ToastContext";

interface FormValues {
  playerName: string;
}

function Purchase() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const toast = useContext(ToastContext);
  const { push } = useRouter();

  const { data: session } = useSession();

  const submitForm = async (data: FormValues) => {
    try {
      setLoading(true);

      const report = await purchaseReport(data, session!);

      toast?.setToast({
        message: "You will be redirected in a moment!",
        error: false,
        icon: <HiCheck className="h-5 w-5" />,
      });

      setTimeout(() => {
        push(report.data.checkOutUrl);
      }, 3000);
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
    <Card className="w-full self-start">
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
          <span className="text-black dark:text-[#9CA3AF]">Total:</span>
          <span className="text-black dark:text-[#9CA3AF] text-3xl">€49,-</span>
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

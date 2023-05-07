import { Button, Card, Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { BsFillPersonFill } from "react-icons/bs";
import { ReportInput } from "../../types/types";
import { useSession } from "next-auth/react";

function Purchase() {
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { data: session } = useSession();

  /**
   * This constant submits input values to our backend and appropriately deals with the response.
   * @param values input values following the form of the Inputs interface.
   */
  const handlePurchase: SubmitHandler<{ id: string }> = async (values) => {
    setLoading(true);

    await fetch("/backend/checkout/pay", {
      method: "POST",
      body: JSON.stringify({
        playerName: values.id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken || ""}`,
      },
    })
      .then((res) => {
        setLoading(false);
        switch (res.status) {
          case 500:
            push("/serverError");
            break;
          case 200:
            // setSuccess(true);
            res
              .json()
              .then((data) => {
                push(data.checkOutUrl);
              })
              .catch((e) => {
                push("/serverError");
              })
              .finally(() => {
                setLoading(false);
                // setError("our backend ran into a problem");
              });
            break;
          default:
            // setError(res.statusText); //TODO: expand on this
            setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        push("/serverError");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="w-full self-start">
      <h2 className="dark:text-white text-2xl">Purchase report</h2>
      <TextInput
        id="email"
        type="text"
        sizing={"md"}
        icon={BsFillPersonFill}
        placeholder="Playername"
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <div className="flex gap-3 items-end justify-end">
        <span className="text-[#9CA3AF]">Total:</span>
        <span className="text-[#9CA3AF] text-3xl">€49,-</span>
      </div>
      <Button
        onClick={() => handlePurchase({ id: playerName })}
        isProcessing={loading}
        processingSpinner={<Spinner color={"gray"} size={"sm"}></Spinner>}
      >
        Purchase
      </Button>
    </Card>
  );
}

export default Purchase;

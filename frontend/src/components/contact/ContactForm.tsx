import { formHookToFormData } from "@/utils/FormToFormData";
import axios from "axios";
import { Button, Card, Spinner, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";

interface FormValues {
  email: string;
  message: string;
}

function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const submitForm = async (value: FormValues) => {
    setLoading(true);
    await axios({
      url: "https://formsubmit.co/ajax/ccc62f6b4b7b07c43cede53d39879363",
      method: "POST",
      data: value,
    });

    setLoading(false);
    reset({ email: "", message: "" });
  };
  return (
    <Card className="w-[500px] max-w-[90%]">
      <h2 className="text-2xl dark:text-white">Contact</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(submitForm)}>
        <TextInput
          id="email"
          type="email"
          placeholder="name@flowbite.com"
          icon={MdAlternateEmail}
          {...register("email")}
        />
        <Textarea
          id="message"
          placeholder="Leave a message..."
          required={true}
          rows={4}
          {...register("message")}
        />
        <input
          type="hidden"
          name="_captcha"
          value="false"
          className="hidden"
        ></input>
        <Button
          type="submit"
          isProcessing={loading}
          processingSpinner={<Spinner color={"gray"} size={"sm"}></Spinner>}
        >
          {!loading ? "Submit" : ""}
        </Button>
      </form>
    </Card>
  );
}

export default ContactForm;

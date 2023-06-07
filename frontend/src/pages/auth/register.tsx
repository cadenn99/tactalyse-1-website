import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInput, ToastInterface } from "../../../types/types";
import { useRouter } from "next/router";
import { Button, Card, Label, Spinner, TextInput, Toast } from "flowbite-react";
import { MdAlternateEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";
import { HiCheck, HiX } from "react-icons/hi";
import Link from "next/link";
import ToastComponent from "@/components/general/Toast";
import { useDark } from "@/hooks/useDark";
import { register as registerRequest } from "@/utils/api/requests";
import { ToastContext } from "@/contexts/ToastContext";

interface FormValues {
  email: string;
  password: string;
}

function Register() {
  const { data: session } = useSession();
  const toast = useContext(ToastContext);

  useDark();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { push } = useRouter();

  const handleRegister = async (values: FormValues) => {
    if (loading) return;
    try {
      setLoading(true);

      const res = await registerRequest(values);

      if (res?.status !== 200) throw Error(res.data.message);

      toast?.setToast({
        message: "Registered succesfully",
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
      reset({ email: "", password: "" });
    }
  };

  useMemo(() => {
    if (session) push("/");
  }, [session, push]);

  return (
    <div>
      <Head>
        <title>Login | Tactalyse</title>
      </Head>
      <main className="max-w-7xl mx-auto mt-0 flex flex-col gap-10 relative min-h-screen">
        <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
          <div className="w-[400px] p-4 max-w-[100vw]">
            <Card className="w-full">
              <img
                src="../logo_dark.png"
                className="hidden dark:block w-[50%] mx-auto cursor-pointer"
                onClick={() => push("/")}
              />
              <img
                src="https://www.tactalyse.com/wp-content/uploads/2019/07/tactalyse-sport-analyse.png"
                className="dark:hidden w-[50%] mx-auto cursor-pointer"
                onClick={() => push("/")}
              />
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(handleRegister)}
              >
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    type="text"
                    sizing={"md"}
                    data-testid="email"
                    icon={MdAlternateEmail}
                    {...register("email")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="password" value="Password" />
                  <TextInput
                    id="password"
                    type="password"
                    sizing={"md"}
                    data-testid="password"
                    icon={BsKeyFill}
                    {...register("password")}
                  />
                </div>
                <Button
                  className="mt-3"
                  isProcessing={loading}
                  type="submit"
                  processingSpinner={
                    <Spinner color={"gray"} size={"sm"}></Spinner>
                  }
                >
                  {!loading && <span>Sign up</span>}
                </Button>
                <span className="text-right dark:text-[#D1D5DB]">
                  Already have an account?
                  <Link
                    href="/auth/login"
                    className="font-bold dark:text-white"
                  >
                    Sign in!
                  </Link>
                </span>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;

import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInput, ToastInterface } from "../../../types/types";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Label,
  Spinner,
  TextInput,
  Toast,
  useTheme,
} from "flowbite-react";
import { MdAlternateEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import ToastComponent from "@/components/general/Toast";
import { useDark } from "@/hooks/useDark";
import { ToastContext } from "@/contexts/ToastContext";

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const theme = useTheme().theme.textInput;
  useDark();
  const { data: session } = useSession();
  const toast = useContext(ToastContext);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const handleLogin = async (values: FormValues) => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        ...values,
        callbackUrl: `${window.location.origin}`,
      });

      if (res?.error)
        toast?.setToast({
          message: res.error,
          error: true,
          icon: <HiX className="h-5 w-5" />,
        });

      if (res?.url) push(res.url);
    } catch (err: any) {
      toast?.setToast({
        message: err.response.data.message,
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
                onSubmit={handleSubmit(handleLogin)}
              >
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    type="text"
                    sizing={"md"}
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
                  {!loading && <span>Sign in</span>}
                </Button>
                <span className="text-right dark:text-[#D1D5DB]">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="font-bold dark:text-white"
                  >
                    Sign up!
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

export default Login;

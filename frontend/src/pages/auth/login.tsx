import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInput, ToastInterface } from "../../../types/types";
import { useRouter } from "next/router";
import { Button, Card, Label, Spinner, TextInput, Toast } from "flowbite-react";
import { MdAlternateEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";
import { HiX } from "react-icons/hi";
import Link from "next/link";

function Login() {
  const { data: session } = useSession();
  const [toast, setToast] = useState<ToastInterface>({
    message: null,
    error: false,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", "false");
    }

    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const handleLogin: SubmitHandler<LoginInput> = async (values) => {
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });

    if (res?.error)
      setToast({
        message: res.error,
        error: true,
      });

    setLoading(false);

    if (res?.url) push(res.url);
  };

  useMemo(() => {
    if (session) push("/");
  }, [session, push]);

  return (
    <div>
      <Head>
        <title>Login | Tactalyse</title>
      </Head>
      {toast.error && (
        <Toast className="absolute top-[5%] right-[5%] md:top-10 md:right-10">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal capitalize">
            {toast.message}
          </div>
          <Toast.Toggle
            onClick={() => setToast({ message: null, error: false })}
          />
        </Toast>
      )}
      <main className="max-w-7xl mx-auto mt-0 flex flex-col gap-10 relative min-h-screen">
        <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
          <div className="w-[400px] p-4 max-w-[100vw]">
            <Card className="w-full">
              <img
                src="https://www.tactalyse.com/wp-content/uploads/2019/07/tactalyse-sport-analyse.png"
                className="w-[50%] mx-auto cursor-pointer"
                onClick={() => push("/")}
              />
              <form className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    type="text"
                    sizing={"md"}
                    icon={MdAlternateEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="password" value="Password" />
                  <TextInput
                    id="password"
                    type="password"
                    sizing={"md"}
                    icon={BsKeyFill}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="mt-3"
                  onClick={() => handleLogin({ email, password })}
                  isProcessing={loading}
                  processingSpinner={
                    <Spinner color={"gray"} size={"sm"}></Spinner>
                  }
                >
                  {!loading && <span>Sign up</span>}
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

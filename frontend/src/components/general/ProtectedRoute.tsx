import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  children: JSX.Element | JSX.Element[];
  employeeOnly?: boolean;
  customerOnly?: boolean;
}

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute: any = ({
  children,
  employeeOnly = false,
  customerOnly = false,
}: Props) => {
  const { status, data: session } = useSession();
  const { push } = useRouter();

  if (employeeOnly) {
    if (isBrowser() && session && !session.user.isEmployee) push("/");
  }

  if (customerOnly) {
    if (isBrowser() && session && session.user.isEmployee) push("/");
  }

  if (isBrowser() && session) return children;

  if (isBrowser() && status !== "loading") push("/auth/login");
};

export default ProtectedRoute;

import React from "react";
import { ToastInterface } from "../../../types/types";
import { Toast } from "flowbite-react";

interface Props {
  toast: ToastInterface;
  setToast: Function;
  icon: JSX.Element;
}
function ToastComponent({ toast, setToast, icon }: Props) {
  return (
    <Toast
      className={`absolute top-[5%] right-[5%] md:top-10 md:right-10 z-[100] border-2 ${
        toast.error ? "!border-red-500" : "!border-green-500"
      }`}
    >
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          toast.error
            ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
            : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
        }`}
      >
        {icon}
      </div>
      <div className="ml-3 text-sm font-normal capitalize">{toast.message}</div>
      <Toast.Toggle
        onClick={() => setToast({ message: null, error: false, icon: null })}
      />
    </Toast>
  );
}

export default ToastComponent;

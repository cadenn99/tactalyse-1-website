import ToastComponent from "@/components/general/Toast";
import React, {
  ReactElement,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ToastInterface } from "../../types/types";

interface Props {
  children: ReactElement | ReactElement[];
}

interface ContextType {
  toast: ToastInterface | undefined;
  setToast: (toast: ToastInterface) => void;
}

const ToastContext = createContext<ContextType | null>(null);

function ToastContextProvider({ children }: Props) {
  const [toast, setToast] = useState<undefined | ToastInterface>();

  const updateToast = useCallback((toast: ToastInterface) => {
    setToast(toast);

    setTimeout(() => {
      setToast(undefined);
    }, 5000);
  }, []);

  const contextValue = useMemo(
    () => ({
      toast,
      setToast: updateToast,
    }),
    [toast, updateToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && (
        <ToastComponent toast={toast} setToast={setToast} icon={toast.icon} />
      )}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastContextProvider };

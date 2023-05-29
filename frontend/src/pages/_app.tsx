import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CustomFlowbiteTheme, Flowbite, useTheme } from "flowbite-react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { ToastContextProvider } from "@/contexts/ToastContext";

const progress = new ProgressBar({
  size: 3,
  color: "#FF2301",
  className: "text-[#FF2301]",
  delay: 0,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const currentTheme = useTheme().theme;
  const theme: CustomFlowbiteTheme = {
    timeline: {
      item: {
        point: {
          marker: {
            icon: {
              base: "text-[#FF2301]",
              wrapper:
                "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-200 ring-8 ring-white dark:bg-red-900 dark:ring-gray-900",
            },
          },
        },
      },
    },
    button: {
      base: "text-white group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg rounded-md !bg-[#FF2301] hover:!bg-[#FF2301]/80 focus:!ring-0 focus:!ring-transparent",
    },
    tab: {
      tablist: {
        tabitem: {
          styles: {
            default: {
              active: {
                on: "text-[#FF2301]",
              },
            },
          },
        },
      },
    },
    toggleSwitch: {
      toggle: {
        checked: {
          on: "toggle-bg h-6 w-11 rounded-full border group-focus:ring-4 group-focus:!ring-[#FF2301]/25 after:translate-x-full after:border-white  !bg-[#FF2301] !border-[#FF2301]",
          off: "toggle-bg h-6 w-11 rounded-full border group-focus:ring-4 group-focus:!ring-[#FF2301]/25 border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700",
        },
      },
    },
    textInput: {
      field: {
        input: {
          base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:!border-[#FF2301]/80 focus:!ring-[#FF2301]/80 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:!border-[#FF2301]/80 dark:focus:!ring-[#FF2301]/80 pl-10 rounded-lg p-2.5 text-sm",
        },
      },
    },
    textarea: {
      base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:!border-[#FF2301]/80 focus:!ring-[#FF2301]/80 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:!border-[#FF2301]/80 dark:!focus:ring-[#FF2301]/80",
    },
    fileInput: {
      field: {
        input: {
          base:
            currentTheme.fileInput.field.input.base +
            " focus:!border-[#FF2301]/80 focus:!ring-[#FF2301]/80 dark:focus:!border-[#FF2301]/80 dark:focus:!ring-[#FF2301]/80",
        },
      },
    },
  };
  return (
    <ThemeContextProvider>
      <ToastContextProvider>
        <SessionProvider session={session}>
          <Flowbite theme={{ theme }}>
            <Component {...pageProps} />
          </Flowbite>
        </SessionProvider>
      </ToastContextProvider>
    </ThemeContextProvider>
  );
}

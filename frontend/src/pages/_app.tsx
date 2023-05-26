import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

// const progress = new ProgressBar({
//   size: 3,
//   color: "#FF2301",
//   className: "text-[#FF2301]",
//   delay: 100,
// });

// Router.events.on("routeChangeStart", progress.start);
// Router.events.on("routeChangeComplete", progress.finish);
// Router.events.on("routeChangeError", progress.finish);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
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
      base: "text-white group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg rounded-md !bg-[#FF2301] hover:!bg-[#FF2301]/80 focus:!ring-0 focus:ring-transparent",
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
        },
      },
    },
  };
  return (
    <SessionProvider session={session}>
      <Flowbite theme={{ theme }}>
        <Component {...pageProps} />
      </Flowbite>
    </SessionProvider>
  );
}

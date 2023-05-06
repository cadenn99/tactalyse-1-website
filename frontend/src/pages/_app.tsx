import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";

/**
 * This function wraps the Next-Auth sessionprovider around our app.
 * @param param0 default parameter.
 * @returns -
 */
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
  };
  return (
    <SessionProvider session={session}>
      <Flowbite theme={{ theme }}>
        <Component {...pageProps} />
      </Flowbite>
    </SessionProvider>
  );
}

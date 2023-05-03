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
    navbar: {
      link: {
        active: {},
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

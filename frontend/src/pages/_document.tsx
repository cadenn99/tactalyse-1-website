import { Html, Head, Main, NextScript } from "next/document";

/**
 * This function returns the template for pages used in this project.
 * @returns Template for pages in this project.
 */
export default function Document() {
  return (
    <Html lang="en" className="overflow-x-hidden">
      <Head>
        <meta
          name="description"
          content="Homepage for football report generation by Tactalyse"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="">
        <div className="bg-gray-100 dark:bg-gray-900">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}

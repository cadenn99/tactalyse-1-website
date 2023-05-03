import { Html, Head, Main, NextScript } from "next/document";

/**
 * This function returns the template for pages used in this project.
 * @returns Template for pages in this project.
 */
export default function Document() {
  return (
    <Html lang="en" className="overflow-x-hidden">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

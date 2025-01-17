/* eslint-disable @next/next/no-title-in-document-head */
import { zumjiLogo } from "@/constants/images";
import { metaDataDescription } from "@/constants/texts";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Zumji</title>
        <meta name="description" content={metaDataDescription} />
        <link
          rel="icon"
          href={zumjiLogo}
        />
        <link
          rel="apple-touch-icon"
          href={zumjiLogo}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/* eslint-disable @next/next/no-title-in-document-head */
import { oGImage, zumjiLogo } from "@/constants/images";
import { metaDataDescription } from "@/constants/texts";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Zumji</title>
        <meta name="description" content={metaDataDescription} />
        <link rel="icon" href={zumjiLogo} />
        <link rel="apple-touch-icon" href={zumjiLogo} />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="Zumji" />
        <meta property="og:description" content={metaDataDescription} />
        <meta property="og:image" content={oGImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.zumji.xyz" /> 
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

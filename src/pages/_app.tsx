import { App } from 'konsta/react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

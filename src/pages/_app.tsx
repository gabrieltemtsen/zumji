import { App } from 'konsta/react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ConnectWalletButtonProvider } from '@/context/ConnectContext';


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    celo,
    celoAlfajores,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [celoAlfajores]
      : []),
  ],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "Fuse Pay",
  projectId: "063d0bf7cbe66b2e8291f29dc850fb19",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
export default function MyApp({ Component, pageProps }: AppProps) {
  const [deviceType, setDeviceType] = useState<any>(null);
  const maintenance = false;

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isAndroid = userAgent.match(/Android/i);
    const isIOS = userAgent.match(/iPhone|iPad|iPod/i);
    const isLaptop = !isAndroid && !isIOS;

    if (isAndroid) {
      setDeviceType("android");
    } else if (isIOS) {
      setDeviceType("ios");
    } else {
      setDeviceType("laptop");
    }
  }, []);
  const theme = deviceType === "ios" ? "ios" : "material";  
  
  if (maintenance) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">Zumji is currently under maintenance</h1>
      </div>
    );
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ConnectWalletButtonProvider>
        <App dark={true} safeAreas={true} theme={theme}>
          <Component {...pageProps} />
        </App>
        </ConnectWalletButtonProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Sheet,
  BlockTitle,
  Chip,
} from "konsta/react";
import React from "react";
import { FaHandHoldingUsd, FaBriefcase } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { SiCoinmarketcap } from "react-icons/si";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { getAccount } from "@wagmi/core";
import Link from "next/link";
import { finance, home, p2e, profile } from "@/constants/urls/urls";
import { usePathname } from "next/navigation";

const Layout = ({ children }: any) => {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();
  const account = getAccount();
  const pathName = usePathname();

  useEffect(() => {
    if ((window as any).ethereum && (window as any).ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: new InjectedConnector() });
    }
  }, []);

  return (
    <Page>
      <div className="relative min-h-screen bg-gradient-to-r from-yellow-gradient-start to-yellow-gradient-end">
        <Navbar
          title="Zumji"
          right={
            <ConnectButton
              showBalance={{
                smallScreen: true,
                largeScreen: false,
              }}
            />
          }
          colors={{
            bgIos: 'bg-black',
            bgMaterial: 'bg-black',
            textIos: 'text-white',
            textMaterial: 'text-white',
          }} />
        <div className="normalHeight ">
          {children}
        </div>

        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-black border-t border-gray-200 ">
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <Link
              href="/"
              type="button"
              className="inline-flex flex-col items-center justify-center text-white px-5 hover:bg-yellow-800 group"
            >
              <IoIosHome className={`${pathName === home && 'text-yellow-500'}`} />
              <span className={`mt-1 text-sm text-white ${pathName === home && 'text-yellow-500'}  group-hover:text-white`}>
                Home
              </span>
            </Link>
            <Link
              href="/finance"
              type="button"
              className={`inline-flex flex-col text-white items-center  justify-center px-5 hover:bg-yellow-800 group`}
            >
              <SiCoinmarketcap className={`${pathName === finance && 'text-yellow-500'}`} />
              <span className={`mt-1 text-sm text-white ${pathName === finance && 'text-yellow-500'}  group-hover:text-white`}>
                Finance
              </span>
            </Link>
            <Link
              href="/p2e"
              type="button"
              className="inline-flex flex-col text-white items-center justify-center px-5 hover:bg-yellow-800 group"
            >
              <RiBillLine className={`${pathName === p2e && 'text-yellow-500'}`} />
              <span className={`mt-1 text-sm text-white ${pathName === p2e && 'text-yellow-500'}  group-hover:text-white`}>
                P2E
              </span>
            </Link>

            <Link
              href="/profile"
              type="button"
              className="inline-flex flex-col text-white items-center justify-center px-5 hover:bg-yellow-800 group"
            >
              <RxAvatar className={`${pathName === profile && 'text-yellow-500'}`} />
              <span className={`mt-1 text-sm text-white ${pathName === profile && 'text-yellow-500'}  group-hover:text-white`}>
                Profile
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Layout;

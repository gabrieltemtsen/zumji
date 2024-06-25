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
  
  const Layout = ({ children }: any) => {
    const [hideConnectBtn, setHideConnectBtn] = useState(false);
    const { connect } = useConnect();
    const account = getAccount();
  
    useEffect(() => {
      if ((window as any).ethereum && (window as any).ethereum.isMiniPay) {
        setHideConnectBtn(true);
        connect({ connector: new InjectedConnector() });
      }
    }, []);
  
    return (
      <Page>
        <div className="relative min-h-screen bg-gradient-to-r from-yellow-gradient-start to-yellow-gradient-end">
    
      <div className="normalHeight ">
          <div className=" flex items-center pr-2">
            {!hideConnectBtn && (
              <div className="w-full  conn mt-1 p-1">
                <ConnectButton
                  showBalance={{
                    smallScreen: true,
                    largeScreen: false,
                  }}
                />
              </div>
            )}
          </div>
          {children}
        </div>
  
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-black border-t border-gray-200 ">
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <Link
              href="/"
              type="button"
              className="inline-flex flex-col items-center justify-center text-white px-5 hover:bg-yellow-800 group"
            >
              <IoIosHome />
              <span className="mt-1 text-sm text-white  group-hover:text-white ">
                Home
              </span>
            </Link>
            <Link
              href="/finance"
              type="button"
              className="inline-flex flex-col text-white items-center justify-center px-5 hover:bg-yellow-800 group"
            >
            <SiCoinmarketcap />
            <span className="mt-1 text-sm text-white  group-hover:text-white ">
                Finance
              </span>
            </Link>
            <Link
              href="/p2e"
              type="button"
               className="inline-flex flex-col text-white items-center justify-center px-5 hover:bg-yellow-800 group"
            >
              {/* <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
              </svg> */}
              <RiBillLine />
              <span className="mt-1 text-sm text-white  group-hover:text-white ">
                P2E
              </span>
            </Link>
  
            <Link
              href="/profile"
              type="button"
              className="inline-flex flex-col text-white items-center justify-center px-5 hover:bg-yellow-800 group"
            >
              <RxAvatar />
              <span className="mt-1 text-sm text-white  group-hover:text-white ">
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
  
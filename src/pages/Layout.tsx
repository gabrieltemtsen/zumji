import React, { useEffect, useState } from "react";
import { Page, Navbar, Icon } from 'konsta/react';
import { IoIosHome } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { SiCoinmarketcap } from "react-icons/si";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useConnect } from "wagmi";
import { getAccount } from "@wagmi/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomConnectButton } from "@/components/CustomConnectButton";
import { home, finance, p2e, profile } from "@/constants/urls/urls";
import Image from "next/image";
import { zumjiLogo } from "@/constants/images";
import ZumjiLogo from "@/components/logo/Logo";
import useGetIsOnboarded from "@/hooks/use-get-is-onboarded/useGetIsOnboarded";
import { useConnectState } from "@/hooks/use-connect/useConnect";

const Layout = ({ children }: { children: React.ReactNode; }) => {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();
  const account = getAccount();
  const pathName = usePathname();
  const { isPageLoading, isOnboarded } = useGetIsOnboarded();
  const { isConnected } = useConnectState();

  const navItems = [
    { label: "Home", icon: IoIosHome, href: home },
    { label: "Finance", icon: SiCoinmarketcap, href: finance },
    { label: "P2E", icon: RiBillLine, href: p2e },
    { label: "Profile", icon: RxAvatar, href: profile },
  ];

  useEffect(() => {
    if ((window as any).ethereum?.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: new InjectedConnector() });
    }
  }, []);

  const NavItem = ({ label, icon: Icon, href }: { label: string; icon: React.ComponentType<{ className?: string; }>; href: string; }) => (
    <Link
      href={href}
      className={`inline-flex flex-col items-center justify-center px-5 group ${pathName === href ? "text-yellow-500" : "text-white"
        } hover:bg-yellow-800`}
    >
      <Icon className={`text-lg ${pathName === href ? "text-yellow-500" : "text-white"} group-hover:text-white`} />
      <span className={`mt-1 text-sm ${pathName === href ? "text-yellow-500" : "text-white"} group-hover:text-white`}>
        {label}
      </span>
    </Link>
  );

  return (
    <Page>
      <div className="relative min-h-screen bg-gradient-to-b from-yellow-700/[4.79] via-yellow-800">
        {/* Navbar */}
        <Navbar
          title="Zumji"
          right={<CustomConnectButton />}
          left={
            <Link href='/' className="" >
              <ZumjiLogo height={40} width={40} className="rounded-full"/>
            </Link>
          }
          colors={{
            bgIos: "bg-black",
            bgMaterial: "bg-black",
            textIos: "text-white",
            textMaterial: "text-white",
          }}
        />

        {/* Main Content */}
        <div className="normalHeight">{children}</div>

        {/* Footer Navigation */}
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-black border-t border-gray-200">
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            {isOnboarded && isConnected && navItems.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Layout;

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
import { home, finance, p2e, profile, stats, cube } from "@/constants/urls/urls";
import { FaChartBar } from "react-icons/fa6";
import { FaCube } from "react-icons/fa";
import ZumjiLogo from "@/components/logo/Logo";
import useGetIsOnboarded from "@/hooks/use-get-is-onboarded/useGetIsOnboarded";
import { useConnectState } from "@/hooks/use-connect/useConnect";

const Layout = ({ subNavBarTitle, children }: { subNavBarTitle?: string, children: React.ReactNode; }) => {
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
    { label: "Stats", icon: FaChartBar, href: stats },
    { label: "Cube", icon: FaCube, href: cube },
    { label: "Profile", icon: RxAvatar, href: profile },
  ];

  useEffect(() => {
    if ((window as any).ethereum?.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: new InjectedConnector() });
    }
  }, []);

  const shouldShowBottomNav = isOnboarded && isConnected;
  const topPadding = subNavBarTitle ? 'pt-32' : 'pt-16';
  const bottomPadding = shouldShowBottomNav ? 'pb-20' : 'pb-4';

  const NavItem = ({ label, icon: Icon, href }: { label: string; icon: React.ComponentType<{ className?: string; }>; href: string; }) => (
    <Link
      href={href}
      className={`relative flex flex-col items-center justify-center px-3 py-2 transition-all duration-300 ease-in-out group ${
        pathName === href 
          ? "text-yellow-400" 
          : "text-gray-300 hover:text-white"
      }`}
    >
      {pathName === href && (
        <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-400/30" />
      )}
      <div className={`relative p-2 rounded-xl transition-all duration-300 ${
        pathName === href 
          ? "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 shadow-lg shadow-yellow-400/20" 
          : "group-hover:bg-gradient-to-br group-hover:from-white/10 group-hover:to-white/5"
      }`}>
        <Icon className={`text-xl transition-all duration-300 ${
          pathName === href 
            ? "text-yellow-400 drop-shadow-sm" 
            : "text-gray-300 group-hover:text-white group-hover:scale-110"
        }`} />
      </div>
      <span className={`mt-1 text-xs font-medium transition-all duration-300 ${
        pathName === href 
          ? "text-yellow-400 font-semibold" 
          : "text-gray-400 group-hover:text-white"
      }`}>
        {label}
      </span>
    </Link>
  );

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <Navbar
            title="Zumji"
            titleClassName="text-md md:text-xl lg:text-2xl logo-font text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text font-bold"
            right={<CustomConnectButton />}
            left={
              <Link href='/' className="flex items-center space-x-2 group">
                <div className="relative p-1 rounded-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-yellow-400/20 group-hover:to-yellow-600/20">
                  <ZumjiLogo height={40} width={40} className="rounded-full h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105" />
                </div>
              </Link>
            }
            colors={{
              bgIos: "bg-transparent",
              bgMaterial: "bg-transparent",
              textIos: "text-white",
              textMaterial: "text-white",
            }}
          />
        </div>
      </div>

      {subNavBarTitle && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800/30">
          <div className="px-4 sm:px-6 lg:px-8">
            <Navbar 
              title={subNavBarTitle} 
              titleClassName="text-white font-semibold"
              colors={{
                bgIos: "bg-transparent",
                bgMaterial: "bg-transparent",
                textIos: "text-white",
                textMaterial: "text-white",
              }}
            />
          </div>
        </div>
      )}

      <div className={`flex-1 overflow-y-auto ${topPadding} ${bottomPadding} scroll-smooth`}>
        {children}
      </div>

      {shouldShowBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-gray-800/50 shadow-2xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center h-16">
                {navItems.map((item) => (
                  <NavItem key={item.label} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-yellow-400/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-yellow-400/5 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-64 bg-gradient-to-r from-transparent via-yellow-400/3 to-transparent transform -translate-y-1/2" />
      </div>
    </div>
  );
};

export default Layout;

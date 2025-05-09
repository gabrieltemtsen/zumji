"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createContext, useEffect, useState, ReactNode } from "react";

export type ConnectContextType = {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
};

const defaultProvider: ConnectContextType = {
  isConnected: false,
  setIsConnected: () => Boolean,
};

const ConnectContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const ConnectWalletButtonProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState<boolean>(defaultProvider.isConnected);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  //   const initAuth = async () => {
  //     const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);

  //     if (storedToken) {
  //       try {
  //         setIsConnected(true);
  //         const getLoggedInUser = async () => {
  //           const res: any = await API.loggedInUser();
  //           if (res?.data) {
  //             setUser({ ...res.data, role: res?.data?.role?.title });
  //           }
  //         };

  //         await getLoggedInUser();
  //       } catch (error) {
  //         localStorage.removeItem(authConfig.userData);
  //         localStorage.removeItem('refreshToken');
  //         localStorage.removeItem('accessToken');
  //         setUser(null);
  //         if (authConfig.onTokenExpiration === "logout" && !pathname.includes("login")) {
  //           router.replace(loginUrl);
  //         }
  //       } finally {
  //         setIsConnected(false);
  //       }
  //     } else {
  //       setIsConnected(false);
  //     }
  //   };

  //   initAuth();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleLogin = async (connectState: boolean) => {
    setIsConnected(connectState);
  };



  const values = {
    isConnected,
    setIsConnected,
    login: handleLogin,
  };

  return <ConnectContext.Provider value={values}>{children}</ConnectContext.Provider>;
};

export { ConnectContext, ConnectWalletButtonProvider };

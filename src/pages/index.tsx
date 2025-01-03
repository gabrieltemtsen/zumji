/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  BlockTitle,
  Preloader,
  Chip,
  Icon,
} from "konsta/react";
import Layout from "./Layout";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import { writeContract, readContract, waitForTransaction } from "@wagmi/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight } from "react-icons/fa";
import AnimateFromLeft from "@/animation/animate-from-left";
import AnimateFromRight from "@/animation/animate-from-right";
import AnimateFromBottom from "@/animation/animate-from-bottom";
import { homeBackground } from "@/constants/images";

export default function Home() {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const maintenance = true;

  const handleOnboard = async () => {
    try {
      setInTxn(true);
      const tx = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "onboard",
        args: [],
      });
      await waitForTransaction(tx);
      toast.success("Onboarding successful!");
      fetchOnboardStatus();
    } catch (error) {
      toast.error("Onboarding failed!");
      console.error("Onboarding Error:", error);
    } finally {
      setInTxn(false);
    }
  };

  const fetchOnboardStatus = async () => {
    try {
      const onboarded = await readContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "isUserOnboarded",
        args: [address],
      });
      setIsOnboarded(onboarded);
    } catch (error) {
      console.error("Fetch Onboard Status Error:", error);
    }
  };

  useEffect(() => {
    if (address) fetchOnboardStatus();
  }, [address]);

  if (maintenance) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">Zumji is currently under maintenance</h1>
      </div>
    );
  }

  return (
    <Layout>
      <div
        className="h-[90vh]"
        style={{ backgroundImage: `url(${homeBackground})` }}
      >
        <section className="bg-gradient-to-b from-yellow-700/10 via-yellow-800 h-full">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
            <a
              href="https://celo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm rounded-full mb-7 bg-gray-800 text-white hover:bg-gray-700"
            >
              <Chip
                media={
                  <img
                    alt="Celo Logo"
                    className="ios:h-7 material:h-6 rounded-full"
                    src="/celo.png"
                  />
                }
                className="text-xs bg-black rounded-full text-white px-4 py-1.5 mr-3"
              />
              <span className="text-sm font-medium ml-2">Powered by Celo</span>
              <Icon
                ios={<FaChevronRight />}
                material={<FaChevronRight />}
                className="w-5 h-5 ml-2"
              />
            </a>
            <AnimateFromRight>
              <h1 className="mb-4 text-4xl font-extrabold text-white tracking-tight lg:text-6xl">
                Transform Your Business with Zumji: Loyalty, Rewards, and More
              </h1>
            </AnimateFromRight>
            <AnimateFromLeft>
              <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48">
                Empowering SMEs with Staking, Borrowing, and Innovative Rewards on Celo
              </p>
            </AnimateFromLeft>
            <AnimateFromBottom>
              <div className="flex justify-center space-x-4 mb-8 lg:mb-16">
                {isOnboarded ? (
                  <Link
                    href="/finance"
                    className="mt-6 max-w-md inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gray-600 rounded-full shadow-lg hover:shadow-black focus:ring-2 focus:ring-yellow-600"
                  >
                    Stats
                    <FaChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                ) : (
                  <button
                    onClick={handleOnboard}
                    className="mt-6 max-w-md inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-yellow-700 rounded-full shadow-lg hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-600"
                    disabled={inTxn}
                  >
                    {inTxn ? <Preloader className="mt-3" /> : "Join Zumji"}
                  </button>
                )}
              </div>
            </AnimateFromBottom>
          </div>
        </section>
      </div>
      <ToastContainer />
    </Layout>
  );
}

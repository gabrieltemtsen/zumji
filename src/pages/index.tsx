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
import {
  ZUMJI_ABI,
  ZUMJI_CONTRACT,
  USDT_ABI,
  USDT_CONTRACT_ADDRESS,
} from "@/utils/contracts";
import { ethers } from "ethers";
import { writeContract, readContract, waitForTransaction } from "@wagmi/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import AnimateFromLeft from "@/animation/animate-from-left";
import AnimateFromRight from "@/animation/animate-from-right";
import AnimateFromBottom from "@/animation/animate-from-bottom";
import { homeBackground } from "@/constants/images";
import Features from "@/components/home/Features";

export default function Home() {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  const handleOnboard = async () => {
    try {
      setInTxn(true);
      const balance: any = await readContract({
        address: USDT_CONTRACT_ADDRESS,
        abi: USDT_ABI,
        functionName: "balanceOf",
        args: [address],
      });
      if (ethers.BigNumber.from(balance).lte(0)) {
        toast.error("Insufficient cUSD balance to onboard");
        setInTxn(false);
        return;
      }
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
      setIsOnboarded(onboarded as boolean);
    } catch (error) {
      console.error("Fetch Onboard Status Error:", error);
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (address) fetchOnboardStatus();
  }, [address]);

  return (
    <Layout>
      <div
        className="relative h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${homeBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Improved gradient overlay for better blending */}
        <div className="absolute h-full inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />

        <section className="relative z-10 flex items-center h-full">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
            <a
              href="https://celo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-1 py-1 pr-4 pl-4 text-sm rounded-full mb-7 bg-gray-800 text-white hover:bg-gray-700"
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
              <span className="text-xs sm:text-sm font-medium ml-2">Powered by Celo</span>
              <Icon
                ios={<FaChevronRight />}
                material={<FaChevronRight />}
                className="w-5 h-5 ml-2 mt-1.5"
              />
            </a>
            <AnimateFromRight>
              <h1
                className="mb-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              >
                Supercharge Your Business with Zumji&apos;s Reward Revolution
              </h1>
            </AnimateFromRight>
            <AnimateFromLeft>
              <p className="mb-8 text-md sm:text-lg md:text-xl font-medium text-gray-200 sm:px-16 xl:px-48">
                Dive into staking, borrowing and thrilling incentives—all powered by Celo
              </p>
            </AnimateFromLeft>
            <AnimateFromBottom>
              <div className="flex justify-center space-x-4 mb-8 lg:mb-16">
                {isOnboarded ? (
                  <Link
                    href="/finance"
                    className="mt-6 max-w-md inline-flex items-center justify-center px-5 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-6 lg:py-3 text-xs sm:text-sm md:text-md lg:text-lg font-medium text-white bg-gray-600 rounded-full shadow-lg hover:shadow-black focus:ring-2 focus:ring-green-600"
                  >
                    Stats
                    <FaChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2 " />
                  </Link>
                ) : (
                  <button
                    onClick={handleOnboard}
                    className="mt-6 max-w-md inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 hover:opacity-90 focus:ring-2 focus:ring-green-600"
                    disabled={inTxn}
                  >
                    {inTxn ? <Preloader className="mt-3" /> : "Join Zumji"}
                  </button>
                )}
              </div>
            </AnimateFromBottom>
          </div>
        </section>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={scrollToFeatures}
            className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 group"
          >
            <span className="text-sm mb-2 opacity-75">Explore Features</span>
            <div className="animate-bounce">
              <FaChevronDown className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Features section with smooth transition */}
      <div
        id="features-section"
        className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16"
      >
        {/* Subtle top border for visual separation */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        <Features />
      </div>

      <ToastContainer />
    </Layout>
  );
}
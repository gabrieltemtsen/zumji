/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from "react";
import {
  Preloader,
  Chip,
  Icon,
} from "konsta/react";
import Layout from "./Layout";
import Link from "next/link";
import { useAccount, useContractRead } from "wagmi";
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
import AnimateFromLeft from "@/animation/animate-from-left";
import AnimateFromRight from "@/animation/animate-from-right";
import AnimateFromBottom from "@/animation/animate-from-bottom";
import { homeBackground } from "@/constants/images";
import Features from "@/components/home/Features";
import StarField from "@/animation/three.js/stars-background";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import ZumjiReferralJson from "@/utils/ZumjiReferral.json";

export const ZUMJI_REFERRAL_ABI = ZumjiReferralJson.abi;
export const ZUMJI_REFERRAL_ADDRESS =
  "0x62F3ea14ECa8f01E2b50B9f8345615a4B4F00B5D";

export default function Home() {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [referrer, setReferrer] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { data: referralPoints } = useContractRead({
    address: ZUMJI_REFERRAL_ADDRESS,
    abi: ZUMJI_REFERRAL_ABI,
    functionName: "getPoints",
    args: address ? [address] : undefined,
    enabled: !!address,
    watch: true,
  });
  

  const handleReferralOnboard = async (referrer: string) => {
    if (!referrer) {
      toast.error("Referrer address is required");
      return;
    }
    try {
      const tx = await writeContract({
        address: ZUMJI_REFERRAL_ADDRESS,
        abi: ZUMJI_REFERRAL_ABI,
        functionName: "onboard",
        args: [referrer],
      });

      toast.success("Referral onboarding successful");
      console.log("Transaction:", tx);
    } catch (error: any) {
      toast.error("Failed to onboard via referral");
      console.error("Referral error:", error);
    }
  };

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
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (address) fetchOnboardStatus();
  }, [address]);

  if (!hasMounted) return null;
  return (
    <Layout>
      {/* Fixed Background Elements - These stay in place during scroll */}
      <div className="fixed inset-0 z-0">
        {/* Three.js Star Field Background */}

        {/* Original background image with reduced opacity for layering */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${homeBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />

        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 px-10 sm:px-16 lg:px-24 xl:px-32 py-8">
        {/* Hero Section */}
        <section className="relative flex items-center min-h-screen">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
            <a
              href="https://celo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-1 py-1 pr-4 pl-4 text-sm rounded-full mb-7 bg-gray-800/80 backdrop-blur-sm text-white hover:bg-gray-700/80 transition-all duration-300"
            >
              <Chip
                media={
                  <img
                    alt="Celo Logo"
                    className="ios:h-7 material:h-6 rounded-full"
                    src="/celo.png"
                  />
                }
                className="text-xs bg-black/80 backdrop-blur-sm rounded-full text-white px-4 py-1.5 mr-3"
              />
              <span className="text-xs sm:text-sm font-medium ml-2">
                Powered by Celo
              </span>
              <Icon
                ios={<FaChevronRight />}
                material={<FaChevronRight />}
                className="w-5 h-5 ml-2 mt-1.5"
              />
            </a>

            <StarField />

            <AnimateFromRight>
              <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                Supercharge Your Business with Zumji&apos;s Reward Revolution
              </h1>
            </AnimateFromRight>
            <AnimateFromLeft>
              <p className="mb-8 text-md sm:text-lg md:text-xl font-medium text-gray-200 sm:px-16 xl:px-48 drop-shadow-md">
                Dive into staking, borrowing and thrilling incentives—all
                powered by Celo
              </p>
            </AnimateFromLeft>

            
            <AnimateFromBottom>
              <div className="flex justify-center space-x-4 mb-8 lg:mb-16">
                {isOnboarded ? (
                  <Link
                    href="/finance"
                    className="mt-6 max-w-md inline-flex items-center justify-center px-5 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-6 lg:py-3 text-xs sm:text-sm md:text-md lg:text-lg font-medium text-white bg-gray-600/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-black hover:bg-gray-500/80 focus:ring-2 focus:ring-green-600 transition-all duration-300"
                  >
                    Stats
                    <FaChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2 " />
                  </Link>
                ) : (
                  <button
                    onClick={handleOnboard}
                    className="mt-6 max-w-md inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white rounded-full shadow-2xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 hover:opacity-90 focus:ring-2 focus:ring-green-600 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                    disabled={inTxn}
                  >
                    {inTxn ? <Preloader className="mt-3" /> : "Join Zumji"}
                  </button>
                )}
              </div>
            </AnimateFromBottom>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-40 lg:bottom-14 left-1/2 transform -translate-x-1/2 z-10">
            <button
              onClick={scrollToFeatures}
              className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 group backdrop-blur-sm"
            >
              <span className="text-sm mb-2 opacity-75 drop-shadow-md">
                Explore Features
              </span>
              <div className="animate-bounce">
                <FaChevronDown className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all duration-300 drop-shadow-md" />
              </div>
            </button>
          </div>
        </section>

        {/* Features section */}
        <div
          id="features-section"
          className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
          <Features />
        </div>

        {isOnboarded && (
          <div className="mt-4 max-w-md mx-auto p-4 rounded-xl bg-gray-800/80 backdrop-blur shadow-xl text-white">
            <h2 className="text-lg font-semibold mb-2">🎁 Invite Friends</h2>
            <p className="text-sm mb-3 text-gray-300">
              Share your referral link and earn points when they onboard!
            </p>

            {referralPoints !== undefined && (
              <p className="text-sm text-green-400 mb-2">
               You&apos;ve earned <strong>{Number(referralPoints)}</strong> points!
              </p>
            )}

            <div className="flex items-center gap-2 mb-4">
              <input
                readOnly
                value={`https://zumji.vercel.app/ref/${address}`}
                className="flex-1 px-3 py-2 rounded-lg text-sm bg-black/30 text-white border border-gray-600"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://zumji.vercel.app/ref/${address}`
                  );
                  toast.success("Referral link copied!");
                }}
                className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 py-2 rounded-lg transition"
              >
                Copy
              </button>
            </div>

            {/* Referral Input and Onboard Button */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter referrer address"
                value={referrer}
                onChange={(e) => setReferrer(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-sm bg-black/30 text-white border border-gray-600"
              />
              <button
                onClick={() => handleReferralOnboard(referrer)}
                className="text-xs bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded-lg transition"
              >
                Onboard
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </Layout>
  );
}
